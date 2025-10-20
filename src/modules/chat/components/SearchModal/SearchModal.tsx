import React from "react";
import { Modal, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { Message } from "@/modules/chat/types/chat.type";
import { User } from "@/modules/user/types/user.type";
import { useSearchModal } from "./useSearchModal";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";
import { SearchCounter } from "./SearchCounter";
import { SearchNavigation } from "./SearchNavigation";
import { SearchMessage } from "./SearchMessage";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  messages: Message[];
  users: User[];
  onGoToMessage: (messageId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  messages,
  users,
  onGoToMessage,
}) => {
  const {
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
  } = useSearchModal({
    messages,
    users,
    onGoToMessage,
    onClose,
  });

  const highlightText = (text: string | undefined, query: string) => {
    if (!query.trim() || !text) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <ThemedText key={index} style={styles.highlight}>
            {part}
          </ThemedText>
        );
      }
      return part;
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <SearchHeader onClose={onClose} />

        <SearchInput query={query} onQueryChange={setQuery} />

        {query.trim() && (
          <SearchCounter
            currentIndex={currentIndex}
            totalResults={filteredMessages.length}
          />
        )}

        {filteredMessages.length > 0 && (
          <SearchNavigation
            currentIndex={currentIndex}
            totalResults={filteredMessages.length}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onGoToMessage={handleGoToMessage}
          />
        )}

        {currentMessage && currentSender && (
          <SearchMessage
            message={currentMessage}
            sender={currentSender}
            query={query}
            formatTime={formatTime}
            highlightText={highlightText}
          />
        )}
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  highlight: {
    backgroundColor: "#FFEB3B",
    fontWeight: "bold",
  },
});
