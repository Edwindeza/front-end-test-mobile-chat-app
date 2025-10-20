import { useState, useCallback, useEffect } from 'react';
import { useChatStore } from '@/modules/chat/store/useChatStore';
import { Chat } from '@/modules/chat/types/chat.type';

interface UseChatsPaginationProps {
  pageSize?: number;
}

export const useChatsPagination = ({ pageSize = 20 }: UseChatsPaginationProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  
  const { chats: allChats } = useChatStore();

  useEffect(() => {
    if (allChats.length > 0) {
      const initialChats = allChats.slice(0, pageSize);
      setChats(initialChats);
      setHasMore(allChats.length > pageSize);
      setPage(1);
    } else {
      setChats([]);
      setHasMore(false);
      setPage(0);
    }
  }, [allChats.length, pageSize]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      
      if (endIndex >= allChats.length) {
        const remainingChats = allChats.slice(startIndex);
        setChats(prev => [...prev, ...remainingChats]);
        setHasMore(false);
      } else {
        const newChats = allChats.slice(startIndex, endIndex);
        setChats(prev => [...prev, ...newChats]);
        setPage(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, allChats, page, pageSize]);

  return {
    chats,
    loading,
    hasMore,
    loadMore,
  };
};
