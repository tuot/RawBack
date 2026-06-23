---
layout: ../layouts/Layout.astro
title: RawBack - User & Developer Guide
lang: en
isDoc: true
---

# User & Developer Guide

RawBack helps you jump from raw Git file URLs back to the matching repository file page.

When you open a supported raw file, RawBack adds a quiet navigation banner at the top of the page. One click opens the same file in the normal repository view, so you can see the branch, path, history, and surrounding project context again.

---

## Features

- **Context Recovery**: Jump from raw files to repository file pages.
- **Broad Compatibility**: Supports GitHub, GitHub Gist, GitLab, Gitea, Codeberg, and self-hosted GitLab/Gitea domains.
- **Aesthetic Customization**: Light, dark, and system appearance themes.
- **Granular Controls**: Platform toggles, hidden files, and custom domains.
- **Localization**: Localized UI in 20 languages.
- **Privacy Centric**: No account, no ads, no analytics.

---

## Installation

### Safari
Install RawBack from the [App Store](https://apps.apple.com/app/id6770844819).

### Chrome, Edge, Brave, and other Chromium browsers
1. Download the Chromium zip from the latest GitHub Release.
2. Extract the zip.
3. Open `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked** and select the extracted extension folder.

### Firefox
1. Download the Firefox zip from the latest GitHub Release.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**.
4. Select the extracted `manifest.json`.

---

## Development

To start contributing or developing the extension locally:

```bash
# Install dependencies
pnpm install

# Run extension in dev mode
pnpm dev

# Run unit tests
pnpm test

# Build the extension
pnpm build
```

### Browser packaging
To bundle the extension for release:
```bash
pnpm zip
pnpm zip:firefox
```

### Safari Wrapper Sync
```bash
pnpm build:safari
```

### Fastlane (Safari Wrapper metadata)
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

---

## Release Process

Push a version tag to build browser packages and automatically create a GitHub Release:

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
