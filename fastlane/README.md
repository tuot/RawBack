fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios sync

```sh
[bundle exec] fastlane ios sync
```

Sync browser extension assets into the Safari wrapper

### ios build

```sh
[bundle exec] fastlane ios build
```

Build the iOS Safari wrapper in Release configuration

### ios archive

```sh
[bundle exec] fastlane ios archive
```

Archive the iOS Safari wrapper for App Store distribution

### ios metadata_pull

```sh
[bundle exec] fastlane ios metadata_pull
```

Download iOS App Store metadata into fastlane/metadata/ios

### ios screenshots_pull

```sh
[bundle exec] fastlane ios screenshots_pull
```

Download iOS App Store screenshots into fastlane/screenshots/ios

### ios store_pull

```sh
[bundle exec] fastlane ios store_pull
```

Download iOS App Store metadata and screenshots

### ios metadata_push

```sh
[bundle exec] fastlane ios metadata_push
```

Upload iOS App Store metadata only

### ios screenshots_push

```sh
[bundle exec] fastlane ios screenshots_push
```

Upload iOS App Store screenshots only

### ios store_push

```sh
[bundle exec] fastlane ios store_push
```

Upload iOS App Store metadata and screenshots without binary

----


## Mac

### mac sync

```sh
[bundle exec] fastlane mac sync
```

Sync browser extension assets into the Safari wrapper

### mac build

```sh
[bundle exec] fastlane mac build
```

Build the macOS Safari wrapper in Release configuration

### mac archive

```sh
[bundle exec] fastlane mac archive
```

Archive the macOS Safari wrapper for App Store distribution

### mac metadata_pull

```sh
[bundle exec] fastlane mac metadata_pull
```

Download macOS App Store metadata into fastlane/metadata/macos

### mac screenshots_pull

```sh
[bundle exec] fastlane mac screenshots_pull
```

Download macOS App Store screenshots into fastlane/screenshots/macos

### mac store_pull

```sh
[bundle exec] fastlane mac store_pull
```

Download macOS App Store metadata and screenshots

### mac metadata_push

```sh
[bundle exec] fastlane mac metadata_push
```

Upload macOS App Store metadata only

### mac screenshots_push

```sh
[bundle exec] fastlane mac screenshots_push
```

Upload macOS App Store screenshots only

### mac store_push

```sh
[bundle exec] fastlane mac store_push
```

Upload macOS App Store metadata and screenshots without binary

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
