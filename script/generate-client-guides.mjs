import fs from 'node:fs';
import path from 'node:path';

const clients = [
  {id:'clash-verge-rev-guide',name:'Clash Verge Rev',platform:'Windows、macOS 与 Linux',date:'2026-07-31 12:00:00',official:'https://github.com/clash-verge-rev/clash-verge-rev/releases',focus:'Mihomo 内核、系统代理、TUN 模式和规则分流',color:['#0f766e','#22c55e'],motif:'desktop'},
  {id:'v2rayn-guide',name:'v2rayN',platform:'Windows',date:'2026-07-30 12:00:00',official:'https://github.com/2dust/v2rayN/releases',focus:'多协议节点管理、订阅分组、路由规则与测速',color:['#1d4ed8','#38bdf8'],motif:'windows'},
  {id:'hiddify-guide',name:'Hiddify',platform:'Windows、macOS 与 Linux',date:'2026-07-29 12:00:00',official:'https://github.com/hiddify/hiddify-app/releases',focus:'统一订阅导入、自动选择配置与跨平台使用',color:['#6d28d9','#a78bfa'],motif:'shield'},
  {id:'sing-box-desktop-guide',name:'sing-box 桌面端',platform:'Windows、macOS 与 Linux',date:'2026-07-28 12:00:00',official:'https://sing-box.sagernet.org/clients/',focus:'规则集、DNS 分流、TUN 入站和现代协议配置',color:['#0f172a','#06b6d4'],motif:'core'},
  {id:'clash-meta-android-guide',name:'Clash Meta for Android',platform:'Android 手机与平板',date:'2026-07-27 12:00:00',official:'https://github.com/MetaCubeX/ClashMetaForAndroid/releases',focus:'Mihomo 配置、VPN 权限、分应用代理和后台保活',color:['#166534','#84cc16'],motif:'android'},
  {id:'v2rayng-guide',name:'V2RayNG',platform:'Android 手机与平板',date:'2026-07-26 12:00:00',official:'https://github.com/2dust/v2rayNG/releases',focus:'二维码与订阅导入、路由设置、分应用代理和延迟测试',color:['#075985','#0ea5e9'],motif:'android'},
  {id:'hiddify-android-guide',name:'Hiddify Android',platform:'Android 手机与平板',date:'2026-07-25 12:00:00',official:'https://github.com/hiddify/hiddify-app/releases',focus:'一键配置、自动更新、分应用代理和电池优化',color:['#7e22ce','#ec4899'],motif:'mobile'},
  {id:'sing-box-android-guide',name:'sing-box Android',platform:'Android 手机与平板',date:'2026-07-24 12:00:00',official:'https://sing-box.sagernet.org/clients/',focus:'原生配置、TUN 接管、规则集更新和 DNS 策略',color:['#155e75','#2dd4bf'],motif:'mobile'},
  {id:'clash-mi-guide',name:'Clash Mi',platform:'iPhone、iPad 与 macOS',date:'2026-07-23 12:00:00',official:'https://clashmi.app/',focus:'Apple 平台订阅导入、规则模式、策略组和按需连接',color:['#be123c','#fb7185'],motif:'apple'},
  {id:'shadowrocket-complete-guide',name:'Shadowrocket',platform:'iPhone 与 iPad',date:'2026-07-22 12:00:00',official:'https://apps.apple.com/us/app/shadowrocket/id932747118',focus:'订阅导入、规则分流、模块管理、测速与按需连接',color:['#4338ca','#818cf8'],motif:'rocket'},
  {id:'stash-guide',name:'Stash',platform:'iPhone、iPad 与 macOS',date:'2026-07-21 12:00:00',official:'https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349',focus:'Clash 配置兼容、覆写、规则集、脚本与策略组',color:['#9f1239','#f43f5e'],motif:'box'},
  {id:'quantumult-x-guide',name:'Quantumult X',platform:'iPhone 与 iPad',date:'2026-07-20 12:00:00',official:'https://apps.apple.com/us/app/quantumult-x/id1443988620',focus:'节点资源、分流规则、重写、脚本和定时任务',color:['#92400e','#f59e0b'],motif:'quantum'},
  {id:'surge-guide',name:'Surge',platform:'iPhone、iPad 与 macOS',date:'2026-07-19 12:00:00',official:'https://nssurge.com/',focus:'策略组、规则系统、模块、网络诊断与自动化',color:['#0369a1','#22d3ee'],motif:'wave'},
  {id:'openclash-guide',name:'OpenClash',platform:'OpenWrt 软路由与旁路由',date:'2026-07-18 12:00:00',official:'https://github.com/vernesong/OpenClash',focus:'Mihomo 内核、订阅管理、运行模式、DNS 劫持和局域网分流',color:['#14532d','#4ade80'],motif:'router'},
  {id:'passwall-guide',name:'PassWall',platform:'OpenWrt 软路由与旁路由',date:'2026-07-17 12:00:00',official:'https://github.com/xiaorouji/openwrt-passwall',focus:'节点配置、访问控制、负载均衡、DNS 与透明代理',color:['#7c2d12','#fb923c'],motif:'router'},
  {id:'sing-box-core-guide',name:'sing-box Core',platform:'Linux、服务器与软路由',date:'2026-07-16 12:00:00',official:'https://sing-box.sagernet.org/',focus:'JSON 配置、入站出站、路由规则、DNS 和 systemd 服务',color:['#111827','#64748b'],motif:'terminal'}
];

