import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/shared/components/ThemedText";
import { Message } from "@/modules/chat/types/chat.type";
import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { MessageStatusIndicator } from "./MessageStatusIndicator";
import { MessageActions } from "./MessageActions";
import { MediaMessage } from "@/modules/media/components/MediaMessage";
import { formatTime } from "@/shared/utils/timeUtils";
import { useThemeColor } from "@/shared/hooks/useThemeColor";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  senderName: string;
  onEdit: (messageId: string, currentText: string) => void;
  onDelete: (messageId: string) => void;
}

export function MessageBubble({
  message,
  isCurrentUser,
  senderName,
  onEdit,
  onDelete,
}: MessageBubbleProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const selfBubbleBg = useThemeColor({}, "messageBubbleBg");
  const otherBubbleBg = useThemeColor({}, "background");

  return (
    <MessageActions
      message={message}
      isCurrentUser={isCurrentUser}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <View
        style={[
          styles.container,
          isCurrentUser ? styles.selfContainer : styles.otherContainer,
        ]}
      >
        {!isCurrentUser && (
          <ThemedText style={styles.senderName}>{senderName}</ThemedText>
        )}
        <View
          style={[
            styles.bubble,
            isCurrentUser
              ? [styles.selfBubble, { backgroundColor: selfBubbleBg }]
              : [styles.otherBubble, { backgroundColor: otherBubbleBg }],
          ]}
        >
          {message.media && (
            <MediaMessage
              media={{
                ...message.media,
                status: "uploaded" as const,
              }}
              isCurrentUser={isCurrentUser}
              caption={message.text}
            />
          )}

          {message.text && !message.media && (
            <ThemedText
              style={[
                styles.messageText,
                isCurrentUser && !isDark && styles.selfMessageText,
              ]}
            >
              {message.text}
            </ThemedText>
          )}

          <View style={styles.timeContainer}>
            <ThemedText style={styles.timeText}>
              {formatTime(message.timestamp)}
            </ThemedText>
            <MessageStatusIndicator
              status={message.status}
              isCurrentUser={isCurrentUser}
            />
          </View>
        </View>
      </View>
    </MessageActions>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: "80%",
  },
  selfContainer: {
    alignSelf: "flex-end",
  },
  otherContainer: {
    alignSelf: "flex-start",
  },
  senderName: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selfBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  selfMessageText: {
    color: "#000000",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    opacity: 0.7,
  },
});
