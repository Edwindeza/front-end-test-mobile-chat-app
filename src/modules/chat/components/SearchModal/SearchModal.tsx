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
import { formatTime } from "@/shared/utils/timeUtils";

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
  } = useSearchModal({
    messages,
    users,
    onGoToMessage,
    onClose,
  });

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
            highlightStyle={styles.highlight}
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
