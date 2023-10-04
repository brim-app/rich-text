package expo.modules.brimapprichtext

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record


class InitialTextFont: Record {
    @Field
    val name: String = ""

    @Field
    val size: Double = 0.0
}

class InitialTextAttribute: Record {
    @Field
    val font: InitialTextFont = InitialTextFont()
}

class InitialTextRun: Record {
    @Field
    val attributes: InitialTextAttribute = InitialTextAttribute()

    @Field
    val range: Pair<Int, Int>? = null
}

class InitialText: Record {
    @Field
    val string: String = ""

    @Field
    val runs: Array<InitialTextRun> = arrayOf()
}
