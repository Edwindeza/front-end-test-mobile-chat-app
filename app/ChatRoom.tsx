import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ChatHeader } from "@/modules/chat/components/ChatHeader";
import { ChatMessages } from "@/modules/chat/components/ChatMessages";
import { ChatInput } from "@/modules/chat/components/ChatInput";
import { useChatRoomContainer } from "@/modules/chat/containers/useChatRoomContainer";

export default function ChatRoomScreen() {
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
      <ThemedView style={styles.centerContainer}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
