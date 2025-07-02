import * as Yup from "yup";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const returnOrderValidation = Yup.object({
  reason: Yup.string().required("Reason is required to cancel the order"),
  quantity: Yup.number().required("Quantity is required"),
  message: Yup.string()
    .required("Message is required")
    .min(50, "Reason must be at least 50 characters")
    .max(1000, "Reason must be at most 300 characters"),

  attachment: Yup.mixed()
    .required("Attachment is required")
    .test("fileSize", "File is too large. Max size is 5MB.", (value) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true;
      return (
        value.type === "application/pdf" || value.type.startsWith("image/")
      );
    }),
});
