import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { useThemeColor } from "@/shared/hooks/useThemeColor";

interface SearchHeaderProps {
  onClose: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ onClose }) => {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");

  return (
    <ThemedView style={[styles.header, { borderBottomColor: borderColor }]}>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <IconSymbol name="xmark" size={24} color={textColor} />
      </Pressable>
      <ThemedText style={styles.title}>Search Messages</ThemedText>
      <ThemedView style={styles.placeholder} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
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
});
