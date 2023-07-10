import ExpoModulesCore
import RichTextKit
import SwiftUI

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class BrimAppRichTextView: ExpoView {
    let onChangeText = EventDispatcher("onChangeText")

    lazy var context = RichTextContext()
    lazy var ui = BrimAppRichTextUIView(context: self.context)
    lazy var vc = ViewController(uiView: self.ui)

    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        addSubview(vc.view)
    }

    override func layoutSubviews() {
        vc.view.frame = bounds
    }

    public func setText(_ text: String) {
        ui.setText(text)
    }

    public func setStyle(_ style: String, _ value: Bool) {
        switch style {
        case "italic":
            setItalic(value)
        case "bold":
            setBold(value)
        case "strikethrough":
            setStrikethrough(value)
        case "underline":
            setUnderline(value)
        default:
            break
        }
    }

    private func setItalic(_ value: Bool) {
        if value != context.isItalic {
            context.isItalic = value
        }
    }

    private func setBold(_ value: Bool) {
        if value != context.isBold {
            context.isBold = value
        }
    }

    private func setStrikethrough(_ value: Bool) {
        if value != context.isStrikethrough {
            context.isStrikethrough = value
        }
    }

    private func setUnderline(_ value: Bool) {
        if value != context.isUnderlined {
            context.isUnderlined = value
        }
    }
}
