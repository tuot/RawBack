---
layout: ../../layouts/Layout.astro
title: RawBack - 用户与开发指南
lang: zh
isDoc: true
---

# 用户与开发指南

RawBack 帮你从 raw Git 文件地址跳回对应的仓库文件页面。

当你打开受支持的 raw 文件时，RawBack 会在页面顶部显示一个低干扰导航条。点击后可打开同一文件的仓库页面，重新看到分支、路径、历史记录和项目上下文。

---

## 功能特性

- **上下文恢复**：从 raw 文件一键跳回仓库文件页面。
- **广泛兼容**：支持 GitHub、GitHub Gist、GitLab、Gitea、Codeberg 以及自建 GitLab/Gitea 域名。
- **个性化视觉**：支持浅色、深色、跟随系统主题。
- **细粒度控制**：支持平台开关、隐藏文件、自定义域名。
- **国际化**：UI 已本地化为 20 种语言。
- **隐私保护**：无账号、无广告、无分析追踪，不收集任何浏览数据。

---

## 安装方式

### Safari 浏览器
Safari 用户可直接从 [App Store](https://apps.apple.com/app/id6770844819) 安装。

### Chrome、Edge、Brave 等 Chromium 浏览器
1. 从最新 GitHub Release 下载 Chromium 格式的 zip 压缩包。
2. 解压该 zip 文件。
3. 打开浏览器中的 `chrome://extensions`。
4. 开启右侧的**开发者模式**。
5. 点击**加载已解压的扩展程序**，并选择刚才解压出来的扩展目录。

### Firefox 浏览器
1. 从最新 GitHub Release 下载 Firefox 格式的 zip 压缩包。
2. 打开 `about:debugging#/runtime/this-firefox`。
3. 点击**临时载入附加组件**。
4. 选择解压后的 `manifest.json`。

---

## 本地开发

若要本地调试或贡献代码：

```bash
# 安装依赖
pnpm install

# 以开发模式运行扩展
pnpm dev

# 运行单元测试
pnpm test

# 打包编译项目
pnpm build
```

### 浏览器扩展打包
为发布做准备的打包命令：
```bash
pnpm zip
pnpm zip:firefox
```

### Safari 包装项目同步
```bash
pnpm build:safari
```

### Fastlane (Safari 包装项目的元数据)
```bash
bundle install
pnpm fastlane lanes
pnpm ios:build
pnpm macos:build
```

App Store Connect 元数据和截图按平台分目录保存：
```text
fastlane/metadata/ios
fastlane/metadata/macos
fastlane/screenshots/ios
fastlane/screenshots/macos
```

从 App Store Connect 拉取当前版本到本地目录：
```bash
FASTLANE_APPLE_ID="you@example.com" APP_VERSION=1.2.0 bundle exec fastlane ios store_pull
FASTLANE_APPLE_ID="you@example.com" APP_VERSION=1.2.0 bundle exec fastlane mac store_pull
```

---

## 发布流程

推送版本 tag 后，会自动打包浏览器扩展并创建 GitHub Release：

```bash
git tag v1.1.1
git push origin v1.1.1
```

Release 工作流会上传 Chromium 和 Firefox 扩展 zip，方便非 Safari 用户下载后手动加载。Safari 用户建议从 App Store 安装。

如需生成 App Store archive 提交审核，请先在 Xcode 中配好证书与签名，然后执行：
```bash
pnpm ios:archive
pnpm macos:archive
```
