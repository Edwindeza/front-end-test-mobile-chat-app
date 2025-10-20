import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "@/shared/components/ThemedText";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#007AFF" />
      <ThemedText style={styles.text}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.7,
  },
});
