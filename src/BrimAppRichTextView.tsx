import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import {
  BrimAppRichTextNativeViewProps,
  BrimAppRichTextViewProps,
  BrimAppRichTextViewRef,
  RichText,
  onChangeTextEvent,
} from "./BrimAppRichText.types";
import { useImperativeHandle } from "react";
import { findNodeHandle } from "react-native";
import BrimAppRichTextModule from "./BrimAppRichTextModule";

const NativeView =
  requireNativeViewManager<BrimAppRichTextNativeViewProps>("BrimAppRichText");

function BrimAppRichTextViewComponent(
  { onChangeText, ...props }: BrimAppRichTextViewProps,
  ref: React.ForwardedRef<BrimAppRichTextViewRef>
) {
  const innerRef = React.useRef<any>(null);

  const handleNativeEvent = React.useCallback(
    (event: onChangeTextEvent) => {
      if (onChangeText) {
        onChangeText(event.nativeEvent);
      }
    },
    [onChangeText]
  );

  useImperativeHandle(ref, () => ({
    setStyle(
      style: "bold" | "italic" | "underline" | "strikethrough",
      value: boolean
    ) {
      innerRef.current?.setStyle?.(style, value);
    },
    setText(text: string | RichText) {
      if (!innerRef.current) return;

      const nodeId = findNodeHandle(innerRef.current);
      if (!nodeId) return;

      if (typeof text === "string") {
        return BrimAppRichTextModule.setText(nodeId, text);
      }
      if (typeof text === "object") {
        return BrimAppRichTextModule.setTextWithData(nodeId, text);
      }
    },
    setInitialText(
      initialText: NonNullable<BrimAppRichTextNativeViewProps["initialText"]>
    ) {
      if (!innerRef.current) return;

      const nodeId = findNodeHandle(innerRef.current);
      if (!nodeId) return;

      BrimAppRichTextModule.setInitialText(nodeId, initialText);
    },
  }));

  return (
    <NativeView
      // @ts-expect-error
      ref={innerRef}
      onChangeText={handleNativeEvent}
      {...props}
    />
  );
}

const BrimAppRichTextView = React.forwardRef(BrimAppRichTextViewComponent);
export default BrimAppRichTextView;
