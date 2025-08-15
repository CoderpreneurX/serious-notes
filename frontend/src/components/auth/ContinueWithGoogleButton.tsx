import {
  useGoogleLogin,
  type NonOAuthError,
  type TokenResponse,
} from "@react-oauth/google";
import { GoogleIcon } from "../CustomIcons";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@mui/material";
import { api } from "@/lib/api";
import { API_ENDPOINTS, INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/api";
import type { SignInSuccessResponse } from "@/types/auth";
import { useToastStore } from "@/store/toastStore";
import { useState } from "react";

export default function ContinueWithGoogleButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useToastStore((state) => state.showToast);
  const loginWithGoogle = async (access_token: string) => {
    try {
      setIsLoading(true);
      const response = await api.post<SignInSuccessResponse>(
        API_ENDPOINTS.AUTH.GOOGLE_SIGN_IN,
        {
          access_token,
        }
      );

      if (response.success) {
        setUser(response.data.user);
      }
    } catch {
      showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      if (tokenResponse.access_token) {
        loginWithGoogle(tokenResponse.access_token);
      }
    },
    onNonOAuthError: (nonOAuthError: NonOAuthError) => {
      if (nonOAuthError.type === "popup_failed_to_open") {
        showToast(
          "Failed to open popup. Please allow popups for this website!",
          "error"
        );
      } else if (nonOAuthError.type === "popup_closed") {
        showToast(
          "Google sign in popup closed unexpectedly. Please try again!",
          "error"
        );
      } else {
        showToast("Failed to sign in with Google. Please try again!", "error");
      }
    },
    onError: async () =>
      showToast("Failed to sign in with Google. Please try again!", "error"),
  });

  return (
    <Button
      loading={isLoading}
      loadingPosition="start"
      onClick={() => handleSignIn()}
      variant="outlined"
      startIcon={<GoogleIcon />}
    >
      Continue with Google
    </Button>
  );
}
