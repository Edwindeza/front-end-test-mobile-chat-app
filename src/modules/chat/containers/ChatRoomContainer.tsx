import React from "react";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ChatMessages } from "@/modules/chat/components/ChatMessages";
import { ChatInput } from "@/modules/chat/components/ChatInput";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { ChatHeader } from "../components/ChatHeader";
import { useChatRoomContainer } from "../hooks/useChatRoomContainer";

export const ChatRoomContainer: React.FC = () => {
  const {
    chat,
    currentUser,
    chatParticipants,
    chatName,
    messageText,
    setMessageText,
    handleSendMessage,
  } = useChatRoomContainer();

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
            />
          ),
          headerLeft: () => null,
        }}
      />
      <ChatMessages messages={chat.messages} currentUserId={currentUser.id} />
      <ChatInput
        messageText={messageText}
        onMessageTextChange={setMessageText}
        onSendMessage={handleSendMessage}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
