import SwiftUI

enum SetupGuideStatus {
    case enabled
    case disabled
    case unknown

    var title: LocalizedStringKey {
        switch self {
        case .enabled:
            "RawBack is enabled"
        case .disabled:
            "RawBack is not enabled"
        case .unknown:
            "Check Safari extension settings"
        }
    }

    var message: LocalizedStringKey {
        switch self {
        case .enabled:
            "You can close this app and use RawBack in Safari."
        case .disabled:
            "Follow the steps above to enable the Safari extension."
        case .unknown:
            "Open Safari settings to confirm RawBack is enabled."
        }
    }

    var tint: Color {
        switch self {
        case .enabled:
            .green
        case .disabled:
            .orange
        case .unknown:
            .secondary
        }
    }

    var symbolName: String {
        switch self {
        case .enabled:
            "checkmark.circle.fill"
        case .disabled:
            "exclamationmark.circle.fill"
        case .unknown:
            "questionmark.circle.fill"
        }
    }
}
