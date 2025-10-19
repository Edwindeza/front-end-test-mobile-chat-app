import React from 'react';
import { useProfileStore } from '../store/useProfileStore';
import { ProfileUser } from '../types/profile.type';

export const useProfile = () => {
  const store = useProfileStore();
  return store;
};

export const useProfileContainer = (user: ProfileUser | null) => {
  const {
    user: profileUser,
    loading,
    error,
    isEditing,
    setUser,
    editProfile,
    saveProfile,
    cancelEdit,
    logout,
  } = useProfileStore();

  React.useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return {
    user: profileUser,
    loading,
    error,
    isEditing,
    editProfile,
    saveProfile,
    cancelEdit,
    logout,
  };
};
