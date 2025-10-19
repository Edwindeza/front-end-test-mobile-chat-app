import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileInfo } from "../components/ProfileInfo";
import { ProfileActions } from "../components/ProfileActions";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { ProfileUser } from "../types/profile.type";
import { useProfileContainer } from "../hooks/useProfile";

interface ProfileContainerProps {
  user: ProfileUser | null;
}

export const ProfileContainer: React.FC<ProfileContainerProps> = ({ user }) => {
  const {
    user: profileUser,
    loading,
    isEditing,
    editProfile,
    saveProfile,
    cancelEdit,
    logout,
  } = useProfileContainer(user);
  if (!profileUser) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>No user data available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader
        user={profileUser}
        isEditing={isEditing}
        onEdit={editProfile}
      />

      {isEditing ? (
        <ProfileEditForm
          user={profileUser}
          onSave={saveProfile}
          onCancel={cancelEdit}
          loading={loading}
        />
      ) : (
        <ProfileInfo user={profileUser} />
      )}

      <ProfileActions
        isEditing={isEditing}
        onEdit={editProfile}
        onLogout={logout}
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
  },
});
