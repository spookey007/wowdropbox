import * as Yup from "yup";

export const cancelOrderValidation = Yup.object({
  reason: Yup.string()
    .required("Reason is required to cancel the order")
    .min(50, "Reason must be at least 50 characters")
    .max(300, "Reason must be at most 300 characters"),
});
