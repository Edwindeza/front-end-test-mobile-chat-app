import React, { useState } from "react";
import { View, StyleSheet, Pressable, Alert, Modal } from "react-native";
import { ThemedText } from "@/shared/components/ThemedText";
import { ThemedView } from "@/shared/components/ThemedView";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { Message } from "@/modules/chat/types/chat.type";
import { UI_CONSTANTS } from "@/shared/constants/UI";

interface MessageActionsProps {
  message: Message;
  isCurrentUser: boolean;
  onEdit: (messageId: string, currentText: string) => void;
  onDelete: (messageId: string) => void;
  children: React.ReactNode;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  isCurrentUser,
  onEdit,
  onDelete,
  children,
}) => {
  const [showActions, setShowActions] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const dangerColor = useThemeColor({}, "danger");
  const overlayColor = useThemeColor({}, "overlay");
  const borderLightColor = useThemeColor({}, "borderLight");

  const handleLongPress = () => {
    if (isCurrentUser) {
      setShowActions(true);
    }
  };

  const handleEdit = () => {
    setShowActions(false);
    onEdit(message.id, message.text);
  };

  const handleDelete = () => {
    setShowActions(false);

    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(message.id),
        },
      ]
    );
  };

  const handleCancel = () => {
    setShowActions(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.messageContainer}
        onLongPress={isCurrentUser ? handleLongPress : undefined}
        delayLongPress={UI_CONSTANTS.LONG_PRESS_DELAY}
      >
        {children}
      </Pressable>

      <Modal
        visible={showActions && isCurrentUser}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: overlayColor }]}
          onPress={handleCancel}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ThemedView
              style={[
                styles.actionsContainer,
                { backgroundColor, borderColor },
              ]}
            >
              <Pressable
                style={[
                  styles.actionButton,
                  { borderBottomColor: borderLightColor },
                ]}
                onPress={handleEdit}
              >
                <IconSymbol name="pencil" size={20} color={textColor} />
                <ThemedText style={styles.actionText}>Edit</ThemedText>
              </Pressable>

              <Pressable
                style={[styles.actionButton, styles.lastActionButton]}
                onPress={handleDelete}
              >
                <IconSymbol name="trash" size={20} color={dangerColor} />
                <ThemedText style={[styles.actionText, { color: dangerColor }]}>
                  Delete
                </ThemedText>
              </Pressable>
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  messageContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    minWidth: 120,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  lastActionButton: {
    borderBottomWidth: 0,
  },
});
