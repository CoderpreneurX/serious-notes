import SignInContainer from "@/components/auth/AuthContainer";
import SignUpForm from "@/components/auth/SignUpForm";
import Card from "@/components/ui/Card";
import { API_ENDPOINTS, INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/api";
import { api } from "@/lib/api";
import type { SignUpPayload } from "@/schema/auth";
import { useToastStore } from "@/store/toastStore";
import type { SignUpErrorResponse, SignUpSuccessResponse } from "@/types/auth";
import { Typography } from "@mui/material";
import { useState } from "react";

export default function SignUp() {
  const [submitErrors, setSubmitErrors] = useState<SignUpErrorResponse>({});
  const showToast = useToastStore((state) => state.showToast);
  const handleSignUp = async (SignUpCredentials: SignUpPayload) => {
    try {
      const response = await api.post<
        SignUpSuccessResponse,
        SignUpErrorResponse
      >(API_ENDPOINTS.AUTH.SIGN_UP, SignUpCredentials);

      if (response.success) {
        showToast(response.data.detail, "info");
      } else {
        setSubmitErrors(response.data);
      }
    } catch {
      showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
    }
  };
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined" sx={{ overflow: "clip" }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign Up
        </Typography>
        <SignUpForm onSubmit={handleSignUp} submitErrors={submitErrors} />
      </Card>
    </SignInContainer>
  );
}
