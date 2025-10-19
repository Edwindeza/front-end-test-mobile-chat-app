import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/shared/hooks/useAuth';
import { useChatStore } from '@/modules/chat/store/useChatStore';
import { useUsers } from '@/modules/user/hooks/useUsers';
import { Chat } from '@/modules/chat/types/chat.type';
import { User } from '@/src/modules/user/types/user.type';

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

  const chatName: string =
    chatParticipants.length === 1
      ? chatParticipants[0]?.name || 'Unknown'
      : `${chatParticipants[0]?.name || 'Unknown'} & ${
          chatParticipants.length - 1
        } other${chatParticipants.length > 1 ? 's' : ''}`;

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