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
import { signUpSchema, type SignUpPayload } from "@/schema/auth";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton";
import ContinueWithGitHubButton from "./ContinueWithGitHubButton";
import type { SignUpErrorResponse } from "@/types/auth";
import APP_ROUTES from "@/constants/appRoutes";

type SignUpFormProps = {
  onSubmit: (credentials: SignUpPayload) => void;
  submitErrors: SignUpErrorResponse;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, submitErrors }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Helper to get combined error
  const getFieldError = (field: keyof SignUpErrorResponse) => {
    if (formik.touched[field] && formik.errors[field]) {
      return formik.errors[field];
    }
    if (submitErrors[field] && submitErrors[field].length > 0) {
      return submitErrors[field][0];
    }
    return "";
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
    >
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextField
          id="username"
          name="username"
          type="text"
          placeholder="funky_smith"
          autoComplete="username"
          autoFocus
          fullWidth
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError("username"))}
          helperText={getFieldError("username")}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          name="email"
          type="email"
          placeholder="funky_smith@thesmiths.com"
          autoComplete="email"
          fullWidth
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError("email"))}
          helperText={getFieldError("email")}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password1">Password</FormLabel>
        <TextField
          id="password1"
          name="password1"
          type="password"
          placeholder="•••••••••••••"
          autoComplete="new-password"
          fullWidth
          variant="outlined"
          value={formik.values.password1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError("password1"))}
          helperText={getFieldError("password1")}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password2">Confirm Password</FormLabel>
        <TextField
          id="password2"
          name="password2"
          type="password"
          placeholder="•••••••••••••"
          autoComplete="new-password"
          fullWidth
          variant="outlined"
          value={formik.values.password2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError("password2"))}
          helperText={getFieldError("password2")}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{ mt: 2 }}
      >
        {formik.isSubmitting ? "Signing up..." : "Sign up"}
      </Button>

      <Divider>or</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ContinueWithGoogleButton />
        <ContinueWithGitHubButton />
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link href={APP_ROUTES.AUTH.SIGN_IN} variant="body2">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
