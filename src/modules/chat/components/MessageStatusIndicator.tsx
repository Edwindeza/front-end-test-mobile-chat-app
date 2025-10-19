import React from "react";
import { View, StyleSheet } from "react-native";
import { IconSymbol } from "@/shared/components/IconSymbol";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { MessageStatus } from "@/modules/chat/types/chat.type";

interface MessageStatusIndicatorProps {
  status: MessageStatus;
  isCurrentUser: boolean;
}

export const MessageStatusIndicator: React.FC<MessageStatusIndicatorProps> = ({
  status,
  isCurrentUser,
}) => {
  const iconColor = useThemeColor({}, "tabIconDefault");

  const getStatusIcon = () => {
    switch (status) {
      case "sending":
        return null;
      case "sent":
        return "checkmark";
      case "delivered":
        return "checkmark.circle";
      case "read":
        return "checkmark.circle.fill";
      default:
        return null;
    }
  };

  const iconName = getStatusIcon();

  if (!iconName) {
    return null;
  }

  return (
    <View style={styles.container}>
      <IconSymbol name={iconName as any} size={12} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
