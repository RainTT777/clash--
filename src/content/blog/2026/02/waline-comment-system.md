---
title: "Waline 评论系统搭建 - Vercel 部署与轻量化集成"
categories: "Share"
tags: ['Waline', '评论系统', 'Vercel']
id: "waline-comment-system"
date: 2026-02-12 10:00:00
cover: "/assets/images/chat_bg.webp"
---

:::note
Waline 是一款轻量级、安全且功能丰富的 HTML 静态博客评论系统。支持 Markdown 语法、表情包、邮件通知及多种数据库存储。
:::

### 🛠️ 部署步骤

1. 前往 Vercel 平台一键导入 Waline 项目模板。
2. 配置环境变量与数据库（如 LeanCloud / Supabase / MongoDB）。
3. 在 `src/config.ts` 中开启 Waline 属性并填写 `serverURL` 即可。
