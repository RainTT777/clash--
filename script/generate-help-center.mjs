import fs from 'node:fs';
import path from 'node:path';

const groups = [
  ['机场 VPN 入门', [
    ['机场是什么，与普通 VPN 有什么区别？','机场通常提供多个代理节点和订阅链接，需要配合 Clash、Shadowrocket 等客户端使用；传统 VPN 往往提供自有应用。选购前应确认设备、协议和订阅格式。'],
    ['第一次购买机场应该选月付还是年付？','建议先选月付或短周期套餐，测试本地运营商、晚高峰和常用网站表现后再决定是否长期使用。可参考[机场套餐对比](/article/iepl-line-review)。'],
    ['BGP、IPLC、IEPL 分别代表什么？','它们描述不同的网络接入或专线方案，但名称不能单独证明质量。应结合入口、出口、拥堵、倍率和实际测试判断。'],
    ['延迟最低的机场节点一定最快吗？','不一定。延迟只反映一次探测，速度还受丢包、抖动、带宽和晚高峰拥堵影响。'],
    ['机场套餐中的倍率是什么意思？','倍率决定流量扣除速度。例如 2 倍率节点使用 1GB，套餐可能扣除 2GB，购买前应查看套餐说明。'],
    ['不限时套餐适合什么人？','适合流量较少、使用不连续或作为备用线路的人；高频视频用户通常更适合按月重置流量的套餐。'],
    ['机场支持哪些设备？','取决于订阅协议和客户端。常见平台包括 Windows、macOS、Android、iOS、Linux 与 OpenWrt。'],
    ['一个订阅可以多设备使用吗？','要看服务商的设备数或并发限制。不要假设所有套餐都允许无限设备。'],
    ['机场节点能保证固定 IP 吗？','普通共享节点通常不能。需要固定出口时应确认是否提供独享 IP 或专用线路。'],
    ['机场突然无法使用应该先做什么？','先查看服务公告和套餐状态，再切换本地网络、更新订阅并测试不同节点，避免立即删除全部配置。']
  ]],
  ['订阅与节点', [
    ['订阅链接应该如何保存？','把订阅链接当作密码保存，不要上传到转换网站、公开仓库、群聊或截图中。泄露后应在服务后台重置。'],
    ['订阅导入后为什么没有节点？','常见原因是链接不完整、套餐到期、格式不兼容或订阅接口暂时不可用。先在服务后台重新复制对应客户端链接。'],
    ['订阅更新失败但网页可以打开怎么办？','检查客户端是否要求代理更新、系统时间是否正确，以及订阅域名是否被 DNS 或规则错误处理。'],
    ['节点全部超时是什么原因？','可能是本地网络、核心未安装、系统时间、DNS、端口冲突或服务端维护。先换网络做对照。'],
    ['只有一个节点超时需要重装客户端吗？','通常不需要。单个节点失败更可能是维护或拥堵，选择其他节点并稍后复测。'],
    ['为什么节点测速正常但打不开网页？','测速目标与网页访问路径不同，重点检查 DNS、规则模式、浏览器安全 DNS 和目标网站限制。'],
    ['自动测速多久执行一次合适？','日常无需频繁测速。网络变化或节点异常时手动测试即可，过于频繁会增加耗电和服务压力。'],
    ['如何选择香港、日本、新加坡或美国节点？','优先考虑目标服务地区和实际稳定性。常用账号尽量保持出口地区相对固定。'],
    ['订阅转换安全吗？','第三方转换站可能读取订阅令牌。优先使用服务商提供的原生订阅或在可信环境中本地转换。'],
    ['更新订阅会覆盖自定义规则吗？','直接修改远程配置可能被覆盖。Clash/Stash 用户应使用覆写或本地规则功能保存自定义内容。']
  ]],
  ['Clash 配置', [
    ['Clash、Mihomo 与 Clash Meta 是什么关系？','Mihomo 是延续 Clash Meta 能力的活跃核心，Clash Verge Rev、OpenClash 等客户端可调用它。配置前要确认核心与字段兼容。'],
    ['规则、全局和直连模式如何选择？','日常使用规则模式；全局模式用于短时排障；直连模式用于确认问题是否由代理引起。'],
    ['Clash Verge Rev 如何导入订阅？','在 Profiles/配置页面从 URL 导入并更新。完整步骤见[Clash Verge Rev 教程](/article/clash-verge-rev-guide)。'],
    ['Clash 开启系统代理后仍不生效怎么办？','确认浏览器没有独立代理扩展，检查系统代理地址、监听端口以及其他代理软件是否占用同一端口。'],
    ['TUN 模式有什么作用？','TUN 可接管不遵循系统代理的程序，但需要虚拟网卡和权限。应先验证系统代理，再按需开启。'],
    ['TUN 开启后完全断网怎么办？','关闭其他 VPN/虚拟网卡，恢复默认 TUN 参数，检查服务模式、防火墙权限与 DNS 设置。'],
    ['Clash 配置文件 YAML 报错如何定位？','查看报错行附近的缩进、冒号和重复键；使用编辑器的 YAML 校验，不要一次删除多个配置段。'],
    ['策略组 url-test 和 fallback 有何区别？','url-test 按测试结果自动选择，fallback 按顺序选择首个可用节点；稳定办公常用 fallback。'],
    ['规则集越多越好吗？','不是。重复或冲突规则会降低可维护性。只保留与真实需求相关、来源可信且持续维护的规则集。'],
    ['哪里查看 Clash 官方项目资料？','可查看[Mihomo 官方文档](https://wiki.metacubex.one/)，同时参考站内[Clash 深度教程](/article/clash-deep-guide)。']
  ]],
  ['Shadowrocket 小火箭配置', [
    ['Shadowrocket 是什么？','它是 iPhone/iPad 上的规则代理客户端，可管理节点、订阅、规则、模块和按需连接。'],
    ['小火箭如何添加机场订阅？','在类型中选择 Subscribe，粘贴服务商提供的兼容链接并更新。详见[小火箭教程](/article/shadowrocket-complete-guide)。'],
    ['Shadowrocket 规则模式和全局模式有什么区别？','规则模式按域名/IP 决定直连或代理；全局模式让大多数流量走当前节点，仅建议短时排障使用。'],
    ['小火箭测速结果为什么不一致？','不同测试方式、网络波动和节点负载都会影响结果，应结合实际网页和视频体验。'],
    ['小火箭连接后没有 VPN 图标怎么办？','检查系统是否允许添加 VPN 配置，并确认没有其他 VPN 应用占用系统隧道。'],
    ['Shadowrocket 模块可以随便安装吗？','不建议。模块可能改写请求或启用 MITM，只使用可信来源并理解具体作用。'],
    ['小火箭一定要安装证书吗？','普通代理、订阅和规则分流不需要。只有明确需要 HTTPS 解密的可信模块才涉及证书。'],
    ['按需连接反复开关怎么办？','检查按需规则是否过宽、Wi-Fi 条件是否正确，并避免多个 VPN 应用同时配置自动连接。'],
    ['小火箭订阅更新失败怎么办？','检查订阅地址、套餐状态、网络权限和代理前置条件，必要时从服务后台重新复制链接。'],
    ['Shadowrocket 官方下载在哪里？','请以[Apple App Store 页面](https://apps.apple.com/us/app/shadowrocket/id932747118)为准，不安装来源不明的签名版本。']
  ]],
  ['DNS、速度与故障排查', [
    ['什么是 DNS 污染或解析异常？','域名被解析到错误地址、返回失败或不同网络结果异常，可能导致节点正常但网站打不开。'],
    ['DoH、DoT 和普通 DNS 怎么选？','先使用客户端默认稳定方案；需要加密解析时再选择 DoH/DoT，避免浏览器、系统和客户端重复接管。'],
    ['Fake-IP 模式有什么优缺点？','它便于快速规则匹配，但部分局域网、游戏或特殊应用需要排除域名。'],
    ['为什么晚上速度明显下降？','晚高峰入口、出口或目标服务可能拥堵。应在多个时段测试并准备不同线路或备用服务。'],
    ['视频速度快但游戏延迟高怎么办？','视频更看重带宽，游戏更看重延迟、抖动和 UDP。选择针对游戏优化且支持 UDP 的节点。'],
    ['Wi-Fi 可用但移动数据不可用是什么原因？','可能是 IPv6、运营商限制、私人 DNS或分应用权限差异。分别关闭相关功能进行对照。'],
    ['电脑可用但手机不可用怎么排查？','确认手机使用正确客户端格式、VPN 权限、后台运行和时间设置，不要直接复制电脑本地配置。'],
    ['浏览器能打开但应用不能联网怎么办？','应用可能不遵循系统代理，需要 TUN/增强模式或分应用代理；也要检查是否被排除。'],
    ['如何判断是机场问题还是本地问题？','切换 Wi-Fi/移动网络、测试直连和多个节点。如果同订阅在另一网络正常，优先检查本地环境。'],
    ['哪里有更完整的 DNS 排障流程？','阅读站内[DNS 与连接超时排查指南](/article/dns-troubleshooting)，按网络、订阅、节点、DNS 和规则逐层检查。']
  ]],
  ['账户、付款与安全', [
    ['机场优惠码在哪里填写？','通常在购买套餐或结算页面填写。可查看[机场优惠码大全](/article/airport-coupon-codes)，最终折扣以结算页为准。'],
    ['优惠码为什么显示无效？','可能已过期、不适用于当前套餐、仅限新用户或大小写输入错误。'],
    ['购买机场后可以退款吗？','取决于服务条款。购买前阅读退款政策，并优先选择短周期测试。'],
    ['流量突然用完如何检查？','查看设备数量、节点倍率、系统更新、云备份和下载任务，必要时重置订阅防止泄露。'],
    ['账号被多人登录有什么风险？','可能触发设备限制、流量异常或封禁。不要共享账户和订阅链接。'],
    ['机场能看到访问内容吗？','服务商可以观察部分连接元数据；HTTPS 可保护具体内容。仍应选择可信服务并启用双重验证。'],
    ['使用公共 Wi-Fi 需要注意什么？','确认网络名称，避免忽略证书警告，重要账号使用 HTTPS 与双重验证，并关闭不必要的局域网共享。'],
    ['如何安全分享故障日志？','删除订阅地址、UUID、IP、用户名、本地路径和令牌，只保留与错误相关的最小片段。'],
    ['客户端应不应该自动更新？','普通用户可使用稳定版并延迟观察大版本；升级前备份配置和记录当前版本。'],
    ['网站内容是否替代官方说明？','不能。软件版本、套餐和规则会变化，本站用于整理思路，最终以客户端官方文档和服务商页面为准。']
  ]]
];

