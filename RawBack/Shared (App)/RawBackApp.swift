import SwiftUI

@main
struct RawBackApp: App {
#if os(macOS)
    @NSApplicationDelegateAdaptor(MacLifecycleDelegate.self) private var lifecycleDelegate
#endif

    var body: some Scene {
        WindowGroup {
            SetupGuideView()
        }
#if os(macOS)
        .windowStyle(.hiddenTitleBar)
#endif
    }
}
