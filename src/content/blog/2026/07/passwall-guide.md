---
title: "2026 PassWall 使用教程：节点配置、访问控制、负载均衡、DNS 与透明代理"
categories: "客户端教程"
tags: ['PassWall', 'OpenWrt 软路由与旁路由', '订阅导入', '规则分流', '客户端教程']
id: "passwall-guide"
date: 2026-07-17 12:00:00
cover: "/assets/images/client-guides/passwall-guide.svg"
---

![PassWall 深度使用教程](/assets/images/client-guides/passwall-guide.svg)

:::note
本文只讲 PassWall 真正需要注意的设置。界面可能随版本变化，请以官方稳定版为准，并在升级前保留可用配置。
:::

## 为什么选择 PassWall

PassWall 是 OpenWrt 上的透明代理管理方案，适合同时使用多种核心、节点和访问控制规则的家庭网络。它与 OpenClash 的配置模型不同。

## 下载与首次导入

从 [PassWall 官方页面](https://github.com/xiaorouji/openwrt-passwall) 下载适合 OpenWrt 软路由与旁路由 的版本。导入服务商明确标注兼容的订阅链接，先手动更新一次，确认能够看到节点或完整配置。订阅链接含有账户令牌，不要发到群聊、截图或在线转换网站。

首次连接只选择一个距离较近的节点，分别测试直连网站和代理网站。若配置列表为空，先检查套餐、订阅格式和系统时间，而不是立刻重装客户端。

## 适合 OpenWrt 软路由与旁路由 的使用方式

可为指定设备启用代理，也可让部分设备完全直连。适合需要按客户端 IP、目标域名和 TCP/UDP 类型做控制的网络。

## PassWall 的关键配置

先配置一个可靠的 TCP 节点并验证，再增加 UDP、负载均衡或备用节点。访问控制规则从具体设备开始，默认策略保持清晰，避免多层规则互相覆盖。

测速只表示探测时的响应，不代表晚高峰带宽。选择线路时同时观察丢包、视频缓冲、常用网站登录和出口地区稳定性。规则修改应一次只改一项，并保留可回退的配置。

## 最常见的故障与处理

TCP 可用而游戏 UDP 不通时，检查节点协议、UDP 转发和透明代理模式。DNS 正常但网页超时时，应查看 nftables/iptables 后端与本机端口是否匹配。

排查时按“本地网络→订阅→节点→DNS→规则→接管模式”的顺序进行。全局模式也不可用，多半是节点或网络；全局可用而规则模式失败，则重点查看规则命中和 DNS 日志。

## 隐私与维护

不要公开订阅链接、UUID、完整日志或真实 IP。分享截图时遮挡节点、账户和本地路径。订阅自动更新通常设置为 6 至 12 小时即可；升级客户端前记录当前版本并备份配置。

使用网络工具时请遵守所在地法律法规及服务条款。涉及价格、套餐和线路质量的信息会随时间变化，可以参考站内的 [机场套餐与线路对比](/article/iepl-line-review) 和 [机场优惠码大全](/article/airport-coupon-codes)，但付款前必须以服务商结算页为准。

## 相关阅读与官方资料

- [PassWall 官方下载或文档](https://github.com/xiaorouji/openwrt-passwall)
- [上一篇客户端教程：OpenClash](/article/openclash-guide)
- [下一篇客户端教程：sing-box Core](/article/sing-box-core-guide)
- [Clash 与 Shadowrocket 节点配置基础](/article/clash-shadowrocket-demo)

## 结语

PassWall 的核心并不是功能越多越好，而是让 节点配置、访问控制、负载均衡、DNS 与透明代理 与实际设备场景匹配。先保持配置简单、确认日志清晰，再逐步增加高级功能，会比复制一份庞杂模板更稳定。
