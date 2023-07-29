//
//  RichTextVIew.swift
//  BrimAppRichText
//
//  Created by Muhammed Saeed on 25/06/2023.
//

import RichTextKit
import SwiftUI

struct BrimAppRichTextUIView: View {
    public var onChangeHook: (_ text: NSAttributedString) -> Void

    @State private var text: NSAttributedString
    @StateObject private var context: RichTextContext

    init(context: RichTextContext, onChangeHook: @escaping (_ text: NSAttributedString) -> Void) {
        self._context = StateObject(wrappedValue: context)
        self.onChangeHook = onChangeHook
        self.text = .init(string: "")
    }

    var body: some View {
        RichTextEditor(text: self.$text, context: self.context)
            .onChange(of: self.text, perform: self.onChangeHook)
    }
}
