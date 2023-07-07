//
//  RichTextVIew.swift
//  BrimAppRichText
//
//  Created by Muhammed Saeed on 25/06/2023.
//

import RichTextKit
import SwiftUI

struct BrimAppRichTextUIView: View {
    @State private var isLoaded: Bool = false
    @State private var text = NSAttributedString(string: "")
    @StateObject private var context: RichTextContext

    init(context: RichTextContext) {
        self._context = StateObject(wrappedValue: context)
    }

    var body: some View {
        RichTextEditor(text: $text, context: context)
            .onAppear {
                if !isLoaded {
                    isLoaded = true
                }
            }
    }
}
