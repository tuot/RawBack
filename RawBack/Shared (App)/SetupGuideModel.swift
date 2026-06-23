import Combine
import Foundation

#if os(macOS)
import AppKit
import SafariServices
#endif

@MainActor
final class SetupGuideModel: ObservableObject {
    @Published private(set) var status: SetupGuideStatus = .unknown

#if os(macOS)
    private let extensionBundleIdentifier = "com.ttqqcc.rawback.Extension"
#endif

    func refresh() {
#if os(macOS)
        status = .unknown

        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { [weak self] state, error in
            let hasError = error != nil
            let isEnabled = state?.isEnabled

            Task { @MainActor [weak self] in
                guard let self else { return }

                guard !hasError, let isEnabled else {
                    status = .unknown
                    return
                }

                status = isEnabled ? .enabled : .disabled
            }
        }
#endif
    }

    func openSafariSettings() {
#if os(macOS)
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { [weak self] error in
            let didOpenSettings = error == nil

            Task { @MainActor [weak self] in
                guard let self else { return }

                guard didOpenSettings else {
                    status = .unknown
                    return
                }

                NSApp.terminate(nil)
            }
        }
#endif
    }
}
