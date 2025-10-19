import React, { useState, useMemo } from "react";
import { Modal, StyleSheet, Pressable, TextInput } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { Message } from "@/modules/chat/types/chat.type";
import { User } from "@/modules/user/types/user.type";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  messages: Message[];
  users: User[];
  currentUserId: string;
  onGoToMessage: (messageId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  messages,
  users,
  currentUserId,
  onGoToMessage,
}) => {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Theme colors
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const tabIconDefault = useThemeColor({}, "tabIconDefault");

  // Dark mode specific colors for better contrast
  const isDark = useThemeColor({}, "background") === "#000000";
  const searchInputBg = isDark ? "#1C1C1E" : tabIconDefault;
  const messageBubbleBg = isDark ? "#2C2C2E" : tabIconDefault;
  const disabledButtonBg = isDark ? "#3A3A3C" : tabIconDefault;

  const filteredMessages = useMemo(() => {
    if (!query.trim()) return [];

    return messages.filter((message) =>
      message.text.toLowerCase().includes(query.toLowerCase())
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

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

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

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={[styles.header, { borderBottomColor: borderColor }]}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color={textColor} />
          </Pressable>
          <ThemedText style={styles.title}>Search Messages</ThemedText>
          <ThemedView style={styles.placeholder} />
        </ThemedView>

        {/* Search Input */}
        <ThemedView style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: searchInputBg, color: textColor },
            ]}
            placeholder="Search messages..."
            placeholderTextColor={isDark ? "#8E8E93" : "#8E8E93"}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </ThemedView>

        {/* Results Counter */}
        {query.trim() && (
          <ThemedView style={styles.counterContainer}>
            <ThemedText style={styles.counter}>
              {filteredMessages.length > 0
                ? `Result ${currentIndex + 1} of ${filteredMessages.length}`
                : "No results found"}
            </ThemedText>
          </ThemedView>
        )}

        {/* Navigation Controls */}
        {filteredMessages.length > 0 && (
          <ThemedView
            style={[
              styles.navigationContainer,
              { borderTopColor: borderColor, borderBottomColor: borderColor },
            ]}
          >
            <Pressable
              style={[
                styles.navButton,
                { backgroundColor: tintColor },
                currentIndex === 0 && { backgroundColor: disabledButtonBg },
              ]}
              onPress={goToPrevious}
              disabled={currentIndex === 0}
            >
              <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
              <ThemedText style={styles.navButtonText}>Previous</ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.goToButton,
                { backgroundColor: "rgb(27, 95, 243)" },
              ]}
              onPress={handleGoToMessage}
            >
              <ThemedText style={styles.goToButtonText}>
                Go to message
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.navButton,
                { backgroundColor: tintColor },
                currentIndex === filteredMessages.length - 1 && {
                  backgroundColor: disabledButtonBg,
                },
              ]}
              onPress={goToNext}
              disabled={currentIndex === filteredMessages.length - 1}
            >
              <ThemedText style={styles.navButtonText}>Next</ThemedText>
              <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
            </Pressable>
          </ThemedView>
        )}

        {/* Current Message */}
        {currentMessage && currentSender && (
          <ThemedView style={styles.messageContainer}>
            <ThemedView style={styles.messageHeader}>
              <ThemedText style={styles.senderName}>
                {currentSender.name}
              </ThemedText>
              <ThemedText style={styles.messageTime}>
                {formatTime(currentMessage.timestamp)}
              </ThemedText>
            </ThemedView>

            <ThemedView
              style={[
                styles.messageBubble,
                { backgroundColor: messageBubbleBg },
              ]}
            >
              <ThemedText style={styles.messageText}>
                {highlightText(currentMessage.text, query)}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  counterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  counter: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 4,
  },
  goToButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  goToButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
  },
  messageTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  messageBubble: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  highlight: {
    backgroundColor: "#FFEB3B",
    fontWeight: "bold",
  },
});
