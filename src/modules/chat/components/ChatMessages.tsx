import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { MessageBubble } from "@/modules/chat/components/MessageBubble";
import { useChatStore } from "@/modules/chat/store/useChatStore";
import { useUsers } from "@/modules/user/hooks/useUsers";

interface ChatMessagesProps {
  chatId: string;
  currentUserId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatId,
  currentUserId,
}) => {
  const chats = useChatStore((state) => state.chats);
  const chat = chats.find((c) => c.id === chatId);
  const messages = chat?.messages || [];
  const { users } = useUsers();

  if (messages.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>
          No messages yet. Say hello!
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={15}
      updateCellsBatchingPeriod={50}
      inverted={true}
      renderItem={({ item }) => {
        const sender = users.find((u) => u.id === item.senderId);
        return (
          <MessageBubble
            message={item}
            isCurrentUser={item.senderId === currentUserId}
            senderName={sender?.name || "Unknown"}
          />
        );
      }}
      contentContainerStyle={styles.messagesContainer}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: "center",
  },
});
