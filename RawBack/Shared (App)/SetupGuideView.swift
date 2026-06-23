import SwiftUI

struct SetupGuideView: View {
    @StateObject private var model = SetupGuideModel()

    private let steps = SetupGuideStep.platformSteps

    var body: some View {
        GeometryReader { geometry in
            ScrollView {
                VStack(spacing: 22) {
                    VStack(spacing: 12) {
                        AppIconImage()
                            .frame(width: 80, height: 80)
                            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                            .shadow(color: .black.opacity(0.14), radius: 12, y: 4)
                            .accessibilityHidden(true)

                        VStack(spacing: 4) {
                            Text("RawBack")
                                .font(.title2.bold())

                            Text("Jump from raw files back to their repositories.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                        }
                    }

                    VStack(spacing: 10) {
                        ForEach(steps) { step in
                            SetupGuideStepCard(step: step)
                        }
                    }

#if os(macOS)
                    SetupGuideStatusCard(status: model.status)
#endif

                    VStack(spacing: 12) {
#if os(macOS)
                        Button(settingsButtonTitle, action: model.openSafariSettings)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .padding(.horizontal, 14)
                            .background(
                                RoundedRectangle(cornerRadius: 8, style: .continuous)
                                    .fill(Color.accentColor)
                            )
                            .foregroundColor(.white)
                            .buttonStyle(PlainButtonStyle())
#else
                        Text("You can manage RawBack from Settings > Safari > Extensions.")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 10)
#endif
                    }
                }
                .padding(24)
                .frame(maxWidth: 480)
                .frame(maxWidth: .infinity)
                .frame(minHeight: geometry.size.height, alignment: contentAlignment)
            }
        }
        .background(Color.rawBackBackground.ignoresSafeArea())
        .onAppear(perform: model.refresh)
    }

    private var contentAlignment: Alignment {
#if os(macOS)
        .center
#else
        .top
#endif
    }

#if os(macOS)
    private var settingsButtonTitle: LocalizedStringKey {
        if #available(macOS 13, *) {
            "Quit and Open Safari Settings..."
        } else {
            "Quit and Open Safari Preferences..."
        }
    }
#endif
}
