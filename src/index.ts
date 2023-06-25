import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to BrimAppRichText.web.ts
// and on native platforms to BrimAppRichText.ts
import BrimAppRichTextModule from './BrimAppRichTextModule';
import BrimAppRichTextView from './BrimAppRichTextView';
import { ChangeEventPayload, BrimAppRichTextViewProps } from './BrimAppRichText.types';

// Get the native constant value.
export const PI = BrimAppRichTextModule.PI;

export function hello(): string {
  return BrimAppRichTextModule.hello();
}

export async function setValueAsync(value: string) {
  return await BrimAppRichTextModule.setValueAsync(value);
}

const emitter = new EventEmitter(BrimAppRichTextModule ?? NativeModulesProxy.BrimAppRichText);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { BrimAppRichTextView, BrimAppRichTextViewProps, ChangeEventPayload };
