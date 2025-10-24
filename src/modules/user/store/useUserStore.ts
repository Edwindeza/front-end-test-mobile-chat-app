import { create } from 'zustand';
import { UserStatus } from '@/shared/types';
import { User } from '@/shared/types';
import { getAllUsers, updateUserOnlineStatus } from '../services/userService';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;

  loadUsers: () => Promise<void>;
  setCurrentUser: (user: User | null) => void;
  updateUserOnlineStatus: (userId: string, status: UserStatus) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  loadUsers: async () => {
    try {
      set({ loading: true, error: null });
      console.time('loadUsers-zustand');

      const users = await getAllUsers();

      console.timeEnd('loadUsers-zustand');
      set({ users, loading: false });
      console.log(`Loaded ${users.length} users with Zustand`);
    } catch (error) {
      console.error('Error loading users:', error);
      set({ error: 'Failed to load users', loading: false });
    }
  },

  setCurrentUser: (user: User | null) => {
    set({ currentUser: user });
  },

  updateUserOnlineStatus: async (userId: string, status: UserStatus) => {
    try {
      await updateUserOnlineStatus(userId, status);

      set(state => ({
        users: state.users.map(user =>
          user.id === userId ? { ...user, status } : user
        ),
        currentUser: state.currentUser?.id === userId
          ? { ...state.currentUser, status }
          : state.currentUser,
      }));
    } catch (error) {
      console.error('Error updating user online status:', error);
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
