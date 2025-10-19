import { db } from '@/shared/database/db';
import { users } from '@/shared/database/schema';
import { eq } from 'drizzle-orm';
import { User } from '../types/user.type';
import { UserStatus } from '@/shared/types';

export const getAllUsers = async (): Promise<User[]> => {
  const result = await db.select().from(users);

  const mappedUsers = result.map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    status: user.status as UserStatus,
  }));

  return mappedUsers;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const result = await db.select().from(users).where(eq(users.id, userId));
  if (result.length === 0) return null;

  const user = result[0];
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    status: user.status as UserStatus,
  };
};

export const updateUserOnlineStatus = async (userId: string, status: UserStatus): Promise<void> => {
  await db.update(users)
    .set({ status })
    .where(eq(users.id, userId));
};

