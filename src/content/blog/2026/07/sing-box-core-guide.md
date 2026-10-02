---
title: "2026 sing-box Core 使用教程：JSON 配置、入站出站、路由规则、DNS 和 systemd 服务"
categories: "客户端教程"
tags: ['sing-box Core', 'Linux', '订阅导入', '规则分流', '客户端教程']
id: "sing-box-core-guide"
date: 2026-07-16 12:00:00
cover: "/assets/images/client-guides/sing-box-core-guide.svg"
---

![sing-box Core 深度使用教程](/assets/images/client-guides/sing-box-core-guide.svg)

:::note
本文只讲 sing-box Core 真正需要注意的设置。界面可能随版本变化，请以官方稳定版为准，并在升级前保留可用配置。
:::

## 为什么选择 sing-box Core

sing-box Core 是面向 Linux、服务器和嵌入式环境的核心程序，没有图形界面替你隐藏配置错误。适合需要可审计 JSON、systemd 服务和明确路由链路的用户。

## 下载与首次导入

从 [sing-box Core 官方页面](https://sing-box.sagernet.org/) 下载适合 Linux、服务器与软路由 的版本。导入服务商明确标注兼容的订阅链接，先手动更新一次，确认能够看到节点或完整配置。订阅链接含有账户令牌，不要发到群聊、截图或在线转换网站。

首次连接只选择一个距离较近的节点，分别测试直连网站和代理网站。若配置列表为空，先检查套餐、订阅格式和系统时间，而不是立刻重装客户端。

## 适合 Linux、服务器与软路由 的使用方式

可作为本机 TUN 客户端、局域网网关或容器中的代理核心。生产环境应把配置、规则集缓存和日志目录分开，并限制配置文件权限。

## sing-box Core 的关键配置

先用 sing-box check 校验配置，再以前台 run 观察日志，确认后才交给 systemd。服务单元设置明确的用户、重启策略和 WorkingDirectory，不要默认以 root 长期运行。

测速只表示探测时的响应，不代表晚高峰带宽。选择线路时同时观察丢包、视频缓冲、常用网站登录和出口地区稳定性。规则修改应一次只改一项，并保留可回退的配置。

## 最常见的故障与处理

systemd 显示快速重启循环时，用 journalctl 查看第一条配置错误。命令行可运行而服务失败，通常是文件权限、相对路径、环境变量或能力权限不同。

排查时按“本地网络→订阅→节点→DNS→规则→接管模式”的顺序进行。全局模式也不可用，多半是节点或网络；全局可用而规则模式失败，则重点查看规则命中和 DNS 日志。

## 隐私与维护

不要公开订阅链接、UUID、完整日志或真实 IP。分享截图时遮挡节点、账户和本地路径。订阅自动更新通常设置为 6 至 12 小时即可；升级客户端前记录当前版本并备份配置。

使用网络工具时请遵守所在地法律法规及服务条款。涉及价格、套餐和线路质量的信息会随时间变化，可以参考站内的 [机场套餐与线路对比](/article/iepl-line-review) 和 [机场优惠码大全](/article/airport-coupon-codes)，但付款前必须以服务商结算页为准。

## 相关阅读与官方资料

- [sing-box Core 官方下载或文档](https://sing-box.sagernet.org/)
- [上一篇客户端教程：PassWall](/article/passwall-guide)
- [下一篇客户端教程：Clash Verge Rev](/article/clash-verge-rev-guide)
- [Clash 与 Shadowrocket 节点配置基础](/article/clash-shadowrocket-demo)

## 结语

sing-box Core 的核心并不是功能越多越好，而是让 JSON 配置、入站出站、路由规则、DNS 和 systemd 服务 与实际设备场景匹配。先保持配置简单、确认日志清晰，再逐步增加高级功能，会比复制一份庞杂模板更稳定。
