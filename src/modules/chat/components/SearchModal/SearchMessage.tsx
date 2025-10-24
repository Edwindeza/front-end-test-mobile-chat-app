import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { Message } from "@/modules/chat/types/chat.type";
import { User } from "@/shared/types";
import { HighlightText } from "@/src/shared/components/HighlightText";

interface SearchMessageProps {
  message: Message;
  sender: User;
  query: string;
  formatTime: (timestamp: number) => string;
  highlightStyle: any;
}

export const SearchMessage: React.FC<SearchMessageProps> = ({
  message,
  sender,
  query,
  formatTime,
  highlightStyle,
}) => {
  const messageBubbleBg = useThemeColor({}, "messageBubbleBg");

  return (
    <ThemedView style={styles.messageContainer}>
      <ThemedView style={styles.messageHeader}>
        <ThemedText style={styles.senderName}>{sender.name}</ThemedText>
        <ThemedText style={styles.messageTime}>
          {formatTime(message.timestamp)}
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[styles.messageBubble, { backgroundColor: messageBubbleBg }]}
      >
        <ThemedText style={styles.messageText}>
          <HighlightText
            text={message.text}
            query={query}
            highlightStyle={highlightStyle}
          />
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
  },
  messageTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  messageBubble: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
