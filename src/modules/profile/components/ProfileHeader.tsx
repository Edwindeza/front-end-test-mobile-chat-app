import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { Avatar } from "@/shared/components/Avatar";
import { ProfileUser } from "../types/profile.type";

interface ProfileHeaderProps {
  user: ProfileUser;
  isEditing: boolean;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <ThemedView style={styles.header}>
      <Avatar user={user} size={100} />
      <ThemedView style={styles.profileInfo}>
        <ThemedText type="title">{user.name}</ThemedText>
        <ThemedText style={styles.statusText}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
});
