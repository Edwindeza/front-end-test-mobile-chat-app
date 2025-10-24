import React, { useMemo, useCallback } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@/shared/components/Avatar";
import { ThemedText } from "@/shared/components/ThemedText";
import { User } from "@/shared/types";
import { formatChatTime, getChatName } from "@/shared/utils/chatUtils";
import { Chat } from "../types/chat.type";

interface ChatListItemProps {
  chat: Chat;
  currentUserId: string;
  users: User[];
}

export const ChatListItem = React.memo<ChatListItemProps>(
  ({ chat, currentUserId, users }) => {
    const navigation = useNavigation();

    const otherParticipants = useMemo(() => {
      return chat.participants
        .filter((id) => id !== currentUserId)
        .map((id) => users.find((user) => user.id === id))
        .filter(Boolean) as User[];
    }, [chat.participants, currentUserId, users]);

    const chatName = useMemo(() => {
      return getChatName(otherParticipants, currentUserId);
    }, [otherParticipants, currentUserId]);

    const handlePress = useCallback(() => {
      navigation.navigate("ChatRoom" as never, { chatId: chat.id } as never);
    }, [navigation, chat.id]);

    const timeString = useMemo(() => {
      if (!chat.lastMessage) return "";
      return formatChatTime(chat.lastMessage.timestamp);
    }, [chat.lastMessage]);

    const isCurrentUserLastSender = useMemo(
      () => chat.lastMessage?.senderId === currentUserId,
      [chat.lastMessage?.senderId, currentUserId]
    );

    const lastMessageText = useMemo(() => {
      if (!chat.lastMessage) return "";

      if (chat.lastMessage.media) {
        return isCurrentUserLastSender ? "You: Photo" : "Photo";
      }

      return isCurrentUserLastSender
        ? `You: ${chat.lastMessage.text}`
        : chat.lastMessage.text;
    }, [chat.lastMessage, isCurrentUserLastSender]);

    return (
      <Pressable style={styles.container} onPress={handlePress}>
        <Avatar user={otherParticipants[0]} size={50} />
        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <ThemedText
              type="defaultSemiBold"
              numberOfLines={1}
              style={styles.name}
            >
              {chatName}
            </ThemedText>
            {timeString && (
              <ThemedText style={styles.time}>{timeString}</ThemedText>
            )}
          </View>
          <View style={styles.bottomRow}>
            {lastMessageText && (
              <ThemedText
                numberOfLines={1}
                style={[
                  styles.lastMessage,
                  isCurrentUserLastSender && styles.currentUserMessage,
                ]}
              >
                {lastMessageText}
              </ThemedText>
            )}
          </View>
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E1E1E1",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: "#8F8F8F",
  },
  lastMessage: {
    fontSize: 14,
    color: "#8F8F8F",
    flex: 1,
  },
  currentUserMessage: {
    fontStyle: "italic",
  },
});
