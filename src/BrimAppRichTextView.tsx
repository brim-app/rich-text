import {requireNativeViewManager} from "expo-modules-core";
import * as React from "react";

import {BrimAppRichTextViewProps} from "./BrimAppRichText.types";
import {useImperativeHandle} from "react";
import {findNodeHandle} from "react-native";
import BrimAppRichTextModule from "./BrimAppRichTextModule";

const NativeView = requireNativeViewManager("BrimAppRichText");

export type BrimAppRichTextViewRef = {
    setStyle(style: 'bold' | 'italic' | 'underline' | 'strikethrough', value: boolean): void;
};

function BrimAppRichTextViewComponent(props: BrimAppRichTextViewProps, ref: React.Ref<BrimAppRichTextViewRef>) {
    const innerRef = React.useRef<any>(null);

    useImperativeHandle(ref, () => ({
        setStyle(style: 'bold' | 'italic' | 'underline' | 'strikethrough', value: boolean) {
            if (!innerRef.current) return;

            const nodeId = findNodeHandle(innerRef.current)
            if (!nodeId) return;

            BrimAppRichTextModule.setStyle(nodeId, style, value);
        }
    }));

    return <NativeView ref={innerRef} {...props} />;
}

const BrimAppRichTextView = React.forwardRef(BrimAppRichTextViewComponent);
export default BrimAppRichTextView;
