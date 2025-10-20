import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/shared/hooks/useAuth';
import { useChatStore } from '@/modules/chat/store/useChatStore';
import { useUsers } from '@/modules/user/hooks/useUsers';
import { Chat } from '@/modules/chat/types/chat.type';
import { getChatName } from "@/shared/utils/chatUtils";

export const useChatRoomContainer = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const { currentUser } = useAuth();
  const { chats, sendMessage } = useChatStore();
  const { users } = useUsers();
  const [messageText, setMessageText] = useState('');

  const chat = chats.find((c: Chat) => c.id === chatId);

  const chatParticipants: User[] =
    chat?.participants
      .filter((id: string) => id !== currentUser?.id)
      .map((id: string) => users.find((user: User) => user.id === id))
      .filter((user): user is User => user !== undefined) || [];

  const chatName: string = getChatName(chatParticipants, currentUser?.id || '');

  const handleSendMessage = () => {
    if (messageText.trim() && currentUser && chat) {
      sendMessage(chat.id, messageText.trim(), currentUser.id);
      setMessageText('');
    }
  };

  return {
    chat,
    currentUser,
    chatParticipants,
    chatName,
    messageText,
    setMessageText,
    handleSendMessage,
  };
};