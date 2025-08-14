import { create } from "zustand";

export type ToastSeverity = "success" | "error" | "warning" | "info";

export interface Toast {
  id: number;
  message: string;
  severity: ToastSeverity;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, severity?: ToastSeverity) => void;
  closeToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, severity = "info") =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: ++toastId, message, severity },
      ],
    })),
  closeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
