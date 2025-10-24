import { useState, useEffect, useCallback } from 'react';
import { db } from '@/shared/database/db';
import { chats, chatParticipants, messages } from '@/shared/database/schema';
import { eq, inArray } from 'drizzle-orm';
import { Chat, Message } from '../types/chat.type';
import { ChatService } from '../services/ChatService';

export function useChatsDb(currentUserId: string | null) {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      if (!currentUserId) {
        setUserChats([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.time('loadChats');

        const participantData = await db
          .select({
            chatId: chats.id,
            participantId: chatParticipants.userId,
          })
          .from(chats)
          .innerJoin(chatParticipants, eq(chats.id, chatParticipants.chatId))
          .where(eq(chatParticipants.userId, currentUserId));

        const chatIds = [...new Set(participantData.map(row => row.chatId))];
        const messageData = chatIds.length > 0 ? await db
          .select()
          .from(messages)
          .where(inArray(messages.chatId, chatIds))
          .orderBy(messages.timestamp) : [];

        console.timeEnd('loadChats');

        const chatMap = new Map<string, {
          participants: Set<string>;
          messages: Message[];
        }>();

        participantData.forEach(row => {
          if (!chatMap.has(row.chatId)) {
            chatMap.set(row.chatId, {
              participants: new Set(),
              messages: [],
            });
          }

          const chat = chatMap.get(row.chatId)!;
          chat.participants.add(row.participantId);
        });

        messageData.forEach(message => {
          if (chatMap.has(message.chatId)) {
            const chat = chatMap.get(message.chatId)!;
            chat.messages.push({
              id: message.id,
              senderId: message.senderId,
              text: message.text,
              timestamp: message.timestamp,
            });
          }
        });

        const loadedChats: Chat[] = Array.from(chatMap.entries()).map(([chatId, data]) => {
          const participantIds = Array.from(data.participants) as string[];
          const chatMessages = data.messages;

          const lastMessage = chatMessages.length > 0
            ? chatMessages[chatMessages.length - 1]
            : undefined;

          return {
            id: chatId,
            participants: participantIds,
            messages: chatMessages,
            lastMessage,
          };
        });

        setUserChats(loadedChats);
        console.log(`Loaded ${loadedChats.length} chats with 2 queries (was ${loadedChats.length * 3 + 1} queries)`);
      } catch (error) {
        console.error('Error loading chats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [currentUserId]);

  const createChat = useCallback(async (participantIds: string[]) => {
    if (!currentUserId || !participantIds.includes(currentUserId)) {
      return null;
    }

    try {
      const newChat = await ChatService.createChat(participantIds);
      setUserChats(prevChats => [...prevChats, newChat]);
      return newChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
    }
  }, [currentUserId]);

  const sendMessage = useCallback(async (chatId: string, text: string, senderId: string) => {
    if (!text.trim()) return false;

    try {
      const newMessage = await ChatService.sendMessage(chatId, text, senderId);

      setUserChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
            };
          }
          return chat;
        });
      });

      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }, []);

  return {
    chats: userChats,
    createChat,
    sendMessage,
    loading,
  };
}