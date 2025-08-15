import Dialog from "@mui/material/Dialog";
import Card from "./ui/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "@/lib/api";
import { API_ENDPOINTS, INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/api";
import { useToastStore } from "@/store/toastStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { GenericDetailResponse } from "@/types/auth";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const showToast = useToastStore((state) => state.showToast);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await api.post<GenericDetailResponse>(
          API_ENDPOINTS.AUTH.REQUEST_RESET_PASSWORD,
          { email: values.email }
        );

        if (response.success) {
          showToast(response.data.detail, "info");
          resetForm();
          handleClose();
        }
      } catch {
        showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        handleCancel();
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Card variant="outlined" sx={{ maxWidth: "none" }}>
          <CardHeader title="Reset Password" />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="body1">
              Enter your email address and we will send you an email to reset
              your password.
            </Typography>
            <TextField
              id="email"
              name="email"
              type="email"
              variant="outlined"
              placeholder="your@example.com"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              flexDirection: "row-reverse",
              gap: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    </Dialog>
  );
}
