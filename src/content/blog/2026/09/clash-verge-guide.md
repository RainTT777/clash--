---
title: "Clash Verge / Clash for Windows 节点选优与分流规则指南"
categories: "节点配置"
tags: ['Clash', '节点配置', '网络优化', 'V2Ray']
id: "clash-verge-guide"
date: 2026-09-10 18:20:00
cover: "/assets/images/home-banner.webp"
---

:::note
Clash Verge Rev 是目前 Windows 与 macOS 平台最受欢迎的开源客户端，内置 Mihomo 内核，具备极低的内存占用与强大的规则分流引擎。本文详细讲解订阅导入、TUN 模式开启与节点自动优选策略。
:::

---

### 🛠️ 关键设置与优化

1. **导入订阅**：登录机场后台复制 Clash 订阅 URL，在 Clash Verge「订阅 (Profiles)」菜单中粘贴并点击 **Import**。
2. **开启规则模式 (Rule)**：在「代理 (Proxies)」页面，顶部选择 **Rule** 模式，实现国内直连、国外走代理。
3. **开启 Tun 模式**：在「设置」中开启 **TUN Mode**，接管系统全局 UDP/TCP 流量，支持 Steam/Epic 游戏加速。
4. **订阅定时更新**：建议设置间隔 24 小时自动更新，确保节点 IP 与规则持续保持最新。

:::btn btn-info
[📘 查看 2026 Clash 全平台深度使用教程](/article/clash-deep-guide)
:::

