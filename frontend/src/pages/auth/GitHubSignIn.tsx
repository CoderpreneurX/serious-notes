import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToastStore } from "@/store/toastStore";
import { api } from "@/lib/api";
import { API_ENDPOINTS, INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import APP_ROUTES from "@/constants/appRoutes";
import type { SignInSuccessResponse } from "@/types/auth";
import LoadingScreen from "@/components/LoadingScreen";

export default function GitHubSignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      showToast("Invalid link. Please check the link and try again!", "error");
      navigate(APP_ROUTES.AUTH.SIGN_IN, { replace: true });
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await api.post<SignInSuccessResponse>(
          API_ENDPOINTS.AUTH.GITHUB_SIGN_IN,
          {
            code,
          }
        );

        if (response.success) {
          const userData = response.data.user;
          setUser(userData);
        } else {
          showToast("GitHub sign-in failed. Please try again.", "error");
          navigate(APP_ROUTES.AUTH.SIGN_IN, { replace: true });
        }
      } catch {
        showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
        navigate(APP_ROUTES.AUTH.SIGN_IN, { replace: true });
      }
    };

    exchangeCode();
  }, [setUser, navigate, searchParams, showToast]);

  return <LoadingScreen />;
}
