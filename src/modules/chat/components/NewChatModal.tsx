import React from "react";
import { Modal, Pressable, FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { UserListItem } from "@/modules/user/components/UserListItem";
import { User } from "@/modules/user/hooks/useUser";

interface NewChatModalProps {
  visible: boolean;
  onClose: () => void;
  users: User[];
  currentUserId: string;
  selectedUsers: string[];
  onToggleUser: (userId: string) => void;
  onCreateChat: () => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  visible,
  onClose,
  users,
  currentUserId,
  selectedUsers,
  onToggleUser,
  onCreateChat,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.modalContainer} onPress={handleClose}>
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedView style={styles.modalInnerContent}>
            <ThemedView style={styles.modalHeader}>
              <ThemedText type="subtitle">New Chat</ThemedText>
              <Pressable onPress={handleClose}>
                <IconSymbol name="xmark" size={24} color="#007AFF" />
              </Pressable>
            </ThemedView>

            <ThemedText style={styles.modalSubtitle}>
              Select users to chat with
            </ThemedText>

            <FlatList
              data={users.filter((user) => user.id !== currentUserId)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <UserListItem
                  user={item}
                  onSelect={() => onToggleUser(item.id)}
                  isSelected={selectedUsers.includes(item.id)}
                />
              )}
              style={styles.userList}
            />

            <Pressable
              style={[
                styles.createButton,
                selectedUsers.length === 0 && styles.disabledButton,
              ]}
              onPress={onCreateChat}
              disabled={selectedUsers.length === 0}
            >
              <ThemedText style={styles.createButtonText}>
                Create Chat
              </ThemedText>
            </Pressable>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalInnerContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.7,
  },
  userList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#E1E1E1",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
