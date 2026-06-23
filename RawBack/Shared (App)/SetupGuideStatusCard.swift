import SwiftUI

struct SetupGuideStatusCard: View {
    let status: SetupGuideStatus

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: status.symbolName)
                .font(.system(size: 14, weight: .semibold))
                .foregroundColor(status.tint)
                .frame(width: 16, height: 16)
                .padding(.top, 2)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 4) {
                Text(status.title)
                    .font(.subheadline.weight(.semibold))

                Text(status.message)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .fill(Color.rawBackCardBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .stroke(Color.rawBackCardBorder)
        )
    }
}
