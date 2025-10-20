import React from "react";
import { ThemedText } from "@/shared/components/ThemedText";

interface HighlightTextProps {
  text: string | undefined;
  query: string;
  highlightStyle: any;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  query,
  highlightStyle,
}) => {
  if (!query.trim() || !text) return <>{text}</>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          return (
            <ThemedText key={index} style={highlightStyle}>
              {part}
            </ThemedText>
          );
        }
        return part;
      })}
    </>
  );
};
