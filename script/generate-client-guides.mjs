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

const guideNotes = {
  'clash-verge-rev-guide': {
    intro:'适合希望在电脑上用图形界面管理 Mihomo 配置的用户。它的优势是系统代理、TUN、规则组和配置覆写集中在一个界面中，尤其适合 Windows 与 macOS 日常办公。',
    scenes:'浏览器和办公软件只需开启系统代理；游戏平台、命令行或不遵循系统代理的软件再启用 TUN。不要一开始就同时打开系统代理、TUN 和其他 VPN。',
    feature:'重点检查内核版本、服务模式和配置覆写。建议建立“手动选择、自动选择、故障转移”三个策略组，并把自定义规则写入覆写文件，避免订阅更新后丢失。',
    problem:'若 TUN 开启后断网，先退出其他虚拟网卡软件，再检查服务模式是否安装成功。托盘图标显示已连接但浏览器无网络时，应分别测试系统代理和 TUN，而不是反复更换节点。'
  },
  'v2rayn-guide': {
    intro:'v2rayN 更像 Windows 上的多协议节点控制台，适合需要管理多个订阅、分享链接和本地路由规则的用户。它与 Clash 配置体系不同，重点是核心选择、路由和系统代理。',
    scenes:'单节点链接可通过剪贴板或二维码导入；机场用户更适合建立订阅分组。不同订阅应使用清晰备注，避免测速后不知道节点来自哪个服务商。',
    feature:'先更新 GeoIP、GeoSite 与所需核心，再设置绕过局域网和国内地址。路由规则从“域名优先”开始，只有明确需要时才增加进程或 IP 规则。',
    problem:'日志出现 core not found 时不是节点故障，而是对应核心缺失。系统代理反复失效则检查 Windows 代理设置、端口占用和退出时是否恢复了系统代理。'
  },
  'hiddify-guide': {
    intro:'Hiddify 的定位是降低多协议客户端的配置门槛，适合不想手工维护大量规则的跨平台用户。它强调统一配置、快速连接和自动选择，而不是复杂脚本。',
    scenes:'首次使用可直接粘贴订阅或扫描配置二维码，让应用自动识别格式。经常在电脑和手机之间切换的人，可以保留相同的配置名称，但不要共享包含令牌的截图。',
    feature:'优先调整连接模式、区域选择和自动选择间隔。若服务商同时提供普通订阅与 Hiddify 配置，优先选官方标注的兼容入口，避免二次转换。',
    problem:'导入成功却没有可用配置，通常是订阅格式、地区时间或提供商返回内容异常。先查看配置更新时间，再尝试原始链接，不要连续安装多个来源不明的转换插件。'
  },
  'sing-box-desktop-guide': {
    intro:'sing-box 桌面端适合希望使用现代协议并理解路由逻辑的进阶用户。它围绕入站、出站、DNS 和规则集组织配置，灵活度高，但不适合照搬旧版 Clash YAML。',
    scenes:'图形客户端用于日常切换，原生配置更适合固定工作站。需要代理命令行、容器或虚拟机时，再使用 TUN 入站并明确排除局域网网段。',
    feature:'配置时按“DNS→入站→出站→路由”顺序检查。规则集应来自可信来源并固定更新策略，远程规则不可用时应有 final 出站或本地备用规则。',
    problem:'版本升级后字段报错，多半是配置语法迁移而非线路问题。使用官方 check 命令验证 JSON，定位具体字段后修改，不要删除整段 DNS 或 route 配置碰运气。'
  },
  'clash-meta-android-guide': {
    intro:'Clash Meta for Android 面向熟悉 Clash 策略组、又需要 Mihomo 新特性的 Android 用户。它适合多订阅、分应用代理和规则切换，但需要正确处理系统 VPN 权限。',
    scenes:'日常使用选择规则模式，并在“访问控制”中决定哪些应用走代理。支付、银行和本地生活应用可按实际情况直连，游戏平台则需要结合 UDP 支持测试。',
    feature:'导入配置后先确认内核、运行模式和日志等级，再设置后台保活。分应用代理应采用包含或排除其中一种逻辑，规则过于复杂会让排障变得困难。',
    problem:'锁屏后断连通常与电池优化、后台限制或系统清理有关。把应用设为不受限制并允许自启动；VPN 权限弹窗不出现时，先关闭占用系统 VPN 的其他应用。'
  },
  'v2rayng-guide': {
    intro:'V2RayNG 是 Android 上偏轻量的节点管理工具，适合使用分享链接、二维码或标准订阅的用户。它的操作重点是活动配置、路由和分应用代理。',
    scenes:'临时节点可扫码导入，长期使用则建立订阅组并定期更新。列表很长时不要只看延迟，先按地区筛选，再用真实网页和视频验证。',
    feature:'路由设置可从预定义规则开始，局域网地址保持直连。分应用代理适合只让浏览器或特定应用使用代理，选中后要确认采用的是“绕过”还是“代理”模式。',
    problem:'测试显示成功但应用打不开，常见原因是目标应用未被包含、私有 DNS 冲突或 IPv6 路由异常。先关闭分应用限制做一次对照，再逐项恢复。'
  },
  'hiddify-android-guide': {
    intro:'Hiddify Android 适合追求一键导入和简洁状态展示的移动用户。它隐藏了部分复杂参数，因此更应关注配置来源、连接状态和 Android 后台策略。',
    scenes:'适合在 Wi-Fi 与移动数据之间频繁切换，也适合不想手动维护策略组的用户。连接前可以让应用自动选择配置，重要账号则尽量固定出口地区。',
    feature:'开启始终开启 VPN 前，先确认普通连接稳定。电池优化设置为“不限制”，通知栏常驻用于判断进程是否仍在运行；自动更新无需设置得过于频繁。',
    problem:'网络切换后卡住时，先断开再连接，让虚拟网卡重新建立。若只有某个应用失败，检查分应用设置和该应用自身的私人 DNS，不必重置全部配置。'
  },
  'sing-box-android-guide': {
    intro:'sing-box Android 更适合需要原生规则集、精细 DNS 和 TUN 行为的用户。它不是“导入任何链接都能用”的万能客户端，配置版本与字段兼容性非常重要。',
    scenes:'可用于手机全局 TUN 接管，也可作为测试现代协议的工具。设备资源有限时，应减少远程规则集数量和日志详细度，避免启动慢与耗电。',
    feature:'分别检查配置校验、TUN 栈、DNS 服务器和 route final。规则集下载需要一个可用的初始网络路径，配置时应避免形成“规则集尚未下载就依赖代理”的循环。',
    problem:'启动即退出通常是 JSON 字段或规则集地址错误。先用官方文档对应当前版本校验配置；能启动但无解析结果时，再检查 DNS detour 与域名策略。'
  },
  'clash-mi-guide': {
    intro:'Clash Mi 面向 Apple 平台上希望使用 Clash 配置逻辑的用户，重点在策略组、规则模式和按需连接。它与传统 iOS 单节点客户端的操作习惯不同。',
    scenes:'适合已有 Clash/Mihomo 订阅、希望在 iPhone 与 Mac 之间保持相似策略组的人。导入前确认订阅明确支持该客户端，避免使用未经验证的在线转换。',
    feature:'先熟悉配置、代理、日志三个页面，再开启按需连接。策略组建议保留固定节点与自动选择两种，避免每次网络变化都切换到不同国家。',
    problem:'按需连接反复触发时，检查 Wi-Fi SSID 与域名条件是否过宽。配置更新后策略丢失，说明修改写在订阅正文中，应迁移到本地覆写或应用支持的持久设置。'
  },
  'shadowrocket-complete-guide': {
    intro:'Shadowrocket 是 iPhone 和 iPad 上常见的规则代理客户端，适合需要节点订阅、规则分流、按需连接和基础调试的用户。它的优势是轻量，而不是堆叠大量模块。',
    scenes:'订阅用户从“类型→Subscribe”添加链接，单节点用户可扫码导入。日常使用选择配置模式，只有排查规则问题时才短暂切到全局。',
    feature:'先理解节点、配置、模块和证书的区别。普通上网不需要安装解密证书；只有可信且明确需要 HTTPS 重写的模块才涉及证书，并应了解其风险。',
    problem:'节点可用但部分网站循环跳转，先关闭重写与模块做对照。订阅更新失败时检查链接、代理前置条件和套餐状态，不要把订阅地址交给第三方转换站。'
  },
  'stash-guide': {
    intro:'Stash 适合希望在 Apple 平台继续使用 Clash 配置体系的人，特色是覆写、规则集和策略组兼容。它更适合有一定 YAML 基础的用户。',
    scenes:'可以直接管理机场提供的 Clash 配置，再用 Override 修正本地需求。这样订阅更新不会覆盖自定义 DNS、规则或策略选择。',
    feature:'把长期修改放进覆写，而不是直接编辑远程配置。脚本和规则集分开管理，新增规则前先从请求日志确认域名，避免用过大的 DOMAIN-SUFFIX 误伤其他服务。',
    problem:'覆写后配置无法加载，优先检查缩进、字段层级和重复键。暂时禁用最后加入的覆写即可快速定位，不要删除原始订阅重新开始。'
  },
  'quantumult-x-guide': {
    intro:'Quantumult X 将节点资源、分流、重写与任务脚本集中在一套配置中，适合愿意维护资源引用的 iOS 用户。它的学习重点是不同资源类型不能混用。',
    scenes:'节点订阅放在 server_remote，分流规则放在 filter_remote，重写和脚本分别进入对应区域。复制链接时先确认作者说明的类型。',
    feature:'为远程资源设置合理的 update-interval，并控制 enabled 状态。MITM 只在确有需要时开启，hostname 范围越小越好；普通代理与测速不需要解密流量。',
    problem:'资源显示下载成功却不生效，通常是放错区域、标签重复或规则顺序被前面的规则截获。通过资源名称和请求记录逐项核对比反复重装更有效。'
  },
  'surge-guide': {
    intro:'Surge 更偏向网络调试与自动化平台，除了代理分流，还提供请求查看、策略组、模块和网络诊断。适合需要观察连接细节的 Apple 用户。',
    scenes:'日常配置保持精简，把办公、流媒体和故障转移拆成清晰策略组。遇到异常时使用 Dashboard 查看 DNS、规则命中、连接复用和实际出口。',
    feature:'优先掌握 select、url-test、fallback 三类策略。模块只加载必要功能，并记录来源与更新时间；多个模块修改同一请求时容易产生顺序冲突。',
    problem:'某应用连接慢时，不要只做 ICMP 延迟测试，应在请求日志中查看建连、TLS 和响应阶段。Mac 增强模式异常还需检查系统扩展权限。'
  },
  'openclash-guide': {
    intro:'OpenClash 运行在 OpenWrt 上，可为整个局域网提供 Clash/Mihomo 透明代理。它的难点不是点击启动，而是运行模式、DNS 劫持与旁路由拓扑。',
    scenes:'主路由部署适合统一接管，旁路由部署则必须明确网关和 DNS 指向。首次安装只接入一台测试设备，确认国内直连和代理访问都正常后再扩大范围。',
    feature:'先安装匹配架构的内核，再选择 Fake-IP 或 Redir-Host。访问控制中按 IP 或 MAC 分组，电视、游戏机和访客设备可以使用不同策略。',
    problem:'启动后全家断网时，立即停用插件并恢复原 DNS，再检查防火墙后端、端口冲突和网关。旁路由最常见的问题是只有网关生效却没有正确下发 DNS。'
  },
  'passwall-guide': {
    intro:'PassWall 是 OpenWrt 上的透明代理管理方案，适合同时使用多种核心、节点和访问控制规则的家庭网络。它与 OpenClash 的配置模型不同。',
    scenes:'可为指定设备启用代理，也可让部分设备完全直连。适合需要按客户端 IP、目标域名和 TCP/UDP 类型做控制的网络。',
    feature:'先配置一个可靠的 TCP 节点并验证，再增加 UDP、负载均衡或备用节点。访问控制规则从具体设备开始，默认策略保持清晰，避免多层规则互相覆盖。',
    problem:'TCP 可用而游戏 UDP 不通时，检查节点协议、UDP 转发和透明代理模式。DNS 正常但网页超时时，应查看 nftables/iptables 后端与本机端口是否匹配。'
  },
  'sing-box-core-guide': {
    intro:'sing-box Core 是面向 Linux、服务器和嵌入式环境的核心程序，没有图形界面替你隐藏配置错误。适合需要可审计 JSON、systemd 服务和明确路由链路的用户。',
    scenes:'可作为本机 TUN 客户端、局域网网关或容器中的代理核心。生产环境应把配置、规则集缓存和日志目录分开，并限制配置文件权限。',
    feature:'先用 sing-box check 校验配置，再以前台 run 观察日志，确认后才交给 systemd。服务单元设置明确的用户、重启策略和 WorkingDirectory，不要默认以 root 长期运行。',
    problem:'systemd 显示快速重启循环时，用 journalctl 查看第一条配置错误。命令行可运行而服务失败，通常是文件权限、相对路径、环境变量或能力权限不同。'
  }
};

