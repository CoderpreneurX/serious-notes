import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingScreen from "./LoadingScreen";
import APP_ROUTES from "@/constants/appRoutes";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <LoadingScreen />;
  return user ? (
    <>{children}</>
  ) : (
    <Navigate to={APP_ROUTES.AUTH.SIGN_IN} replace />
  );
}

export function RequireGuest({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <LoadingScreen />;
  return !user ? (
    <>{children}</>
  ) : (
    <Navigate to={APP_ROUTES.DASHBOARD} replace />
  );
}
