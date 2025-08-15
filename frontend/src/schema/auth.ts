import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  username: Yup.string().required("Username or email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
});

export type SignInPayload = Yup.InferType<typeof signInSchema>;

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .matches(
      /^[A-Za-z0-9._-]+$/,
      "Username may contain letters, numbers, dots, underscores and hyphens only"
    )
    .required("Username is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  password1: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must be at least 8 characters and include one lowercase letter, one uppercase letter, one number, and one special character"
    ),

  password2: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password1")], "Passwords must match"),
});

export type SignUpPayload = Yup.InferType<typeof signUpSchema>;

export const RequestResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export type RequestResetPasswordPayload = Yup.InferType<
  typeof RequestResetPasswordSchema
>;
