package expo.modules.brimapprichtext

import android.annotation.SuppressLint
import android.content.Context
import com.onegravity.rteditor.RTEditText
import com.onegravity.rteditor.RTManager
import com.onegravity.rteditor.api.RTApi
import com.onegravity.rteditor.api.RTMediaFactoryImpl
import com.onegravity.rteditor.api.RTProxyImpl
import com.onegravity.rteditor.effects.Effects
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

@SuppressLint("ViewConstructor")
class BrimAppRichTextView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext) {
    private val activity = appContext.currentActivity
    private val rtApi = RTApi(context, RTProxyImpl(activity), RTMediaFactoryImpl(activity))
    private val rtManager= RTManager(rtApi, null).also {
        val rtEditText = RTEditText(context)
        addView(rtEditText)
        rtEditText.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        it.registerEditor(rtEditText, true)
    }

    fun setStyle(style: String, value: Boolean) {
        when (style) {
            "bold" -> rtManager.onEffectSelected(Effects.BOLD, value)
            "italic" -> rtManager.onEffectSelected(Effects.ITALIC, value)
            "strikethrough" -> rtManager.onEffectSelected(Effects.STRIKETHROUGH, value)
            "underline" -> rtManager.onEffectSelected(Effects.UNDERLINE, value)
            else -> {

            }
        }
    }
}
