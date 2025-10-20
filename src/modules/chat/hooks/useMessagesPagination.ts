import { useState, useCallback, useEffect, useMemo } from 'react';
import { useChatStore } from '@/modules/chat/store/useChatStore';
import { Message } from '@/modules/chat/types/chat.type';

interface UseMessagesPaginationProps {
  chatId: string;
  pageSize?: number;
}

export const useMessagesPagination = ({
  chatId,
  pageSize = 30
}: UseMessagesPaginationProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { chats } = useChatStore();

  const chat = useMemo(() =>
    chats.find(c => c.id === chatId),
    [chats, chatId]
  );

  const allMessages = useMemo(() =>
    chat?.messages || [],
    [chat?.messages]
  );

  useEffect(() => {
    if (allMessages.length > 0) {
      const initialMessages = allMessages.length <= pageSize
        ? allMessages 
        : allMessages.slice(0, pageSize);

      setMessages(initialMessages);
      setHasMore(allMessages.length > pageSize);
    } else {
      setMessages([]);
      setHasMore(false);
    }
  }, [chatId, allMessages.length, pageSize]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const currentLoadedCount = messages.length;
      const startIndex = currentLoadedCount;
      const endIndex = Math.min(startIndex + pageSize, allMessages.length);

      if (startIndex >= allMessages.length) {
        setHasMore(false);
        return;
      }

      const newMessages = allMessages.slice(startIndex, endIndex);

      setMessages(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const newUniqueMessages = newMessages.filter(m => !existingIds.has(m.id));
        return [...prev, ...newUniqueMessages];
      });

      if (endIndex >= allMessages.length) {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, allMessages, messages.length, pageSize]);

  const addNewMessage = useCallback((message: Message) => {
    setMessages(prev => {
      if (prev.some(m => m.id === message.id)) {
        return prev;
      }
      return [...prev, message];
    });
  }, []);

  return {
    messages,
    loading,
    hasMore,
    loadMore,
    addNewMessage,
  };
};
