//
//  BrimAppRichTextFormat.swift
//  BrimAppRichText
//
//  Created by Muhammed Saeed on 29/07/2023.
//

enum BrimAppRichTextFormat {
    typealias ReturnedData = [String: Any]

    static func convert(with attributedString: NSAttributedString) -> ReturnedData {
        var returnedData: ReturnedData = [:]
        returnedData["string"] = attributedString.string

        var runAttributesArray: [ReturnedData] = []

        attributedString.enumerateAttributes(in: NSRange(0 ..< attributedString.length), options: []) { attributedDictionary, range, _ in
            let runAttributes = NSMutableDictionary()

            if let font = attributedDictionary[.font] as? UIFont {
                runAttributes["font"] = [
                    "name": font.fontName,
                    "size": font.pointSize
                ] as ReturnedData
            }

            if let strikethrough = attributedDictionary[.strikethroughStyle] {
                runAttributes["strikethrough"] = strikethrough
            }

            runAttributesArray.append([
                "range": [range.lowerBound, range.upperBound],
                "attributes": runAttributes
            ] as ReturnedData)
        }
        returnedData["runs"] = runAttributesArray

        return returnedData
    }

    static func convert(with data: InitialText) -> NSAttributedString {
        let attrString = NSMutableAttributedString(string: data.string)

        for run in data.runs {
            let attributes: [NSAttributedString.Key: Any] = BrimAppRichTextFormat.convertAttributesFromJSONToDictionary(run.attributes)
            let range = NSRange(location: run.range[0], length: run.range[1] - run.range[0])

            attrString.addAttributes(attributes, range: range)
        }

        return attrString
    }

    static func convertAttributesFromJSONToDictionary(_ attribute: InitialTextAttribute) -> [NSAttributedString.Key: Any] {
        var attrDict: [NSAttributedString.Key: Any] = [:]

        if let font = UIFont(name: attribute.font.name, size: attribute.font.size) {
            attrDict.updateValue(font, forKey: .font)
        }

        return attrDict
    }
}
