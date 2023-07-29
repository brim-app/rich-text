import { ViewProps } from "react-native";
// import { EventEmitter } from "expo-modules-core";

export type onChangeTextEvent = {
  nativeEvent: {
    data: string;
  };
};

// {"string":"Testy\n\nDsadasdsa dsadsadsa","target":25,"runs":[{"attributes":{"font":{"name":".AppleSystemUIFont","size":16}},"range":[0,17]},{"attributes":{"font":{"size":16,"name":".AppleSystemUIFont"}},"range":[17,26]}]}
export type BrimAppRichTextNativeViewProps = ViewProps & {
  onChangeText?: (event: onChangeTextEvent) => void;
  initialText?: {
    string: string;
    runs: Array<{
      attributes: {
        font: { name: string; size: number };
      };
      range: [number, number];
    }>;
  };
};

export type BrimAppRichTextViewProps = BrimAppRichTextNativeViewProps & {
  onChangeText?: (text: string) => void;
};

export type BrimAppRichTextViewRef = {
  setStyle(
    style: "bold" | "italic" | "underline" | "strikethrough",
    value: boolean
  ): void;
  setText(text: string): void;

  setInitialText(
    text: NonNullable<BrimAppRichTextNativeViewProps["initialText"]>
  ): void;
};
