import { UserStatus } from "@/shared/types";

export type ProfileUser = {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
};

export type ProfileState = {
  user: ProfileUser | null;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
};

export type ProfileActionsType = {
  editProfile: () => void;
  saveProfile: (updates: Partial<ProfileUser>) => Promise<void>;
  cancelEdit: () => void;
  logout: () => void;
};
