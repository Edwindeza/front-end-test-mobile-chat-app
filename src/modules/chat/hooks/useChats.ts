import { useChatsDb} from './useChatsDb';

export function useChats(currentUserId: string | null) {
  const {
    chats,
    createChat,
    sendMessage,
    loading
  } = useChatsDb(currentUserId);

  return {
    chats,
    createChat,
    sendMessage,
    loading,
  };
}