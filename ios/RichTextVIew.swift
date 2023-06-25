//
//  RichTextVIew.swift
//  BrimAppRichText
//
//  Created by Muhammed Saeed on 25/06/2023.
//

class RichTextView: UITextView, UITextViewDelegate, NSTextStorageDelegate {
    private var currentStyle: TextStyle = .body
    private var didGoToNewLine = false

    override init(frame: CGRect, textContainer: NSTextContainer?) {
        super.init(frame: frame, textContainer: textContainer)

        self.currentStyle = .title
        self.updateStyle()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func scrollRectToVisible(_ rect: CGRect, animated: Bool) {
        // intentionally empty to cancel uitextview auto scrolling
    }

    func currentParagraphRange() -> NSRange {
        return (self.textStorage.string as NSString).paragraphRange(for: self.selectedRange)
    }

    public func setStyle(_ style: TextStyle) {
        self.currentStyle = style
        self.updateStyle()
    }

    private func updateStyle() {
        let charRange = self.currentParagraphRange()

        if charRange.location == NSNotFound {
            print("Not found")
            return
        }

        textStorage.beginEditing()
        textStorage.setAttributes(self.currentStyle.attributes, range: charRange)
        textStorage.endEditing()

        self.typingAttributes = self.currentStyle.attributes
    }

    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        if text == "\n" {
            self.didGoToNewLine = true
        }

        return true
    }

    func textViewDidChangeSelection(_ textView: UITextView) {
        if self.didGoToNewLine {
            let range = self.currentParagraphRange()
            if range.location != NSNotFound {
                self.currentStyle = .body

                textStorage.beginEditing()
                textStorage.addAttributes(self.currentStyle.attributes, range: range)
                textStorage.endEditing()

                self.typingAttributes = self.currentStyle.attributes
            }

            self.didGoToNewLine = false
            return
        }

        let range = self.currentParagraphRange()

        if range.location >= 0 && range.location < textView.text.count {
            let att = textStorage.attributes(at: range.location, effectiveRange: nil)

            if let style = att[.customStyle] as? Int {
                switch style {
                case 0:
                    if self.currentStyle != .title {
                        self.currentStyle = .title
                    }
                    typingAttributes = TextStyle.title.attributes
                case 1:
                    if self.currentStyle != .header {
                        self.currentStyle = .header
                    }
                    typingAttributes = TextStyle.header.attributes
                default:
                    if self.currentStyle != .body {
                        self.currentStyle = .body
                    }
                    typingAttributes = TextStyle.body.attributes
                }
            }
        } else {
            typingAttributes = self.currentStyle.attributes
        }
    }
}

extension RichTextView {
    enum TextStyle {
        case body, header, title

        var attributes: [NSAttributedString.Key: Any] {
            switch self {
            case .body:
                return EntryTextAttributes.BodyAttributes
            case .header:
                return EntryTextAttributes.HeaderAttributes
            case .title:
                return EntryTextAttributes.TitleAttributes
            }
        }
    }
}

extension NSAttributedString.Key {
    static let customStyle = NSAttributedString.Key("CustomStyle")
}

enum EntryTextAttributes {
    public static var TitleAttributes: [NSAttributedString.Key: Any] {
        return [
            .customStyle: 0,
            .font: UIFont.systemFont(ofSize: 24),
            .paragraphStyle: EntryTextAttributes.paragraphSpacing(12, 14),
        ]
    }

    public static var HeaderAttributes: [NSAttributedString.Key: Any] {
        return [
            .customStyle: 1,
            .font: UIFont.systemFont(ofSize: 21),
            .paragraphStyle: EntryTextAttributes.paragraphSpacing(10, 10),
        ]
    }

    public static var BodyAttributes: [NSAttributedString.Key: Any] {
        return [
            .customStyle: 2,
            .font: UIFont.systemFont(ofSize: 17),
            .paragraphStyle: EntryTextAttributes.paragraphSpacing(8, lineSpacing: 4),
        ]
    }

    private static func paragraphSpacing(
        _ spacing: CGFloat, _ before: CGFloat? = nil, lineSpacing: CGFloat? = nil
    ) -> NSMutableParagraphStyle {
        let style = NSMutableParagraphStyle()
        style.paragraphSpacing = spacing
        if let before = before {
            style.paragraphSpacingBefore = before
        }
        if let lineSpacing = lineSpacing {
            style.lineSpacing = lineSpacing
        }
        return style
    }
}
