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

  return (
    <FlatList
      ref={flatListRef}
      data={messages.slice().reverse()}
      keyExtractor={(item) => item.id}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={15}
      updateCellsBatchingPeriod={50}
      inverted={true}
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
