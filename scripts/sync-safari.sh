#!/bin/bash

# 使用 rsync 精确同步，--delete 会清理掉 Xcode 目录中已经不存在的旧资源文件
rsync -av --delete .output/safari-mv3/ "./RawBack/Shared (Extension)/Resources/"
echo "Safari resources synced. Open Xcode and build."