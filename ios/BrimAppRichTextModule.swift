import ExpoModulesCore

public class BrimAppRichTextModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('BrimAppRichText')` in JavaScript.
        Name("BrimAppRichText")

        AsyncFunction("setStyle") { (reactTag: Int, style: String, value: Bool) in
            DispatchQueue.main.async {
                self.appContext?.findView(withTag: reactTag, ofType: BrimAppRichTextView.self)?.setStyle(style, value)
            }
        }

        AsyncFunction("setText") { (reactTag: Int, text: String) in
            DispatchQueue.main.async {
                self.appContext?.findView(withTag: reactTag, ofType: BrimAppRichTextView.self)?.setText(text)
            }
        }

        AsyncFunction("setInitialText") { (reactTag: Int, data: InitialText) in
            DispatchQueue.main.async {
                self.appContext?.findView(withTag: reactTag, ofType: BrimAppRichTextView.self)?.setInitialText(data)
            }
        }

        // Enables the module to be used as a native view. Definition components that are accepted as part of the
        // view definition: Prop, Events.
        View(BrimAppRichTextView.self) {
            Events("onChangeText")

            Prop("initialText") { (view, data: InitialText) in
                view.setInitialText(data)
            }
        }
    }
}
