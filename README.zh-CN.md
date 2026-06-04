# RawBack

[English](README.md)

RawBack 帮你从 raw Git 文件地址跳回对应的仓库文件页面。

当你打开受支持的 raw 文件时，RawBack 会在页面顶部显示一个低干扰导航条。点击后可打开同一文件的仓库页面，重新看到分支、路径、历史记录和项目上下文。

### 功能

- 从 raw 文件跳回仓库文件页
- 支持 GitHub、GitLab、Gitea、Codeberg，以及自托管 GitLab/Gitea 域名
- 支持浅色、深色、跟随系统主题
- 支持平台开关、隐藏文件、自定义域名
- UI 已本地化为英文、中文、日文、韩文、西班牙文、法文、德文、俄文
- 无账号、无广告、无分析追踪

### 安装

#### Safari

Safari 用户可直接从 [App Store](https://apps.apple.com/us/app/rawback/id6770844819) 安装。

#### Chrome、Edge、Brave 等 Chromium 浏览器

1. 从最新 GitHub Release 下载 Chromium zip。
2. 解压 zip。
3. 打开 `chrome://extensions`。
4. 开启开发者模式。
5. 点击加载已解压的扩展程序，选择解压后的扩展目录。

#### Firefox

1. 从最新 GitHub Release 下载 Firefox zip。
2. 打开 `about:debugging#/runtime/this-firefox`。
3. 点击临时载入附加组件。
4. 选择解压后的 `manifest.json`。

### 开发

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

浏览器扩展打包：

```bash
pnpm zip
pnpm zip:firefox
```

Safari 包装项目同步：

```bash
pnpm build:safari
```

### 发布

推送版本 tag 后，会自动打包浏览器扩展并创建 GitHub Release：

```bash
git tag v1.1.1
git push origin v1.1.1
```

Release workflow 会上传 Chromium 和 Firefox 扩展 zip，方便非 Safari 用户下载后手动加载。Safari 用户建议从 App Store 安装。

### GitHub Pages

仓库已包含 `docs/index.html` 静态落地页，默认英文，并支持页面内切换中文。

配置方式：

1. 推送 `main` 到 GitHub。
2. 打开仓库 Settings -> Pages。
3. 将 Build and deployment -> Source 设置为 GitHub Actions。
4. 手动运行 `GitHub Pages` workflow，或推送 `docs/` 下的改动触发部署。
5. 部署完成后，将 Pages URL 作为项目官网。

正式公开前，请确认 `docs/index.html` 里的 App Store 和 GitHub Release 链接。
