import React, { useState, useRef, useEffect } from "react";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ChatMessages } from "@/modules/chat/components/ChatMessages";
import { ChatInput } from "@/modules/chat/components/ChatInput";
import { SearchModal } from "@/modules/chat/components/SearchModal";
import { MessageEditModal } from "@/modules/chat/components/MessageEditModal";
import { Loading } from "@/shared/components/Loading";
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
import { MediaFile } from "@/modules/media/types/media.type";
import { useMediaStore } from "@/modules/media/store/useMediaStore";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

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
  const { markMessagesAsRead, editMessage, sendMessage } = useChatStore();
  const { addMediaFile } = useMediaStore();
  const { executeWithErrorHandling, isLoading } = useErrorHandler();

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

  const handleMediaSelected = async (media: MediaFile) => {
    if (!chat || !currentUser) return;

    await executeWithErrorHandling(async () => {
      addMediaFile(media);

      const mediaData = {
        id: media.id,
        type: media.type,
        uri: media.uri,
        name: media.name,
        size: media.size,
        mimeType: media.mimeType,
        thumbnailUri: media.thumbnailUri,
      };

      await sendMessage(chat.id, "", currentUser.id, mediaData);
    }, "ChatRoomContainer.handleMediaSelected");
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
        onMediaSelected={handleMediaSelected}
      />

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        messages={chat.messages}
        users={users}
        onGoToMessage={handleGoToMessage}
      />

      <MessageEditModal
        visible={editModalVisible}
        currentText={editingMessage?.text || ""}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />

      {isLoading && <Loading overlay message="Processing..." />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
