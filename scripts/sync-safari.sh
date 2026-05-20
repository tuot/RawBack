#!/bin/bash


# xcrun safari-web-extension-converter .output/safari-mv3 \
#   --project-location . \
#   --copy-resources \
#   --bundle-identifier "com.ttqqcc.rawback" \
#   --app-name "RawBack" \
#   --force \
#   --no-open \
#   --no-prompt


# 使用 rsync 精确同步，--delete 会清理掉 Xcode 目录中已经不存在的旧资源文件
rsync -av --delete .output/safari-mv3/ "./RawBack/Shared (Extension)/Resources/"

echo "Safari resources synced. Open Xcode and build."