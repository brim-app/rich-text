import {SafeAreaView, StyleSheet} from "react-native";
import {
    BrimAppRichTextView,
    BrimAppRichTextViewRef,
} from "@brim-app/rich-text";
import {useCallback, useRef, useState} from "react";
import Toolbar from "./Toolbar";

export default function App() {
    const ref = useRef<BrimAppRichTextViewRef>(null);

    const [editorState, setEditorState] = useState<{
        bold: boolean;
        italic: boolean;
        underline: boolean;
        strikethrough: boolean;
    }>({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    });


    const handleState = useCallback(
        (key: keyof typeof editorState) => {
            return () => {
                const currentValue = editorState[key];
                setEditorState((state) => ({
                    ...state,
                    [key]: !currentValue,
                }));
                ref.current?.setStyle(key, !currentValue);
            };
        },
        [editorState]
    );

    return (
        <SafeAreaView style={styles.container}>
            <Toolbar editorState={editorState} handleState={handleState}/>
            <BrimAppRichTextView
                ref={ref}
                style={styles.rtView}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    rtView: {
        flex: 1,
        width: "100%",
        height: "100%",
    }
});
