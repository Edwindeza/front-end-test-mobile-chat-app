import React, { useRef, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { MessageBubble } from "@/modules/chat/components/MessageBubble";
import { Message } from "@/modules/chat/types/chat.type";

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  currentUserId,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={15}
      updateCellsBatchingPeriod={50}
      getItemLayout={(data, index) => ({
        length: 80, // Altura estimada del mensaje
        offset: 80 * index,
        index,
      })}
      renderItem={({ item }) => (
        <MessageBubble
          message={item}
          isCurrentUser={item.senderId === currentUserId}
        />
      )}
      contentContainerStyle={styles.messagesContainer}
      ListEmptyComponent={() => (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>No messages yet. Say hello!</ThemedText>
        </ThemedView>
      )}
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
});
