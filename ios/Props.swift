//
//  Props.swift
//  BrimAppRichText
//
//  Created by Muhammed Saeed on 29/07/2023.
//

import ExpoModulesCore

struct InitialTextFont: Record {
    @Field
    var name: String = ""

    @Field
    var size: Double = 0.0
}

struct InitialTextAttribute: Record {
    @Field
    var font: InitialTextFont = .init()
}

struct InitialTextRun: Record {
    @Field
    var attributes: InitialTextAttribute = .init()

    @Field
    var range: [Int]
}

struct InitialText: Record {
    @Field
    var string: String = ""

    @Field
    var runs: [InitialTextRun] = []
}
