import React from "react";
import ColorModeSelect from "../../theme/ColorModeSelect";
import SignInContainer from "../../components/auth/AuthContainer";
import Card from "../../components/ui/Card";
import SignInForm from "@/components/auth/SignInForm";
import { Typography } from "@mui/material";
import {
  API_ENDPOINTS,
  INTERNAL_SERVER_ERROR_MESSAGE,
  SIGN_IN_SUCCESSFUL_MESSAGE,
} from "@/constants/api";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import type { SignInPayload } from "@/schema/auth";
import { useToastStore } from "@/store/toastStore";
import type { SignInErrorResponse, SignInSuccessResponse } from "@/types/auth";

const SignInPage: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useToastStore((state) => state.showToast);
  const handleSignIn = async (credentials: SignInPayload) => {
    try {
      const response = await api.post<
        SignInSuccessResponse,
        SignInErrorResponse
      >(API_ENDPOINTS.AUTH.SIGN_IN, credentials);

      if (response.success) {
        setUser(response.data.user);
        showToast(SIGN_IN_SUCCESSFUL_MESSAGE);
      } else {
        showToast(response.data.non_field_errors[0], "error");
      }
    } catch {
      showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
    }
  };
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <SignInForm onSubmit={handleSignIn} />
      </Card>
    </SignInContainer>
  );
};

export default SignInPage;