let body = `---\ntitle: "机场帮助中心：VPN、Clash 与小火箭配置常见问题"\nh1: "机场帮助中心"\ndesc: "整理 60 个机场 VPN、Clash 配置、Shadowrocket 小火箭配置、订阅、DNS 与账户安全常见问题。"\nlayout: "@/layouts/PageLayout/PageLayout.astro"\ntype: "help"\n---\n\n:::note{type="success"}\n这里汇总机场 VPN、Clash 配置和小火箭配置的高频问题。建议先用页面搜索定位关键词，再按照答案中的站内教程逐步检查。\n:::\n\n## 快速入口\n\n- [机场套餐与线路对比](/article/iepl-line-review)\n- [机场优惠码大全](/article/airport-coupon-codes)\n- [Clash 客户端教程](/article/clash-verge-rev-guide)\n- [Shadowrocket 小火箭教程](/article/shadowrocket-complete-guide)\n- [Mihomo 官方文档](https://wiki.metacubex.one/)\n- [sing-box 官方文档](https://sing-box.sagernet.org/)\n\n`;
for (const [group, items] of groups) {
  body += `## ${group}\n\n`;
  items.forEach(([question, answer], index) => {
    body += `### ${index + 1}. ${question}\n\n${answer}\n\n`;
  });
}
body += `## 仍未解决问题怎么办\n\n记录设备系统、客户端名称与版本、发生时间、使用网络、错误提示和已尝试步骤，再对照官方文档排查。请勿提交订阅链接、账户密码、UUID、访问令牌或完整 IP。\n`;

