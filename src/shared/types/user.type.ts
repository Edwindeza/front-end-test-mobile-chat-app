export type UserStatus = 'online' | 'offline' | 'away';

export type User = {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
};
