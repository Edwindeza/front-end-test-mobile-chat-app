import React from 'react';
import { useUserStore } from '../store/useUserStore';

export const useUsers = () => {
  const { users, loading, error, loadUsers } = useUserStore();

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
  };
};
