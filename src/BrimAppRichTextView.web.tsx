import * as React from 'react';

import { BrimAppRichTextViewProps } from './BrimAppRichText.types';

export default function BrimAppRichTextView(props: BrimAppRichTextViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
