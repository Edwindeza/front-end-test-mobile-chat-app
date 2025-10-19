import { create } from 'zustand';
import { useUserStore } from '@/modules/user/store/useUserStore';
import { useChatStore } from '@/modules/chat/store/useChatStore';
import { User } from '@/src/modules/user/types/user.type';

interface AuthState {
  currentUser: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;

  login: (userId: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,

  login: async (userId: string): Promise<boolean> => {
    try {
      set({ loading: true, error: null });
      const { users, setCurrentUser } = useUserStore.getState();
      const user = users.find(u => u.id === userId);

      if (user) {
        setCurrentUser(user);
        set({ currentUser: user, isLoggedIn: true, loading: false });

        const { loadChats } = useChatStore.getState();
        await loadChats(userId);

        return true;
      }

      set({ error: 'User not found', loading: false });
      return false;
    } catch (error) {
      set({ error: 'Login failed', loading: false });
      return false;
    }
  },

  logout: () => {
    const { currentUser } = get();

    if (currentUser) {
      const { setCurrentUser } = useUserStore.getState();
      setCurrentUser(null);

      const chatStore = useChatStore.getState();
      chatStore.setLoading(false);
      chatStore.setError(null);
      useChatStore.setState({ chats: [] });

    }

    set({ currentUser: null, isLoggedIn: false, error: null });
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
