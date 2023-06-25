import { StyleProp, ViewStyle } from "react-native";

export type BrimAppRichTextViewProps = {
  paragraphStyle: "title" | "header" | "body";
  style?: StyleProp<ViewStyle>;
};
