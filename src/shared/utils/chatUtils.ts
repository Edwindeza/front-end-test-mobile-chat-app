import type { User } from "@/shared/types";

export const formatChatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
};

export const getChatName = (participants: User[], currentUserId: string) => {
  const otherParticipants = participants.filter(user => user.id !== currentUserId);
  
  if (otherParticipants.length === 0) {
    return "No participants";
  } else if (otherParticipants.length === 1) {
    return otherParticipants[0].name;
  } else {
    return `${otherParticipants[0].name} & ${
      otherParticipants.length - 1
    } other${otherParticipants.length > 2 ? "s" : ""}`;
  }
};