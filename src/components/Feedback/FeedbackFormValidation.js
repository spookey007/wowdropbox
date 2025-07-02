import * as Yup from "yup";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const feedbackValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  message: Yup.string()
    .required("Message is required")
    .min(20, "Message must be at least 20 characters")
    .max(500, "Message must be at most 500 characters"),

  inquiryType: Yup.string().required("Inquiry type is required"),
  attachment: Yup.mixed()
    .test("fileSize", "File is too large. Max size is 5MB.", (value) => {
      if (!value) return true; // no file selected, valid
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true;
      return (
        value.type === "application/pdf" || value.type.startsWith("image/")
      );
    }),
});
