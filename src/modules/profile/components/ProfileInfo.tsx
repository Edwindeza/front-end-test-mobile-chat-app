import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ProfileUser } from "../types/profile.type";

interface ProfileInfoProps {
  user: ProfileUser;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">Account Information</ThemedText>

      <ThemedView style={styles.infoRow}>
        <ThemedText style={styles.infoLabel}>ID:</ThemedText>
        <ThemedText>{user.id}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoRow}>
        <ThemedText style={styles.infoLabel}>Full Name:</ThemedText>
        <ThemedText>{user.name}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  infoLabel: {
    fontWeight: "600",
    opacity: 0.7,
  },
});
