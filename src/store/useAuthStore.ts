import { create } from 'zustand';
import { User } from '../types';
import { getUser, createUser, updateUser } from '../services/userAPI';

interface AuthState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (name: string) => Promise<void>;
  updateProfile: (userData: User) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const data = await getUser();
      set({ user: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  login: async (name: string) => {
    set({ loading: true });
    try {
      await createUser({ name });
      const data = await getUser();
      set({ user: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  updateProfile: async (userData: User) => {
    set({ loading: true });
    try {
      await updateUser(userData);
      set({ user: userData, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
