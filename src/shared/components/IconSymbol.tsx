// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import {
  OpaqueColorValue,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": "home",
  "paperplane.fill": "send",
  "bubble.left.and.bubble.right": "chat-bubble-outline",
  "bubble.left.and.bubble.right.fill": "chat-bubble",
  "person.circle": "person-outline",
  "person.circle.fill": "person",
  xmark: "close",
  plus: "add",
  "chevron.left": "chevron-left",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "arrow.up.circle.fill": "send",
  pencil: "edit",
  "arrow.right.square": "logout",
  checkmark: "check",
  magnifyingglass: "search",
  "checkmark.circle": "check-circle",
  "checkmark.circle.fill": "check-circle",
  trash: "delete",
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof MaterialIcons>["name"]
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style as StyleProp<TextStyle>}
    />
  );
}
