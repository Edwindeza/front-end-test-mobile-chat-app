import { useAuthStore } from '../stores/useAuthStore';

export const useAuth = () => {
  const { currentUser, isLoggedIn, loading, error, login, logout } = useAuthStore();

  return {
    currentUser,
    isLoggedIn,
    loading,
    error,
    login,
    logout,
  };
};
