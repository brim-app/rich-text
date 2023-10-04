import { Button, SafeAreaView, StyleSheet } from "react-native";
import {
  BrimAppRichTextView,
  BrimAppRichTextViewRef,
} from "@brim-app/rich-text";
import { useCallback, useReducer, useRef, useState } from "react";
import Toolbar from "./Toolbar";

export default function App() {
  const ref = useRef<BrimAppRichTextViewRef>(null);
  const [show, toggle] = useReducer((state) => !state, false);

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
      <Toolbar editorState={editorState} handleState={handleState} />
      <Button
        title="Toggle"
        onPress={() => {
          ref.current?.setText({
            string: "Testtest",
            target: 45,
            runs: [
              {
                range: [0, 8],
                attributes: { font: { name: ".SFUI-Regular", size: 24 } },
              },
            ],
          });
        }}
      />

      <BrimAppRichTextView
        ref={ref}
        style={styles.rtView}
        onChangeText={(text) => {
          console.log(JSON.stringify(text));
        }}
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
    // flex: 1,
    width: "100%",
    minHeight:100,
  },
});
