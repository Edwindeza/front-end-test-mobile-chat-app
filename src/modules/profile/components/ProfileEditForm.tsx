import React, { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { ProfileUser } from "../types/profile.type";

interface ProfileEditFormProps {
  user: ProfileUser;
  onSave: (updates: Partial<ProfileUser>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [name, setName] = useState(user.name);

  const handleSave = async () => {
    if (!name.trim()) return;

    const updates: Partial<ProfileUser> = {
      name: name.trim(),
    };

    await onSave(updates);
  };

  const handleCancel = () => {
    setName(user.name);
    onCancel();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Edit Profile</ThemedText>

      <ThemedView style={styles.inputGroup}>
        <ThemedText style={styles.label}>Name</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#8F8F8F"
          editable={!loading}
        />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
          disabled={loading}
        >
          <IconSymbol name="xmark" size={20} color="#8F8F8F" />
          <ThemedText style={styles.cancelText}>Cancel</ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.saveButton,
            (!name.trim() || loading) && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!name.trim() || loading}
        >
          <IconSymbol name="checkmark" size={20} color="#FFFFFF" />
          <ThemedText style={styles.saveText}>Save</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputGroup: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    color: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "rgba(143, 143, 143, 0.1)",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#8F8F8F",
  },
  saveText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
