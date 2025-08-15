import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ForgotPassword from "@/components/ForgotPassword";
import { signInSchema, type SignInPayload } from "@/schema/auth";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton";
import ContinueWithGitHubButton from "./ContinueWithGitHubButton";
import { Link as RouterLink } from "react-router-dom";
import APP_ROUTES from "@/constants/appRoutes";

type SignInFormProps = {
  onSubmit: (credentials: SignInPayload) => void;
};

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
}: SignInFormProps) => {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
    >
      <FormControl>
        <FormLabel htmlFor="username">Username or Email</FormLabel>
        <TextField
          id="username"
          name="username"
          type="text"
          placeholder="funky_smith / your@email.com"
          autoComplete="email"
          autoFocus
          fullWidth
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          id="password"
          name="password"
          type="password"
          placeholder="•••••••••••••"
          autoComplete="current-password"
          fullWidth
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </FormControl>

      <ForgotPassword open={open} handleClose={() => setOpen(false)} />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{ mt: 2 }}
      >
        {formik.isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <Link
        component="button"
        type="button"
        onClick={() => setOpen(true)}
        variant="body2"
        sx={{ alignSelf: "center" }}
      >
        Forgot your password?
      </Link>

      <Divider>or</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ContinueWithGoogleButton />
        <ContinueWithGitHubButton />
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link
            component={RouterLink}
            to={APP_ROUTES.AUTH.SIGN_UP}
            variant="body2"
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
