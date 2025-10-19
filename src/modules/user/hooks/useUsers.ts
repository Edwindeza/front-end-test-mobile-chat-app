import React from 'react';
import { useUserStore } from '../store/useUserStore';

export const useUsers = () => {
  const { users, loading, error, loadUsers } = useUserStore();

  React.useEffect(() => {
    if (users.length === 0 && !loading) {
      loadUsers();
    }
  }, [users.length, loading]);

  return {
    users,
    loading,
    error,
  };
};
