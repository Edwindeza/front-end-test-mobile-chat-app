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
  sendMessage: (chatId: string, text: string, senderId: string) => Promise<boolean>;
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

  sendMessage: async (chatId: string, text: string, senderId: string) => {
    if (!text.trim()) return false;

    try {
      const newMessage = await ChatService.sendMessage(chatId, text, senderId);

      set(state => ({
        chats: state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
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

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));