// Import the native module. On web, it will be resolved to BrimAppRichText.web.ts
// and on native platforms to BrimAppRichText.ts
import BrimAppRichTextView from "./BrimAppRichTextView";
import {
  BrimAppRichTextViewProps,
  BrimAppRichTextViewRef,
} from "./BrimAppRichText.types";

// Get the native constant value.
export const PI = Math.PI;

export {
  BrimAppRichTextView,
  BrimAppRichTextViewProps,
  BrimAppRichTextViewRef,
};
export * from "./BrimAppRichTextView";
