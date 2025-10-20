import React, { useState } from "react";
import { Pressable, StyleSheet, Alert } from "react-native";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { MediaService } from "../services/MediaService";
import { MediaFile } from "../types/media.type";
import * as ImagePicker from "expo-image-picker";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

interface MediaPickerProps {
  onMediaSelected: (media: MediaFile) => void;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  onMediaSelected,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const iconColor = useThemeColor({}, "tabIconDefault");
  const { executeWithErrorHandling, getUserFriendlyMessage } =
    useErrorHandler();

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need access to your photo library to share images.",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting permissions:", error);
      return false;
    }
  };

  const pickImage = async () => {
    const result = await executeWithErrorHandling(async () => {
      setIsLoading(true);

      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];

        const mediaFile = await MediaService.createMediaFile(asset.uri);
        onMediaSelected(mediaFile);
        return mediaFile;
      }

      return null;
    }, "MediaPicker.pickImage");

    if (!result) {
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  return (
    <Pressable
      style={[styles.container, { opacity: isLoading ? 0.6 : 1 }]}
      onPress={pickImage}
      disabled={isLoading}
    >
      <IconSymbol name="plus" size={24} color={iconColor} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});
