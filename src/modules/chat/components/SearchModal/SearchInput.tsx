import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { useThemeColor } from "@/shared/hooks/useThemeColor";

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  query,
  onQueryChange,
}) => {
  const textColor = useThemeColor({}, "text");
  const searchInputBg = useThemeColor({}, "searchInputBg");
  const isDark = useThemeColor({}, "background") === "rgb(17, 24, 39)";

  return (
    <ThemedView style={styles.searchContainer}>
      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: searchInputBg, color: textColor },
        ]}
        placeholder="Search messages..."
        placeholderTextColor={isDark ? "#8E8E93" : "#8E8E93"}
        value={query}
        onChangeText={onQueryChange}
        autoFocus
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
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
});
