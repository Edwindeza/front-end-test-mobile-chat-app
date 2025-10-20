import { useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useChatStore } from "@/modules/chat/store/useChatStore";
import { useUsers } from "@/modules/user/hooks/useUsers";

export const useChatsListContainer = () => {
  const { currentUser } = useAuth();
  const { createChat, loading } = useChatStore();
  const { users } = useUsers();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateChat = () => {
    if (currentUser && selectedUsers.length > 0) {
      const participants = [currentUser.id, ...selectedUsers];
      createChat(participants);
      setModalVisible(false);
      setSelectedUsers([]);
    }
  };

  const openNewChatModal = () => {
    setModalVisible(true);
  };

  const closeNewChatModal = () => {
    setModalVisible(false);
    setSelectedUsers([]);
  };

  return {
    currentUser,
    users,
    modalVisible,
    selectedUsers,
    loading,
    toggleUserSelection,
    handleCreateChat,
    openNewChatModal,
    closeNewChatModal,
  };
};
