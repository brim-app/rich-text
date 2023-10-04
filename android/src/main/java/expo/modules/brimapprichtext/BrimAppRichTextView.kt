package expo.modules.brimapprichtext

import android.annotation.SuppressLint
import android.content.Context
import android.text.Editable
import android.text.TextWatcher
import android.view.Gravity
import com.onegravity.rteditor.RTEditText
import com.onegravity.rteditor.RTManager
import com.onegravity.rteditor.api.RTApi
import com.onegravity.rteditor.api.RTMediaFactoryImpl
import com.onegravity.rteditor.api.RTProxyImpl
import com.onegravity.rteditor.effects.Effects
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

@SuppressLint("ViewConstructor")
class BrimAppRichTextView(context: Context, appContext: AppContext) :
    ExpoView(context, appContext), TextWatcher {
    private val onChangeText by EventDispatcher()

    private val activity = appContext.currentActivity
    private val rtApi = RTApi(context, RTProxyImpl(activity), RTMediaFactoryImpl(activity))
    private val rtEditText = RTEditText(context).also {
        it.gravity = Gravity.TOP
        it.textAlignment = TEXT_ALIGNMENT_CENTER
        it.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        it.addTextChangedListener(this)
        addView(it)
    }
    private val rtManager = RTManager(rtApi, null).also {
        it.registerEditor(rtEditText, true)
    }

    fun setText(text: String) {
        rtEditText.setText(text)
    }

    fun setStyle(style: String, value: Boolean) {
        when (style) {
            "bold" -> rtManager.onEffectSelected(Effects.BOLD, value)
            "italic" -> rtManager.onEffectSelected(Effects.ITALIC, value)
            "strikethrough" -> rtManager.onEffectSelected(Effects.STRIKETHROUGH, value)
            "underline" -> rtManager.onEffectSelected(Effects.UNDERLINE, value)
        }
    }

    override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
    }

    override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
        onChangeText(mapOf("data" to p0.toString()))
    }

    override fun afterTextChanged(p0: Editable?) {
    }
}
