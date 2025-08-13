import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useToastStore } from "@/store/toastStore";

const ToastContainer: React.FC = () => {
  const { toasts, closeToast } = useToastStore();

  return (
    <>
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={3000}
          onClose={(_, reason) => {
            if (reason === "clickaway") return;
            closeToast(toast.id);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          style={{ marginBottom: `${toasts.indexOf(toast) * 60}px` }} // stack spacing
        >
          <Alert
            onClose={() => closeToast(toast.id)}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default ToastContainer;
