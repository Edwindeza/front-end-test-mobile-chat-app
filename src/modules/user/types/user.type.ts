import { UserStatus } from "@/shared/types";

export type User = {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
};