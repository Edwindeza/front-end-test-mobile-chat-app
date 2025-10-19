import { db } from '@/shared/database/db';
import { users } from '@/shared/database/schema';
import { eq } from 'drizzle-orm';
import { ProfileUser } from '../types/profile.type';

export const updateUserProfile = async (userId: string, updates: Partial<ProfileUser>): Promise<void> => {
  const updateData: any = {};

  if (updates.name) {
    updateData.name = updates.name;
  }

  if (updates.status) {
    updateData.status = updates.status;
  }

  await db.update(users)
    .set(updateData)
    .where(eq(users.id, userId));
};
