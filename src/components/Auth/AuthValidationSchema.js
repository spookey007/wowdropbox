import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(/^\S*$/, "Username must not contain spaces"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Both passwords must match"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