function article(c,i){
  const prev=clients[(i+clients.length-1)%clients.length];
  const next=clients[(i+1)%clients.length];
  const note=guideNotes[c.id];
  return `---
title: "2026 ${c.name} 使用教程：${c.focus}"
categories: "客户端教程"
tags: ['${c.name}', '${c.platform.split('、')[0]}', '订阅导入', '规则分流', '客户端教程']
id: "${c.id}"
date: ${c.date}
cover: "/assets/images/client-guides/${c.id}.svg"
---

![${c.name} 深度使用教程](/assets/images/client-guides/${c.id}.svg)

:::note
本文只讲 ${c.name} 真正需要注意的设置。界面可能随版本变化，请以官方稳定版为准，并在升级前保留可用配置。
:::

## 为什么选择 ${c.name}

${note.intro}

## 下载与首次导入

从 [${c.name} 官方页面](${c.official}) 下载适合 ${c.platform} 的版本。导入服务商明确标注兼容的订阅链接，先手动更新一次，确认能够看到节点或完整配置。订阅链接含有账户令牌，不要发到群聊、截图或在线转换网站。

首次连接只选择一个距离较近的节点，分别测试直连网站和代理网站。若配置列表为空，先检查套餐、订阅格式和系统时间，而不是立刻重装客户端。

## 适合 ${c.platform} 的使用方式

${note.scenes}

## ${c.name} 的关键配置

${note.feature}

测速只表示探测时的响应，不代表晚高峰带宽。选择线路时同时观察丢包、视频缓冲、常用网站登录和出口地区稳定性。规则修改应一次只改一项，并保留可回退的配置。

## 最常见的故障与处理

${note.problem}

排查时按“本地网络→订阅→节点→DNS→规则→接管模式”的顺序进行。全局模式也不可用，多半是节点或网络；全局可用而规则模式失败，则重点查看规则命中和 DNS 日志。

## 隐私与维护

不要公开订阅链接、UUID、完整日志或真实 IP。分享截图时遮挡节点、账户和本地路径。订阅自动更新通常设置为 6 至 12 小时即可；升级客户端前记录当前版本并备份配置。

使用网络工具时请遵守所在地法律法规及服务条款。涉及价格、套餐和线路质量的信息会随时间变化，可以参考站内的 [机场套餐与线路对比](/article/iepl-line-review) 和 [机场优惠码大全](/article/airport-coupon-codes)，但付款前必须以服务商结算页为准。

## 相关阅读与官方资料

- [${c.name} 官方下载或文档](${c.official})
- [上一篇客户端教程：${prev.name}](/article/${prev.id})
- [下一篇客户端教程：${next.name}](/article/${next.id})
- [Clash 与 Shadowrocket 节点配置基础](/article/clash-shadowrocket-demo)

## 结语

${c.name} 的核心并不是功能越多越好，而是让 ${c.focus} 与实际设备场景匹配。先保持配置简单、确认日志清晰，再逐步增加高级功能，会比复制一份庞杂模板更稳定。
`;}

for(const [i,c] of clients.entries()){
  fs.writeFileSync(path.join(articleDir,`${c.id}.md`),article(c,i),'utf8');
  fs.writeFileSync(path.join(imageDir,`${c.id}.svg`),svg(c),'utf8');
}

const index=`window.__CLIENT_GUIDES__=${JSON.stringify(clients.map(c=>({id:c.id,title:`2026 ${c.name} 使用教程：${c.focus}`,name:c.name,category:'客户端教程',date:c.date.slice(0,10),cover:`./public/assets/images/client-guides/${c.id}.svg`,excerpt:guideNotes[c.id].intro,tags:[c.name,'客户端教程']})))};\n`;
fs.writeFileSync(path.join('public','client-guide-index.js'),index,'utf8');
console.log(`Generated ${clients.length} client guides and unique SVG covers.`);
