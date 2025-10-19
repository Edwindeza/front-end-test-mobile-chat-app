import React from 'react';
import { useChatStore } from '../store/useChatStore';

export const useChats = (currentUserId: string | null) => {
  const { chats, loading, error, loadChats, createChat, sendMessage } = useChatStore();

  React.useEffect(() => {
    if (currentUserId) {
      loadChats(currentUserId);
    } else {
      useChatStore.setState({ chats: [], loading: false, error: null });
    }
  }, [currentUserId, loadChats]);

  return {
    chats,
    loading,
    error,
    createChat,
    sendMessage,
  };
};