---
title: "常见机场节点连接超时与 DNS 污染问题排查解决指南"
categories: "网络优化"
tags: ['网络优化', '节点配置', 'Clash', '小火箭']
id: "dns-troubleshooting"
date: 2026-08-01 16:45:00
cover: "/assets/images/home-banner.webp"
---

:::note
遇到节点连接超时、网页打不开或订阅失败？本文梳理最全的排查步骤与解决方案。
:::

### 🔧 快速排查 Checklist

1. 检查节点订阅链接是否过期，重新在客户端点击 **Update Subscription**。
2. 将 DNS 解析切换为 `1.1.1.1` 或 `8.8.8.8`。
3. 检查系统时间是否同步，时间偏差超过 60 秒会导致加密握手失败。
