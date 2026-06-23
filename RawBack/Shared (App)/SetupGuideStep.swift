import SwiftUI

struct SetupGuideStep: Identifiable {
    let id: Int
    let symbolName: String
    let title: LocalizedStringKey
    let message: LocalizedStringKey

    static var platformSteps: [SetupGuideStep] {
        [
            SetupGuideStep(
                id: 1,
                symbolName: "gearshape",
                title: "Open Safari settings",
                message: firstStepMessage
            ),
            SetupGuideStep(
                id: 2,
                symbolName: "puzzlepiece.extension",
                title: "Enable RawBack",
                message: "Find RawBack in the extension list and turn it on."
            ),
            SetupGuideStep(
                id: 3,
                symbolName: "globe",
                title: "Allow website access",
                message: "Allow RawBack to access GitHub, GitLab, and other supported sites."
            ),
        ]
    }

    private static var firstStepMessage: LocalizedStringKey {
#if os(macOS)
        "Open Safari Extensions from the button below."
#else
        "Open Settings and choose Safari."
#endif
    }
}
