import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireGuest } from "./components/ProtectedRoutes";
import SignIn from "./pages/auth/SignIn";
import APP_ROUTES from "./constants/appRoutes";
import GitHubSignIn from "./pages/auth/GitHubSignIn";
import SignUp from "./pages/auth/SignUp";

export default function AppRouter() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const router = createBrowserRouter([
    {
      path: APP_ROUTES.AUTH.SIGN_IN,
      element: (
        <RequireGuest>
          <SignIn />
        </RequireGuest>
      ),
    },
    {
      path: APP_ROUTES.AUTH.SIGN_UP,
      element: (
        <RequireGuest>
          <SignUp />
        </RequireGuest>
      ),
    },
    {
      path: APP_ROUTES.AUTH.GITHUB_SIGN_IN,
      element: (
        <RequireGuest>
          <GitHubSignIn />
        </RequireGuest>
      ),
    },
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}
