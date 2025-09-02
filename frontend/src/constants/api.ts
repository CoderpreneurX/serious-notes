export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
export const INTERNAL_SERVER_ERROR_MESSAGE =
  "Something went wrong, please try again later!";
export const SIGN_IN_SUCCESSFUL_MESSAGE = "Sign-in successful!";

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: "/api/auth/registration/",
    RESEND_VERIFICATION_EMAIL: "/api/auth/registration/resend-email/",
    VERIFY_EMAIL: "/api/auth/registration/verify-email/",

    SIGN_IN: "/api/auth/login/",
    GOOGLE_SIGN_IN: "/api/auth/google/",
    GITHUB_SIGN_IN: "/api/auth/github/",

    LOGOUT: "/api/auth/logout/",

    REQUEST_RESET_PASSWORD: "/api/auth/password/reset/",
    CONFIRM_RESET_PASSWORD: "/api/auth/password/reset/confirm/",
    CHANGE_PASSWORD: "/api/auth/password/change/",

    GET_PROFILE: "/api/auth/user/",
    UPDATE_PROFILE: "/api/auth/user/",
  },

  NOTES: {
    GET_NOTES: "/api/notes/",
  },
};
