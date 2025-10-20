import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { useThemeColor } from "@/shared/hooks/useThemeColor";

interface SearchNavigationProps {
  currentIndex: number;
  totalResults: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToMessage: () => void;
}

export const SearchNavigation: React.FC<SearchNavigationProps> = ({
  currentIndex,
  totalResults,
  onPrevious,
  onNext,
  onGoToMessage,
}) => {
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const disabledButtonBg = useThemeColor({}, "disabledButtonBg");

  return (
    <ThemedView
      style={[
        styles.navigationContainer,
        { borderTopColor: borderColor, borderBottomColor: borderColor },
      ]}
    >
      <Pressable
        style={[
          styles.navButton,
          { backgroundColor: tintColor },
          currentIndex === 0 && { backgroundColor: disabledButtonBg },
        ]}
        onPress={onPrevious}
        disabled={currentIndex === 0}
      >
        <IconSymbol name="chevron.left" size={20} color="#FFFFFF" />
        <ThemedText style={styles.navButtonText}>Previous</ThemedText>
      </Pressable>

      <Pressable
        style={[styles.goToButton, { backgroundColor: "rgb(27, 95, 243)" }]}
        onPress={onGoToMessage}
      >
        <ThemedText style={styles.goToButtonText}>Go to message</ThemedText>
      </Pressable>

      <Pressable
        style={[
          styles.navButton,
          { backgroundColor: tintColor },
          currentIndex === totalResults - 1 && {
            backgroundColor: disabledButtonBg,
          },
        ]}
        onPress={onNext}
        disabled={currentIndex === totalResults - 1}
      >
        <ThemedText style={styles.navButtonText}>Next</ThemedText>
        <IconSymbol name="chevron.right" size={20} color="#FFFFFF" />
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 4,
  },
  goToButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  goToButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
