import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, TextInput, Pressable } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { useThemeColor } from "@/shared/hooks/useThemeColor";

interface MessageEditModalProps {
  visible: boolean;
  currentText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

export const MessageEditModal: React.FC<MessageEditModalProps> = ({
  visible,
  currentText,
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(currentText);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tabIconDefault = useThemeColor({}, "tabIconDefault");

  useEffect(() => {
    if (visible) {
      setText(currentText);
    }
  }, [visible, currentText]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
    }
  };

  const handleCancel = () => {
    setText(currentText);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <ThemedView style={styles.container}>
        <Pressable style={styles.overlay} onPress={handleCancel}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ThemedView
              style={[
                styles.header,
                { borderBottomColor: borderColor, backgroundColor },
              ]}
            >
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>Edit Message</ThemedText>
              </ThemedView>
              <Pressable onPress={handleSave} style={styles.saveButton}>
                <ThemedText style={[styles.saveText, { color: "white" }]}>
                  Save
                </ThemedText>
              </Pressable>
            </ThemedView>

            <ThemedView style={[styles.inputContainer, { backgroundColor }]}>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: backgroundColor,
                    color: textColor,
                    borderColor: borderColor,
                  },
                ]}
                value={text}
                onChangeText={setText}
                placeholder="Type your message..."
                placeholderTextColor="#8E8E93"
                multiline
                autoFocus
                maxLength={1000}
              />
            </ThemedView>

            <ThemedView style={[styles.counterContainer, { backgroundColor }]}>
              <ThemedText style={[styles.counter, { color: tabIconDefault }]}>
                {text.length}/1000
              </ThemedText>
            </ThemedView>
          </Pressable>
        </Pressable>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#007aff",
    borderRadius: 6,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    padding: 16,
  },
  textInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    textAlignVertical: "top",
  },
  counterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
  counter: {
    fontSize: 12,
  },
});
