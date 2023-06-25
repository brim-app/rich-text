import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { BrimAppRichTextView } from "@brim-app/rich-text";
import { useState } from "react";

export default function App() {
  const [paragraphStyle, setParagraphStyle] = useState<
    "body" | "title" | "header"
  >("title");
  return (
    <SafeAreaView style={styles.container}>
      <Button title="toggle title" onPress={() => setParagraphStyle("title")} />
      <Button title="toggle body" onPress={() => setParagraphStyle("body")} />
      <Button
        title="toggle header"
        onPress={() => setParagraphStyle("header")}
      />
      <BrimAppRichTextView
        style={{
          flex: 1,
          backgroundColor: "red",
          width: "100%",
          height: "100%",
        }}
        paragraphStyle={paragraphStyle}
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
});
