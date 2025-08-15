import { createRoot } from "react-dom/client";
import "./index.css";
import AppTheme from "./theme/AppTheme.tsx";
import { CssBaseline } from "@mui/material";
import AppRouter from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./constants/api.ts";
import ToastContainer from "./components/ui/Toast.tsx";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppRouter />
      <ToastContainer />
    </AppTheme>
  </GoogleOAuthProvider>
);
