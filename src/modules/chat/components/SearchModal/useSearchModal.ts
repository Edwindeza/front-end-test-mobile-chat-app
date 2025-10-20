import { useState, useMemo } from "react";
import { Message } from "@/modules/chat/types/chat.type";
import { User } from "@/modules/user/types/user.type";

interface UseSearchModalProps {
  messages: Message[];
  users: User[];
  onGoToMessage: (messageId: string) => void;
  onClose: () => void;
}

export const useSearchModal = ({
  messages,
  users,
  onGoToMessage,
  onClose,
}: UseSearchModalProps) => {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredMessages = useMemo(() => {
    if (!query.trim()) return [];

    return messages.filter((message) =>
      message.text?.toLowerCase().includes(query.toLowerCase())
    );
  }, [messages, query]);

  const currentMessage = filteredMessages[currentIndex];
  const currentSender = currentMessage
    ? users.find((u) => u.id === currentMessage.senderId)
    : null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(filteredMessages.length - 1, prev + 1));
  };

  const handleGoToMessage = () => {
    if (currentMessage) {
      onGoToMessage(currentMessage.id);
      onClose();
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return {
    query,
    setQuery,
    currentIndex,
    filteredMessages,
    currentMessage,
    currentSender,
    goToPrevious,
    goToNext,
    handleGoToMessage,
    formatTime,
  };
};
