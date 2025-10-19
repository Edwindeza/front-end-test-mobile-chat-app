import { create } from 'zustand';
import { ProfileUser, ProfileState, ProfileActionsType } from '../types/profile.type';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useUserStore } from '@/modules/user/store/useUserStore';
import { updateUserProfile } from '../services/profileService';
import { showToast } from '@/shared/components/Toast';

interface ProfileStore extends ProfileState, ProfileActionsType {
  setUser: (user: ProfileUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isEditing: false,

  setUser: (user: ProfileUser | null) => {
    set({ user });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  editProfile: () => {
    set({ isEditing: true });
  },

  saveProfile: async (updates: Partial<ProfileUser>) => {
    const { user } = get();
    if (!user) return;

    try {
      set({ loading: true, error: null });

      await updateUserProfile(user.id, updates);

      set(state => ({
        user: state.user ? { ...state.user, ...updates } : null,
        isEditing: false,
        loading: false,
      }));

      if (updates.name) {
        const { setCurrentUser } = useUserStore.getState();
        setCurrentUser({ ...user, ...updates });
      }

      showToast('Profile updated - Changes saved successfully', 'success');
    } catch (error) {
      console.error('Error saving profile:', error);
      set({ error: 'Failed to save profile', loading: false });

      showToast('Failed to save profile', 'error');
    }
  },

  cancelEdit: () => {
    set({ isEditing: false, error: null });
  },

  logout: () => {
    const { logout } = useAuthStore.getState();
    logout();
  },
}));
