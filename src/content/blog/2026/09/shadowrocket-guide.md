---
title: "Shadowrocket (小火箭) 节点订阅导入与规则分流配置指南"
categories: "客户端教程"
tags: ['Shadowrocket', '小火箭', 'iOS配置', '节点配置']
id: "shadowrocket-guide"
date: 2026-09-15 15:30:00
cover: "/assets/images/home-banner.webp"
---

:::note
小火箭 (Shadowrocket) 是 iOS 平台上最为强大的网络代理客户端之一。凭借极低耗电与多协议支持，为您带来极其顺畅的智能分流体验。
:::

---

### ⚙️ 核心设置推荐

1. **全局路由模式**：建议设置为 **配置 (Config)**，避免国内流量误走代理，节省节点流量并保证国内 App 直连秒开。
2. **节点一键导入**：点击右上角 `+` → 类型选择 `Subscribe` → 粘贴机场订阅 URL 保存。
3. **自动延迟测试**：开启 URL Test 选优节点，自动选择当前延迟最低的高速专线。
4. **加密 DNS**：设置 DoH 上游（如 `https://doh.pub/dns-query`），防护 DNS 劫持污染。

:::btn btn-info
[🚀 查看 2026 Shadowrocket (小火箭) iOS 深度特训教程](/article/shadowrocket-deep-guide)
:::