const articleDir=path.join('src','content','blog','2026','07');
const imageDir=path.join('public','assets','images','client-guides');
fs.mkdirSync(articleDir,{recursive:true});
fs.mkdirSync(imageDir,{recursive:true});

function motif(type){
  const common='fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"';
  const shapes={
    desktop:`<rect x="810" y="125" width="300" height="210" rx="24" ${common}/><path d="M900 405h120M960 335v70" ${common}/>`,
    windows:`<path d="M825 145l125-18v130H825zm145-21 150-22v155H970zm-145 153h125v130l-125-18zm145 0h150v155l-150-22z" fill="#fff" opacity=".9"/>`,
    shield:`<path d="M965 105 1110 160v105c0 92-60 154-145 190-85-36-145-98-145-190V160z" ${common}/><path d="m900 276 42 42 88-98" ${common}/>`,
    core:`<circle cx="965" cy="275" r="145" ${common}/><path d="M820 275h290M965 130v290M862 172c65 60 65 146 0 206M1068 172c-65 60-65 146 0 206" ${common}/>`,
    android:`<path d="M840 225h250v170H840zM870 225v-55m190 55v-55M885 150l-35-45m195 45 35-45" ${common}/><circle cx="900" cy="270" r="8" fill="#fff"/><circle cx="1030" cy="270" r="8" fill="#fff"/>`,
    mobile:`<rect x="865" y="85" width="205" height="380" rx="34" ${common}/><path d="M930 420h75" ${common}/><circle cx="968" cy="160" r="35" ${common}/><path d="M900 300c35-65 100-65 135 0" ${common}/>`,
    apple:`<path d="M985 145c30-40 15-75 10-85-35 5-65 35-70 70-45-25-105-5-130 45-50 100 40 235 95 270 30 20 55-15 95-15s60 35 90 15c55-35 130-155 85-245-30-60-105-75-175-55z" fill="#fff" opacity=".9"/>`,
    rocket:`<path d="M965 85c70 45 110 125 95 230l-95 75-95-75c-15-105 25-185 95-230z" ${common}/><circle cx="965" cy="220" r="35" ${common}/><path d="M900 345l-50 70M1030 345l50 70M930 415l35 65 35-65" ${common}/>`,
    box:`<path d="m965 90 155 80v190l-155 90-155-90V170zM810 170l155 85 155-85M965 255v195" ${common}/>`,
    quantum:`<circle cx="965" cy="275" r="70" fill="#fff"/><ellipse cx="965" cy="275" rx="180" ry="75" ${common}/><ellipse cx="965" cy="275" rx="180" ry="75" transform="rotate(60 965 275)" ${common}/><ellipse cx="965" cy="275" rx="180" ry="75" transform="rotate(-60 965 275)" ${common}/>`,
    wave:`<path d="M790 330c65-130 130-130 195 0s130 130 195 0" ${common}/><path d="M790 220c65-100 130-100 195 0s130 100 195 0" ${common}/>` ,
    router:`<rect x="790" y="250" width="350" height="150" rx="28" ${common}/><path d="M850 250 820 100M1080 250l30-150" ${common}/><circle cx="860" cy="325" r="12" fill="#fff"/><circle cx="910" cy="325" r="12" fill="#fff"/><path d="M1000 325h80" ${common}/>`,
    terminal:`<rect x="775" y="120" width="380" height="300" rx="25" ${common}/><path d="m835 205 60 55-60 55M930 325h130" ${common}/>`
  }; return shapes[type]||shapes.core;
}

