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
          ref.current?.setInitialText({
            string: "Dadas \n\nDasdasd\n",
            runs: [
              {
                attributes: { font: { name: "Times New Roman", size: 16 } },
                range: [0, 8],
              },
              {
                attributes: { font: { size: 16, name: "Times New Roman" } },
                range: [8, 15],
              },
              {
                range: [15, 16],
                attributes: { font: { name: "Times New Roman", size: 16 } },
              },
            ],
          });
        }}
      />

      <BrimAppRichTextView
        onChangeText={(text) => {
          console.log(JSON.stringify(text));
        }}
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
  },
});
