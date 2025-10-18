import React from "react";
import { TextInput, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { IconSymbol } from "@/shared/components/IconSymbol";

interface ChatInputProps {
  messageText: string;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  messageText,
  onMessageTextChange,
  onSendMessage,
}) => {
  return (
    <ThemedView style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={messageText}
        onChangeText={onMessageTextChange}
        placeholder="Type a message..."
        multiline
      />
      <Pressable
        style={[
          styles.sendButton,
          !messageText.trim() && styles.disabledButton,
        ]}
        onPress={onSendMessage}
        disabled={!messageText.trim()}
      >
        <IconSymbol name="arrow.up.circle.fill" size={32} color="#007AFF" />
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#E1E1E1",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 20,
    padding: 10,
    maxHeight: 100,
    backgroundColor: "#F9F9F9",
  },
  sendButton: {
    marginLeft: 10,
    marginBottom: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
