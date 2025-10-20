import React from "react";
import { FlatList, Platform, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { ChatListItem } from "../components/ChatListItem";
import { NewChatModal } from "../components/NewChatModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useChatsListContainer } from "../hooks/useChatsListContainer";
import { useChatsPagination } from "../hooks/useChatsPagination";

export const ChatsListContainer = () => {
  const {
    currentUser,
    users,
    modalVisible,
    selectedUsers,
    loading,
    toggleUserSelection,
    handleCreateChat,
    openNewChatModal,
    closeNewChatModal,
  } = useChatsListContainer();

  const {
    chats,
    loading: paginationLoading,
    loadMore,
  } = useChatsPagination({ pageSize: 20 });

  const renderEmptyComponent = () => (
    <ThemedView style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>No chats yet</ThemedText>
      <ThemedText>Tap the + button to start a new conversation</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Chats ({chats.length})</ThemedText>
        <Pressable style={styles.newChatButton} onPress={openNewChatModal}>
          <IconSymbol name="plus" size={24} color="#007AFF" />
        </Pressable>
      </ThemedView>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            currentUserId={currentUser?.id || ""}
            users={users}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        windowSize={12}
        initialNumToRender={12}
        updateCellsBatchingPeriod={30}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          paginationLoading ? (
            <LoadingSpinner message="Loading chats..." />
          ) : null
        }
      />

      <NewChatModal
        visible={modalVisible}
        onClose={closeNewChatModal}
        users={users}
        currentUserId={currentUser?.id || ""}
        selectedUsers={selectedUsers}
        onToggleUser={toggleUserSelection}
        onCreateChat={handleCreateChat}
        loading={loading}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E1E1E1",
  },
  newChatButton: {
    padding: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
});
