import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";

interface SearchCounterProps {
  currentIndex: number;
  totalResults: number;
}

export const SearchCounter: React.FC<SearchCounterProps> = ({
  currentIndex,
  totalResults,
}) => {
  return (
    <ThemedView style={styles.counterContainer}>
      <ThemedText style={styles.counter}>
        {totalResults > 0
          ? `Result ${currentIndex + 1} of ${totalResults}`
          : "No results found"}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  counter: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
});
