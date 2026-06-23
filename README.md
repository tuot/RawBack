# RawBack

[中文](README.zh-CN.md)

RawBack helps you jump from raw Git file URLs back to the matching repository file page.

When you open a supported raw file, RawBack adds a quiet navigation banner at the top of the page. One click opens the same file in the normal repository view, so you can see the branch, path, history, and surrounding project context again.

### Features

- Jump from raw files to repository file pages
- Supports GitHub, GitHub Gist, GitLab, Gitea, Codeberg, and self-hosted GitLab/Gitea domains
- Light, dark, and system themes
- Platform toggles, hidden files, and custom domains
- Localized UI in 20 languages, including English, Simplified/Traditional Chinese, Japanese, Korean, Spanish, French, German, Russian, Portuguese, Italian, Dutch, Polish, Turkish, Ukrainian, Indonesian, Vietnamese, Swedish, and Czech
- No account, no ads, no analytics

### Install

#### Safari

Install RawBack from the [App Store](https://apps.apple.com/app/id6770844819).

#### Chrome, Edge, Brave, and other Chromium browsers

1. Download the Chromium zip from the latest GitHub Release.
2. Extract the zip.
3. Open `chrome://extensions`.
4. Enable Developer mode.
5. Click Load unpacked and select the extracted extension folder.

#### Firefox

1. Download the Firefox zip from the latest GitHub Release.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click Load Temporary Add-on.
4. Select the extracted `manifest.json`.

### Development

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

Browser packages:

```bash
pnpm zip
pnpm zip:firefox
```

Safari wrapper sync:

```bash
pnpm build:safari
```

Fastlane for the Safari wrapper:

```bash
bundle install
pnpm fastlane lanes
pnpm ios:build
pnpm macos:build
```

App Store Connect metadata and screenshots are stored separately by platform:

```text
fastlane/metadata/ios
fastlane/metadata/macos
fastlane/screenshots/ios
fastlane/screenshots/macos
```

Pull the current App Store Connect version into those folders:

```bash
FASTLANE_APPLE_ID="you@example.com" APP_VERSION=1.2.0 bundle exec fastlane ios store_pull
FASTLANE_APPLE_ID="you@example.com" APP_VERSION=1.2.0 bundle exec fastlane mac store_pull
```

### Release

Push a version tag to build browser packages and create a GitHub Release:

```bash
git tag v1.1.1
git push origin v1.1.1
```

The release workflow uploads Chromium and Firefox extension zips for non-Safari users. Safari users should install from the App Store.

For App Store archives, use fastlane after signing is configured in Xcode:

```bash
pnpm ios:archive
pnpm macos:archive
```

Upload metadata and screenshots without uploading a binary:

```bash
FASTLANE_APPLE_ID="you@example.com" APP_VERSION=1.2.0 bundle exec fastlane ios store_push
FASTLANE_APPLE_ID="you@example.com" APP_VERSION=1.2.0 bundle exec fastlane mac store_push
```

### GitHub Pages

This repo includes a static landing page in `docs/index.html` with an English default and an in-page language switch.

To publish it:

1. Push `main` to GitHub.
2. Open repository Settings -> Pages.
3. Set Build and deployment -> Source to GitHub Actions.
4. Run the `GitHub Pages` workflow, or push a change under `docs/`.
5. After deployment, use the Pages URL as the project website.

Before publishing broadly, confirm the App Store and GitHub Release links in `docs/index.html`.
