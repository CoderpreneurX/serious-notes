import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpen: false,
  toggleSidebar: () => {
    set({ isOpen: get().isOpen ? false : true });
  },
}));
