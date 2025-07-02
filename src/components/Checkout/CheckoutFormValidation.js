import * as Yup from "yup";

export const cardDetailsValidationSchema = Yup.object({
  cardHolderName: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .required("Card holder name is required"),

  cardNumber: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),

  cvv: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),

  expiryDate: Yup.string()
    .transform((value) => (value ? value.trim() : ""))
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .required("Expiry date is required"),
});
