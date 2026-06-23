import SwiftUI

#if os(iOS)
import UIKit
#elseif os(macOS)
import AppKit
#endif

struct AppIconImage: View {
    var body: some View {
        image.resizable()
    }

    private var image: Image {
#if os(iOS)
        if let url = Bundle.main.url(forResource: "Icon", withExtension: "png"),
           let uiImage = UIImage(contentsOfFile: url.path) {
            return Image(uiImage: uiImage)
        }
#elseif os(macOS)
        if let url = Bundle.main.url(forResource: "Icon", withExtension: "png"),
           let nsImage = NSImage(contentsOf: url) {
            return Image(nsImage: nsImage)
        }
#endif

        return Image(systemName: "arrow.uturn.backward.circle.fill")
    }
}