function svg(c){return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="560" viewBox="0 0 1280 560"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c.color[0]}"/><stop offset="1" stop-color="${c.color[1]}"/></linearGradient></defs><rect width="1280" height="560" rx="28" fill="url(#g)"/><circle cx="1130" cy="60" r="210" fill="#fff" opacity=".08"/><circle cx="1070" cy="520" r="260" fill="#000" opacity=".09"/><text x="72" y="105" fill="#dffcf8" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="4">CLASH-SHADOWROCKET.BLOG</text><text x="72" y="225" fill="#fff" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="64" font-weight="800">${c.name}</text><text x="72" y="295" fill="#fff" opacity=".9" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="31" font-weight="600">深度使用教程</text><text x="72" y="365" fill="#fff" opacity=".82" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="23">${c.platform}</text><text x="72" y="420" fill="#fff" opacity=".82" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="20">安装 · 订阅 · 分流 · DNS · 排障</text>${motif(c.motif)}</svg>`}

function article(c,i){
  const prev=clients[(i+clients.length-1)%clients.length];
  const next=clients[(i+1)%clients.length];
  return `---
title: "2026 ${c.name} 深度使用教程：安装、订阅导入、规则分流与故障排查"
categories: "客户端教程"
tags: ['${c.name}', '${c.platform.split('、')[0]}', '订阅导入', '规则分流', '客户端教程']
id: "${c.id}"
date: ${c.date}
cover: "/assets/images/client-guides/${c.id}.svg"
---

![${c.name} 深度使用教程](/assets/images/client-guides/${c.id}.svg)

:::note
本教程面向需要在 ${c.platform} 使用 ${c.name} 的读者，重点讲解${c.focus}。界面和菜单可能随版本调整，请优先使用官方稳定版本，并在修改配置前保留一份可用备份。
:::

## ${c.name} 是什么，适合哪些用户

${c.name} 是面向 ${c.platform} 的网络代理与规则分流工具。它的主要价值不是简单“打开一个开关”，而是把订阅节点、策略组、域名规则、DNS 和系统网络接管方式组织成可维护的配置。对于刚开始使用的读者，目标应当是先完成一套最小可用配置，再逐步增加自动测速、故障转移、分应用代理或脚本等高级功能。

选择客户端前，需要确认服务商提供兼容的订阅格式。不同客户端支持的协议、配置语法和功能并不完全相同，不要把一个客户端导出的本地配置直接复制给另一款工具。如果主要需求是网页、视频和日常办公，规则模式通常比全局代理更合适；如果还需要游戏、命令行、虚拟机或局域网设备，则需要继续了解 TUN、透明代理或路由器接管。

## 安装前的准备与官方下载

建议从 [${c.name} 官方发布页面](${c.official}) 获取安装包，不使用来源不明的“绿色版”“增强版”或预装订阅版本。下载时核对平台、CPU 架构和版本号；升级前记录当前稳定版本，重要工作期间不要在没有备份的情况下立即更新大版本。

安装前关闭正在运行的其他代理、VPN 和游戏加速器，避免系统代理、虚拟网卡或端口冲突。开启系统自动日期、时间和时区，错误的时间会导致 TLS 证书校验失败。移动端需要允许 VPN 配置和后台运行；桌面端开启 TUN 时可能需要管理员权限；路由器类客户端还应确认设备存储和内存足够。

## 订阅链接导入与首次连接

登录服务商后台，复制明确标注支持 ${c.name} 或兼容格式的订阅链接。订阅地址通常包含账号令牌，应当像密码一样保存，不要发到群聊、截图、在线转换网站或公开日志中。进入客户端的订阅、配置或 Profiles 页面，选择“从 URL 导入”，粘贴链接后保存并执行一次手动更新。

导入成功后应看到节点列表、策略组和规则。如果只显示空白配置，优先检查链接是否完整、套餐是否到期、流量是否用尽以及订阅格式是否匹配。不要为了修复解析错误随意删除 YAML 或 JSON 字段。首次连接建议选择物理距离较近的节点，开启规则模式，再访问一个直连网站和一个需要代理的网站，确认两类流量均按预期工作。

## ${c.name} 的核心设置

本客户端需要重点掌握：${c.focus}。策略组建议至少保留“手动选择”“自动测速”和“故障转移”三类。手动选择便于稳定使用；自动测速适合网络经常变化的设备；故障转移可以在主节点不可用时切换备用。测速结果只能作为参考，持续丢包、抖动、晚高峰速度和目标网站实际体验往往比单次延迟更重要。

日常使用优先采用规则模式。全局模式适合短时间判断节点是否可用，直连模式用于确认问题是否由代理造成。修改规则时先查看连接日志中实际命中的域名、规则和策略，再添加最小范围的修正规则。一次只调整一个变量，测试稳定后再继续，避免 DNS、TUN、规则集和脚本同时变化导致无法定位问题。

## DNS、TUN 与系统网络接管

DNS 决定域名如何解析，是“节点延迟正常但网页打不开”的常见原因。推荐先使用客户端默认的稳定 DNS 方案，确认基础连接正常后，再考虑 DoH、Fake-IP、独立缓存或分流解析。局域网设备、银行应用、时间同步和 .local 域名应保留合理的直连或排除规则。浏览器安全 DNS、系统加密 DNS和客户端 DNS 劫持不要重复叠加。

TUN 或透明代理可以接管更多不遵循系统代理的程序，但也会增加权限、路由和虚拟网卡冲突的可能。建议先验证普通系统代理，再按真实需求开启 TUN。开启后完全断网时，先关闭其他网络工具，恢复默认 TUN 参数，检查防火墙权限和虚拟网卡状态，而不是直接关闭整个防火墙。

## 性能优化与稳定使用建议

订阅自动更新间隔设置为 6 至 12 小时通常足够，更新过密会增加耗电和服务器压力。自动测速也不宜频繁执行，尤其在移动设备上。常用节点可以建立固定策略组，流媒体、下载、办公和即时通讯分别选择合适线路。不要堆叠大量功能重复的规则集，规则越多并不代表越准确。

测试节点时应覆盖网页首次打开、连续视频播放、中等体积下载和常用应用登录，并在工作日、晚高峰和周末分别观察。对需要长期登录的账号，不建议频繁切换出口国家。家庭网络还要检查云备份、系统更新和视频上传是否占满上行带宽。

## 常见故障排查

**订阅无法更新：** 检查链接是否被截断、套餐状态、系统时间和网络权限，再使用浏览器访问服务商后台确认账号正常。

**所有节点超时：** 切换 Wi-Fi 与移动网络进行对照，检查客户端内核、系统代理、TUN 权限、防火墙和 DNS。只有个别节点失败时，通常是节点维护或线路拥堵。

**连接后无法上网：** 临时切换全局模式验证节点，再切回规则模式查看日志。如果全局可用而规则不可用，问题多半位于规则或 DNS；如果全局也不可用，应检查节点和本地网络。

**耗电或发热明显：** 降低测速与订阅更新频率，减少不必要的日志级别，关闭重复运行的代理软件，并检查后台是否存在持续下载。

## 安全、隐私与备份

不要把订阅链接、UUID、API 密钥、完整日志或真实 IP 直接公开。分享截图前遮挡节点名称、账户信息和本地路径。备份配置时应存放在受保护的位置；如果订阅泄露，立即在服务后台重置。客户端只能决定流量如何转发，不能保证第三方服务本身可信，因此仍应使用 HTTPS、双重验证和独立密码。

使用网络工具时请遵守所在地法律法规及服务条款。涉及价格、套餐和线路质量的信息会随时间变化，可以参考站内的 [机场套餐与线路对比](/article/iepl-line-review) 和 [机场优惠码大全](/article/airport-coupon-codes)，但付款前必须以服务商结算页为准。

## 相关阅读与官方资料

- [${c.name} 官方下载或文档](${c.official})
- [上一篇客户端教程：${prev.name}](/article/${prev.id})
- [下一篇客户端教程：${next.name}](/article/${next.id})
- [Clash 与 Shadowrocket 节点配置基础](/article/clash-shadowrocket-demo)

## 常见问题

### ${c.name} 可以直接使用其他客户端的订阅吗？

不一定。优先使用服务商明确提供的兼容订阅。即使节点协议相同，不同客户端对策略组、规则集和 DNS 字段的支持也可能不同。

### 延迟最低的节点一定最快吗？

不一定。延迟只反映一次探测，实际体验还取决于丢包、抖动、带宽、入口质量和晚高峰拥堵。应结合真实应用测试。

### 更新后无法连接应该怎么办？

先恢复上一稳定版本或导入备份配置，再检查更新日志中的破坏性变化。不要同时重装客户端和删除全部配置，否则会失去排查依据。

## 总结

使用 ${c.name} 的可靠路径是：从官方渠道安装，导入匹配格式的订阅，先用规则模式完成基础连接，再逐步配置${c.focus}。任何高级功能都应有明确目的和回退方法。配置越清晰、测试越分层，后续维护和故障定位就越容易。
`;}

for(const [i,c] of clients.entries()){
  fs.writeFileSync(path.join(articleDir,`${c.id}.md`),article(c,i),'utf8');
  fs.writeFileSync(path.join(imageDir,`${c.id}.svg`),svg(c),'utf8');
}

const index=`window.__CLIENT_GUIDES__=${JSON.stringify(clients.map(c=>({id:c.id,title:`2026 ${c.name} 深度使用教程：安装、订阅导入、规则分流与故障排查`,name:c.name,category:'客户端教程',date:c.date.slice(0,10),cover:`./public/assets/images/client-guides/${c.id}.svg`,excerpt:`面向 ${c.platform} 的完整教程，覆盖${c.focus}、故障排查与安全建议。`,tags:[c.name,'客户端教程']})))};\n`;
fs.writeFileSync(path.join('public','client-guide-index.js'),index,'utf8');
console.log(`Generated ${clients.length} client guides and unique SVG covers.`);
