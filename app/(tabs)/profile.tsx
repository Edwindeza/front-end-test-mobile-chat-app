import React from "react";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { ProfileContainer } from "@/modules/profile";

export default function ProfileScreen() {
  const { currentUser } = useAuthStore();

  return <ProfileContainer user={currentUser} />;
}
