import * as Yup from "yup";

export const personalInfoValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .transform((value) => value?.trim() || "")
    .required("Username is required"),

  firstname: Yup.string()
    .transform((value) => value?.trim() || "")
    .required("First name is required"),

  mobile: Yup.string()
    .matches(/^\d{7,15}$/, "Phone number must be at least 7 digits")
    .required("Phone number is required"),

  lastname: Yup.string().transform((value) => value?.trim() || ""),
});

export const shippingAddressValidationSchema = Yup.object({
  firstname: Yup.string()
    .transform((value) => value?.trim() || "")
    .required("First name is required"),

  lastname: Yup.string().transform((value) => value?.trim() || ""),

  mobile: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Phone number must be 7 to 15 digits ")
    .required("Phone number is required"),

  country: Yup.string()
    .transform((value) => value?.trim() || "")
    .required("Country is required"),

  addressLine1: Yup.string()
    .transform((value) => value?.trim() || "")
    .required("Address Line 1 is required"),

  addressLine2: Yup.string().transform((value) => value?.trim() || ""), // optional, but still cleaned

  city: Yup.string()
    .transform((value) => value?.trim() || "")
    .required("City is required"),

  state: Yup.string()
    .transform((value) => value?.trim() || "")
    .required("State is required"),

  zipCode: Yup.string()
    .transform((value) => value?.trim() || "")
    .matches(/^\d{5,6}$/, "Enter a valid Zip Code")
    .required("Zip Code is required"),
});
