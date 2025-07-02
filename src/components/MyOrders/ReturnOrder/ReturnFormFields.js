export const OrderReturnFormFields = [
  {
    label: "Reason for return",
    type: "select",
    name: "reason",
    id: "reason",
    placeholder: "Enter reason for return",
  },
  {
    label: "Product Quantity",
    type: "number",
    name: "quantity",
    id: "quantity",
    placeholder: "Enter product quantity",
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
