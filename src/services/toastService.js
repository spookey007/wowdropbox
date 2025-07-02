import { toast } from "react-toastify";

export const showToastMessage = (
  message,
  type = "info",
  toastId = undefined
) => {
  const options = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    toastId,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "info":
    default:
      toast.info(message, options);
      break;
  }
};
