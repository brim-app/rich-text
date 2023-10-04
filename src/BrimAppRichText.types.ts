import { ViewProps } from "react-native";
// import { EventEmitter } from "expo-modules-core";

export type onChangeTextEvent = {
  nativeEvent: RichText;
};

export interface RichText {
  string: string;
  target?: number;
  runs: RichTextRun[];
}

export interface RichTextRun {
  range: [number, number];
  attributes: RichTextAttributes;
}

export interface RichTextAttributes {
  font: RichTextFont;
}

export interface RichTextFont {
  name: string;
  size: number;
}

export type BrimAppRichTextNativeViewProps = ViewProps & {
  onChangeText?: (event: onChangeTextEvent) => void;
  initialText?: RichText;
};

export type BrimAppRichTextViewProps = Omit<
  BrimAppRichTextNativeViewProps,
  "onChangeText"
> & {
  onChangeText?: (text: RichText) => void;
};

export type BrimAppRichTextViewRef = {
  setStyle(
    style: "bold" | "italic" | "underline" | "strikethrough",
    value: boolean
  ): void;
  setText(text: string | RichText): void;

  setInitialText(
    text: NonNullable<BrimAppRichTextNativeViewProps["initialText"]>
  ): void;
};