const output = path.join('src','pages','help','index.md');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, body, 'utf8');

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const renderInline = (value) => escapeHtml(value).replace(
  /\[([^\]]+)\]\(([^)]+)\)/g,
  (_, label, href) => `<a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`
);
const faqSections = groups.map(([group, items], sectionIndex) => `
  <section class="faq-section" id="faq-${sectionIndex + 1}">
    <h2>${escapeHtml(group)}</h2>
    <div class="faq-list">
      ${items.map(([question, answer], itemIndex) => `
        <details class="faq-item"${sectionIndex === 0 && itemIndex === 0 ? ' open' : ''}>
          <summary><span>${sectionIndex * 10 + itemIndex + 1}</span>${escapeHtml(question)}</summary>
          <div class="faq-answer"><p>${renderInline(answer)}</p></div>
        </details>`).join('')}
    </div>
  </section>`).join('');

const standalone = `<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>机场帮助中心：VPN、Clash 与小火箭配置 FAQ</title>
<meta name="description" content="60 个机场 VPN、Clash 配置、Shadowrocket 小火箭配置、订阅、DNS 与账户安全常见问题。">
<link rel="canonical" href="https://clash-shadowrocket.blog/help/">
<style>
*{box-sizing:border-box}body{margin:0;background:#f5f8fa;color:#172033;font-family:Arial,"Microsoft YaHei",sans-serif;line-height:1.75}a{color:#008f86;text-decoration:none}a:hover{text-decoration:underline}.topbar{position:sticky;top:0;z-index:10;background:#363641;color:#fff}.nav{max-width:1180px;margin:auto;padding:14px 22px;display:flex;align-items:center;justify-content:space-between}.brand{color:#fff;font-weight:800}.nav-links{display:flex;gap:22px}.nav-links a{color:#fff;font-weight:700}.hero{background:#0f766e;color:#fff;padding:56px 22px}.hero-inner{max-width:1180px;margin:auto}.eyebrow{font-size:14px;font-weight:800;letter-spacing:0}.hero h1{font-size:42px;line-height:1.2;margin:8px 0 14px}.hero p{max-width:760px;margin:0;color:#d8fffa;font-size:18px}.layout{max-width:1180px;margin:28px auto 60px;padding:0 22px;display:grid;grid-template-columns:220px minmax(0,1fr);gap:28px}.toc{position:sticky;top:76px;align-self:start;background:#fff;border:1px solid #dce7e7;padding:18px;border-radius:8px}.toc h2{font-size:17px;margin:0 0 10px}.toc a{display:block;padding:7px 0;border-bottom:1px solid #edf2f2;font-size:14px}.quick{background:#eafaf7;border-left:4px solid #06b6a8;padding:17px 19px;margin-bottom:24px}.quick strong{display:block;margin-bottom:7px}.quick a{margin-right:16px;font-weight:700}.faq-section{margin-bottom:30px}.faq-section h2{font-size:26px;margin:0 0 14px;padding-bottom:8px;border-bottom:2px solid #12b8aa}.faq-list{display:grid;gap:10px}.faq-item{background:#fff;border:1px solid #dce5e8;border-radius:8px;overflow:hidden}.faq-item summary{list-style:none;cursor:pointer;padding:16px 18px;font-weight:750;display:flex;align-items:center;gap:12px}.faq-item summary::-webkit-details-marker{display:none}.faq-item summary span{display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;background:#e3f8f5;color:#087a72;border-radius:6px;font-size:13px;flex:0 0 auto}.faq-item[open] summary{background:#f1fbfa;color:#075f59}.faq-answer{padding:0 58px 18px}.faq-answer p{margin:0}.footer{text-align:center;padding:28px;color:#718096;background:#fff;border-top:1px solid #e5eaed}@media(max-width:760px){.nav-links{gap:12px;font-size:14px}.hero{padding:38px 18px}.hero h1{font-size:31px}.layout{grid-template-columns:1fr;padding:0 14px}.toc{position:static}.faq-answer{padding:0 18px 16px}.faq-item summary{padding:14px}.quick a{display:block;margin:5px 0}}
</style></head><body>
<header class="topbar"><nav class="nav"><a class="brand" href="/">火箭猫</a><div class="nav-links"><a href="/">首页</a><a href="/article/iepl-line-review">机场推荐</a><a href="/help/">帮助</a><a href="/about/">关于我们</a></div></nav></header>
<section class="hero"><div class="hero-inner"><div class="eyebrow">机场 VPN · CLASH · SHADOWROCKET</div><h1>机场帮助中心</h1><p>按问题分类整理 60 个常见 FAQ，覆盖机场选择、订阅节点、Clash、小火箭、DNS、速度、付款与账户安全。</p></div></section>
<div class="layout"><aside class="toc"><h2>问题分类</h2>${groups.map(([group], index) => `<a href="#faq-${index + 1}">${escapeHtml(group)}（10）</a>`).join('')}</aside><main>
<div class="quick"><strong>常用站内教程</strong><a href="/article/iepl-line-review">机场线路对比</a><a href="/article/airport-coupon-codes">机场优惠码</a><a href="/article/clash-verge-rev-guide">Clash 配置</a><a href="/article/shadowrocket-complete-guide">小火箭配置</a></div>
${faqSections}
<div class="quick"><strong>官方外部资料</strong><a href="https://wiki.metacubex.one/" target="_blank" rel="noopener noreferrer">Mihomo 官方文档</a><a href="https://sing-box.sagernet.org/" target="_blank" rel="noopener noreferrer">sing-box 官方文档</a><a href="https://apps.apple.com/us/app/shadowrocket/id932747118" target="_blank" rel="noopener noreferrer">Shadowrocket App Store</a></div>
</main></div><footer class="footer">© 2026 Clash-Shadowrocket.blog · 机场帮助中心</footer></body></html>`;
const standaloneOutput = path.join('help', 'index.html');
fs.mkdirSync(path.dirname(standaloneOutput), { recursive: true });
fs.writeFileSync(standaloneOutput, standalone, 'utf8');
console.log('Generated airport help center with 60 FAQs and standalone page.');
