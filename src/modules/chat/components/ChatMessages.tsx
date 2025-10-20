import React, { forwardRef, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { MessageBubble } from "@/modules/chat/components/MessageBubble";
import { LoadingSpinner } from "@/modules/chat/components/LoadingSpinner";
import { useChatStore } from "@/modules/chat/store/useChatStore";
import { useUsers } from "@/modules/user/hooks/useUsers";
import { useMessagesPagination } from "@/modules/chat/hooks/useMessagesPagination";

interface ChatMessagesProps {
  chatId: string;
  currentUserId: string;
  onEditMessage: (messageId: string, currentText: string) => void;
}

export const ChatMessages = forwardRef<FlatList, ChatMessagesProps>(
  ({ chatId, currentUserId, onEditMessage }, ref) => {
    const { deleteMessage } = useChatStore();
    const { users } = useUsers();
    const { messages, loading, loadMore, addNewMessage } =
      useMessagesPagination({ chatId, pageSize: 12 });

    useEffect(() => {
      const chats = useChatStore.getState().chats;
      const chat = chats.find((c) => c.id === chatId);
      const latestMessage = chat?.messages?.[0];

      if (latestMessage && !messages.find((m) => m.id === latestMessage.id)) {
        addNewMessage(latestMessage);
      }
    }, [chatId, messages.length, addNewMessage]);

    if (messages.length === 0 && !loading) {
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
        ref={ref}
        data={messages}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        windowSize={15}
        initialNumToRender={20}
        updateCellsBatchingPeriod={50}
        inverted={true}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
        ListFooterComponent={
          loading ? <LoadingSpinner message="Loading messages..." /> : null
        }
        renderItem={({ item }) => {
          const sender = users.find((u) => u.id === item.senderId);
          return (
            <MessageBubble
              message={item}
              isCurrentUser={item.senderId === currentUserId}
              senderName={sender?.name || "Unknown"}
              onEdit={(messageId, currentText) => {
                onEditMessage(messageId, currentText);
              }}
              onDelete={(messageId) => {
                deleteMessage(messageId, chatId);
              }}
            />
          );
        }}
        contentContainerStyle={styles.messagesContainer}
      />
    );
  }
);

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
