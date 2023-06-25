import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { BrimAppRichTextViewProps } from './BrimAppRichText.types';

const NativeView: React.ComponentType<BrimAppRichTextViewProps> =
  requireNativeViewManager('BrimAppRichText');

export default function BrimAppRichTextView(props: BrimAppRichTextViewProps) {
  return <NativeView {...props} />;
}
