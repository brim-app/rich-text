import ExpoModulesCore

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class BrimAppRichTextView: ExpoView {
    private var richTextView = RichTextView()

    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        addSubview(richTextView)
    }

    override func layoutSubviews() {
        richTextView.frame = bounds
    }

    public func setStyle(style: String) {
        if style == "title" {
            richTextView.setStyle(.title)
        } else if style == "header" {
            richTextView.setStyle(.header)
        } else if style == "body" {
            richTextView.setStyle(.body)
        }
    }
}
