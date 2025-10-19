import React from "react";
import { StyleSheet, Pressable, Alert } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";

interface ProfileActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onLogout: () => void;
  loading?: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  isEditing,
  onEdit,
  onLogout,
  loading = false,
}) => {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: onLogout },
    ]);
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">Actions</ThemedText>

      {!isEditing && (
        <Pressable
          style={[styles.actionButton, loading && styles.disabledButton]}
          onPress={onEdit}
          disabled={loading}
        >
          <IconSymbol name="pencil" size={20} color="#007AFF" />
          <ThemedText style={styles.actionText}>Edit Profile</ThemedText>
        </Pressable>
      )}

      <Pressable
        style={[styles.actionButton, styles.logoutButton]}
        onPress={handleLogout}
        disabled={loading}
      >
        <IconSymbol name="arrow.right.square" size={20} color="#FF3B30" />
        <ThemedText style={[styles.actionText, styles.logoutText]}>
          Logout
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
  },
  logoutButton: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  logoutText: {
    color: "#FF3B30",
  },
});
