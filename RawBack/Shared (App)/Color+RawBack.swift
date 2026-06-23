import SwiftUI

#if os(iOS)
import UIKit
#elseif os(macOS)
import AppKit
#endif

extension Color {
    static var rawBackBackground: Color {
#if os(iOS)
        Color(UIColor.systemGroupedBackground)
#else
        Color(NSColor.windowBackgroundColor)
#endif
    }

    static var rawBackCardBackground: Color {
#if os(iOS)
        Color(UIColor.secondarySystemGroupedBackground)
#else
        Color(NSColor.controlBackgroundColor)
#endif
    }

    static var rawBackCardBorder: Color {
#if os(iOS)
        Color(UIColor.separator).opacity(0.3)
#else
        Color(NSColor.separatorColor).opacity(0.5)
#endif
    }
}
