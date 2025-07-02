export const FeedbackFormFields = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your name",
    name: "name",
    type: "text",
    required: false,
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    required: true,
  },

  {
    id: "inquiryType",
    label: "Inquiry type",
    name: "inquiryType",
    type: "select",
    required: true,
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Enter your message",
    name: "message",
    type: "textarea",
    required: true,
  },

  {
    id: "attachment",
    label: "Attachment",
    name: "attachment",
    type: "file",
    required: false,
  },
];
