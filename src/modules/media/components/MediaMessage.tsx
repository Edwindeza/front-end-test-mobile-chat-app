import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/shared/components/ThemedText";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { MediaFile } from "../types/media.type";

interface MediaMessageProps {
  media: MediaFile;
  isCurrentUser: boolean;
  caption?: string;
}

export const MediaMessage: React.FC<MediaMessageProps> = ({
  media,
  caption,
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const renderImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: media.uri }}
          style={styles.image}
          resizeMode="cover"
          onError={(error) => console.log("Image load error:", error)}
          onLoad={() => console.log("Image loaded successfully")}
        />

        <View style={[styles.fileInfo, { backgroundColor: "rgba(0,0,0,0.7)" }]}>
          <ThemedText style={styles.fileSize}>
            {formatFileSize(media.size)}
          </ThemedText>
        </View>
      </View>
    );
  };

  const renderPlaceholder = () => {
    return (
      <View style={[styles.placeholder, { backgroundColor, borderColor }]}>
        <ThemedText style={[styles.placeholderText, { color: textColor }]}>
          {media.type.toUpperCase()}
        </ThemedText>
        <ThemedText style={[styles.fileName, { color: textColor }]}>
          {media.name}
        </ThemedText>
        <ThemedText style={[styles.fileSize, { color: textColor }]}>
          {formatFileSize(media.size)}
        </ThemedText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {media.type === "image" ? renderImage() : renderPlaceholder()}

      {caption && (
        <ThemedText style={[styles.caption, { color: textColor }]}>
          {caption}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    marginBottom: 4,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  fileInfo: {
    position: "absolute",
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fileSize: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  placeholder: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  fileName: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center",
  },
  caption: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});
