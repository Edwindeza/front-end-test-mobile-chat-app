import React, { useState, useRef, useEffect } from "react";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ChatMessages } from "@/modules/chat/components/ChatMessages";
import { ChatInput } from "@/modules/chat/components/ChatInput";
import { SearchModal } from "@/modules/chat/components/SearchModal";
import { MessageEditModal } from "@/modules/chat/components/MessageEditModal";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { ChatHeader } from "../components/ChatHeader";
import { useChatRoomContainer } from "../hooks/useChatRoomContainer";
import { useUsers } from "@/modules/user/hooks/useUsers";
import { useChatStore } from "../store/useChatStore";

export const ChatRoomContainer: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingMessage, setEditingMessage] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const messagesRef = useRef<FlatList>(null);

  const {
    chat,
    currentUser,
    chatParticipants,
    chatName,
    messageText,
    setMessageText,
    handleSendMessage,
  } = useChatRoomContainer();

  const { users } = useUsers();
  const { markMessagesAsRead, editMessage } = useChatStore();

  useEffect(() => {
    if (chat && currentUser) {
      markMessagesAsRead(chat.id, currentUser.id);
    }
  }, [chat?.id, currentUser?.id, markMessagesAsRead]);

  const handleSearchPress = () => {
    setSearchVisible(true);
  };

  const handleGoToMessage = (messageId: string) => {
    if (!chat?.messages || !messagesRef.current) return;

    const messageIndex = chat.messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex !== -1) {
      messagesRef.current.scrollToIndex({
        index: messageIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const handleEditMessage = (messageId: string, currentText: string) => {
    setEditingMessage({ id: messageId, text: currentText });
    setEditModalVisible(true);
  };

  const handleSaveEdit = (newText: string) => {
    if (editingMessage && chat) {
      editMessage(editingMessage.id, newText, chat.id);
    }
    setEditModalVisible(false);
    setEditingMessage(null);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setEditingMessage(null);
  };

  if (!chat || !currentUser) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Chat not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <ChatHeader
              chatParticipants={chatParticipants}
              chatName={chatName}
              onSearchPress={handleSearchPress}
            />
          ),
          headerLeft: () => null,
        }}
      />
      <ChatMessages
        chatId={chat.id}
        currentUserId={currentUser.id}
        onEditMessage={handleEditMessage}
        ref={messagesRef}
      />
      <ChatInput
        messageText={messageText}
        onMessageTextChange={setMessageText}
        onSendMessage={handleSendMessage}
      />

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        messages={chat.messages}
        users={users}
        currentUserId={currentUser.id}
        onGoToMessage={handleGoToMessage}
      />

      <MessageEditModal
        visible={editModalVisible}
        currentText={editingMessage?.text || ""}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
