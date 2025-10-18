import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Avatar } from "@/shared/components/Avatar";
import { ThemedText } from "@/shared/components/ThemedText";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { User } from "@/modules/user/hooks/useUserDb";

interface ChatHeaderProps {
  chatParticipants: User[];
  chatName: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  chatParticipants,
  chatName,
}) => {
  const router = useRouter();

  return (
    <Stack.Screen
      options={{
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Avatar user={chatParticipants[0]} size={32} showStatus={false} />
            <ThemedText type="defaultSemiBold" numberOfLines={1}>
              {chatName}
            </ThemedText>
          </View>
        ),
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="#007AFF" />
          </Pressable>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    marginLeft: "auto",
  },
});
