# RawBack

[English](README.md)

RawBack 帮你从 raw Git 文件地址跳回对应的仓库文件页面。

当你打开受支持的 raw 文件时，RawBack 会在页面顶部显示一个低干扰导航条。点击后可打开同一文件的仓库页面，重新看到分支、路径、历史记录和项目上下文。

### 功能

- 从 raw 文件跳回仓库文件页
- 支持 GitHub、GitHub Gist、GitLab、Gitea、Codeberg，以及自托管 GitLab/Gitea 域名
- 支持浅色、深色、跟随系统主题
- 支持平台开关、隐藏文件、自定义域名
- UI 已本地化为 20 种语言，包括英文、简/繁中文、日文、韩文、西班牙文、法文、德文、俄文、葡萄牙文（巴西/葡萄牙）、意大利文、荷兰文、波兰文、土耳其文、乌克兰文、印尼文、越南文、瑞典文、捷克文
- 无账号、无广告、无分析追踪

### 安装

#### Safari

Safari 用户可直接从 [App Store](https://apps.apple.com/app/id6770844819) 安装。

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

### 发布

推送版本 tag 后，会自动打包浏览器扩展并创建 GitHub Release：

```bash
git tag v1.1.1
git push origin v1.1.1
```

Release workflow 会上传 Chromium 和 Firefox 扩展 zip。
