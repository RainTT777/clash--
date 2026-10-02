---
title: "2026 Quantumult X 使用教程：节点资源、分流规则、重写、脚本和定时任务"
categories: "客户端教程"
tags: ['Quantumult X', 'iPhone 与 iPad', '订阅导入', '规则分流', '客户端教程']
id: "quantumult-x-guide"
date: 2026-07-20 12:00:00
cover: "/assets/images/client-guides/quantumult-x-guide.svg"
---

![Quantumult X 深度使用教程](/assets/images/client-guides/quantumult-x-guide.svg)

:::note
本文只讲 Quantumult X 真正需要注意的设置。界面可能随版本变化，请以官方稳定版为准，并在升级前保留可用配置。
:::

## 为什么选择 Quantumult X

Quantumult X 将节点资源、分流、重写与任务脚本集中在一套配置中，适合愿意维护资源引用的 iOS 用户。它的学习重点是不同资源类型不能混用。

## 下载与首次导入

从 [Quantumult X 官方页面](https://apps.apple.com/us/app/quantumult-x/id1443988620) 下载适合 iPhone 与 iPad 的版本。导入服务商明确标注兼容的订阅链接，先手动更新一次，确认能够看到节点或完整配置。订阅链接含有账户令牌，不要发到群聊、截图或在线转换网站。

首次连接只选择一个距离较近的节点，分别测试直连网站和代理网站。若配置列表为空，先检查套餐、订阅格式和系统时间，而不是立刻重装客户端。

## 适合 iPhone 与 iPad 的使用方式

节点订阅放在 server_remote，分流规则放在 filter_remote，重写和脚本分别进入对应区域。复制链接时先确认作者说明的类型。

## Quantumult X 的关键配置

为远程资源设置合理的 update-interval，并控制 enabled 状态。MITM 只在确有需要时开启，hostname 范围越小越好；普通代理与测速不需要解密流量。

测速只表示探测时的响应，不代表晚高峰带宽。选择线路时同时观察丢包、视频缓冲、常用网站登录和出口地区稳定性。规则修改应一次只改一项，并保留可回退的配置。

## 最常见的故障与处理

资源显示下载成功却不生效，通常是放错区域、标签重复或规则顺序被前面的规则截获。通过资源名称和请求记录逐项核对比反复重装更有效。

排查时按“本地网络→订阅→节点→DNS→规则→接管模式”的顺序进行。全局模式也不可用，多半是节点或网络；全局可用而规则模式失败，则重点查看规则命中和 DNS 日志。

## 隐私与维护

不要公开订阅链接、UUID、完整日志或真实 IP。分享截图时遮挡节点、账户和本地路径。订阅自动更新通常设置为 6 至 12 小时即可；升级客户端前记录当前版本并备份配置。

使用网络工具时请遵守所在地法律法规及服务条款。涉及价格、套餐和线路质量的信息会随时间变化，可以参考站内的 [机场套餐与线路对比](/article/iepl-line-review) 和 [机场优惠码大全](/article/airport-coupon-codes)，但付款前必须以服务商结算页为准。

## 相关阅读与官方资料

- [Quantumult X 官方下载或文档](https://apps.apple.com/us/app/quantumult-x/id1443988620)
- [上一篇客户端教程：Stash](/article/stash-guide)
- [下一篇客户端教程：Surge](/article/surge-guide)
- [Clash 与 Shadowrocket 节点配置基础](/article/clash-shadowrocket-demo)

## 结语

Quantumult X 的核心并不是功能越多越好，而是让 节点资源、分流规则、重写、脚本和定时任务 与实际设备场景匹配。先保持配置简单、确认日志清晰，再逐步增加高级功能，会比复制一份庞杂模板更稳定。
