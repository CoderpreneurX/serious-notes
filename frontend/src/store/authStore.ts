import { create } from "zustand";
import { api } from "../lib/api";
import { API_ENDPOINTS } from "../constants/api";
import { type User } from "@/types/auth";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (userData: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  fetchUser: async () => {
    try {
      const response = await api.get<User>(API_ENDPOINTS.AUTH.GET_PROFILE);

      if (response.success) {
        set({ user: response.data, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch {
      set({ user: null, loading: false });
    }
  },
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
