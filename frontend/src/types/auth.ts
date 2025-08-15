export type User = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type GenericDetailResponse = {
  detail: string;
};

export type SignInSuccessResponse = {
  access: string;
  refresh: string;
  user: User;
};

export type SignInErrorResponse = {
  non_field_errors: string[];
};

export type LogoutSuccessResponse = GenericDetailResponse;

export type SignUpSuccessResponse = GenericDetailResponse;

export type SignUpErrorResponse = {
  email?: string[];
  username?: string[];
  password1?: string[];
  password2?: string[];
};
