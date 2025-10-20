import { create } from 'zustand';
import { Chat, Message } from '../types/chat.type';
import { ChatService } from '../services/ChatService';
import { showToast } from '@/shared/components/Toast';

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;

  loadChats: (currentUserId: string) => Promise<void>;
  createChat: (participantIds: string[]) => Promise<Chat | null>;
  sendMessage: (chatId: string, text: string, senderId: string, media?: {
    id: string;
    type: 'image' | 'video' | 'audio' | 'document';
    uri: string;
    name: string;
    size: number;
    mimeType: string;
    thumbnailUri?: string;
  }) => Promise<boolean>;
  markMessagesAsRead: (chatId: string, currentUserId: string) => Promise<void>;
  deleteMessage: (messageId: string, chatId: string) => Promise<boolean>;
  editMessage: (messageId: string, newText: string, chatId: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  loading: false,
  error: null,

  loadChats: async (currentUserId: string) => {
    try {
      set({ loading: true, error: null });

      const chats = await ChatService.getUserChats(currentUserId);

      set({ chats, loading: false });
    } catch (error) {
      set({ error: 'Failed to load chats', loading: false });
    }
  },

  createChat: async (participantIds: string[]) => {
    try {
      const { chats } = get();
      const sortedParticipantIds = [...participantIds].sort();

      const existingChat = chats.find(chat => {
        const sortedChatParticipants = [...chat.participants].sort();
        return JSON.stringify(sortedChatParticipants) === JSON.stringify(sortedParticipantIds);
      });

      if (existingChat) {
        showToast('Ups, this chat already exists', 'info');

        return existingChat;
      }

      const newChat = await ChatService.createChat(participantIds);

      set(state => ({ chats: [...state.chats, newChat] }));

      showToast('New chat created', 'success');

      return newChat;
    } catch (error) {
      set({ error: 'Failed to create chat' });

      showToast('Failed to create chat. Try again.', 'error');

      return null;
    }
  },

  sendMessage: async (chatId: string, text: string, senderId: string, media?: {
    id: string;
    type: 'image' | 'video' | 'audio' | 'document';
    uri: string;
    name: string;
    size: number;
    mimeType: string;
    thumbnailUri?: string;
  }) => {
    if (!text.trim() && !media) return false;

    try {
      const newMessage = await ChatService.sendMessage(chatId, text, senderId, media);

      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [newMessage, ...chat.messages],
              lastMessage: newMessage,
            };
          }
          return chat;
        }),
      }));

      return true;
    } catch (error) {
      set({ error: 'Failed to send message' });

      showToast('Failed to send message', 'error');

      return false;
    }
  },

  markMessagesAsRead: async (chatId: string, currentUserId: string) => {
    try {
      await ChatService.markMessagesAsRead(chatId, currentUserId);

      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: chat.messages.map(message => {
                if (message.senderId !== currentUserId) {
                  return { ...message, status: 'read' as const };
                }
                return message;
              }),
            };
          }
          return chat;
        }),
      }));
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  },

  deleteMessage: async (messageId: string, chatId: string) => {
    try {
      await ChatService.deleteMessage(messageId);

      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            const updatedMessages = chat.messages.filter(msg => msg.id !== messageId);
            const newLastMessage = updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1] : undefined;
            
            return {
              ...chat,
              messages: updatedMessages,
              lastMessage: newLastMessage,
            };
          }
          return chat;
        }),
      }));

      showToast('Message deleted', 'success');
      return true;
    } catch (error) {
      showToast('Failed to delete message', 'error');
      return false;
    }
  },

  editMessage: async (messageId: string, newText: string, chatId: string) => {
    if (!newText.trim()) return false;

    try {
      await ChatService.editMessage(messageId, newText);

      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: chat.messages.map(message => {
                if (message.id === messageId) {
                  return { ...message, text: newText };
                }
                return message;
              }),
            };
          }
          return chat;
        }),
      }));

      showToast('Message edited', 'success');
      return true;
    } catch (error) {
      showToast('Failed to edit message', 'error');
      return false;
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));