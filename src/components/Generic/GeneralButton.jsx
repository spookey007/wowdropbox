import Loader from "./Loader";

const GeneralButton = ({
  children,
  variant,
  onClick,
  disabled,
  type = "button",
  className,
  isActive = false,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cyberpunk-btn ${
        variant === "primary"
          ? "bg-[#A6F434] text-black px-[20px] py-[12px] w-100 hover:bg-[#a7f434c4] border-b-[3px] border-[#73AA22] "
          : variant === "secondary"
          ? "border-[1px] border-[#A6F434] secondary-button  px-[22px] py-[12px] w-100 hover:bg-[#A6F434] "
          : variant === "icon" &&
            `bg-[#191B2B]  p-[8px] lg:w-[48px] w-[40px] lg:h-[48px] h-[40px] hover:bg-[#191B2B] ${
              isActive && "bg-[#191B2B]"
            }`
      }

      ${disabled && "general-disabled-button"}
     font-bold rounded-[12px] cursor-pointer md:text-[17px] text-[14px] lg:h-[48px]  h-[40px] ${className} flex justify-center  items-center whitespace-nowrap disabled:opacity-100 disabled:cursor-not-allowed"`}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default GeneralButton;
