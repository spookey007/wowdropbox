import React, { useState } from "react";
import { Eye, EyeSlash } from "../../../utils/SvgIcons";
import "./GenericInput.css";
import { useTranslation } from "react-i18next";

const GenericInput = ({
  isTextarea,
  id,
  type = "text",
  prefixIcon = null,
  prefixText = "",
  placeholder = "",
  value,
  onChange,
  onBlur,
  className = "",
  disabled,
  label = "",
  showPasswordToggle = false,
  error,
  touched,
  height: height = "h-[40px]",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType =
    isPassword && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const togglePassword = () => setShowPassword((prev) => !prev);

  const { t } = useTranslation();

  return (
    <div className="flex gap-1 flex-col w-full relative generic-input-container">
      {label && (
        <label htmlFor={id} className="generic-input-label">
          {t(label)}
        </label>
      )}

      <div className={`relative w-full  ${disabled && "opacity-50"} `}>
        {prefixIcon && (
          <span className="prefix-icon absolute left-3 top-1/2 transform -translate-y-1/2 ">
            {prefixIcon}
          </span>
        )}

        {prefixText && (
          <span className="prefix-text absolute left-3 top-[29px] transform text-[var(--secondary-text)]  -translate-y-1/2">
            {prefixText}
          </span>
        )}

        {isTextarea ? (
          <textarea
            rows="4"
            id={id}
            name={id}
            type={inputType}
            placeholder={t(placeholder)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full  ${
              prefixIcon || prefixText ? "pl-12" : "px-4"
            } py-2 rounded-lg generic-input 
          ${
            error && touched
              ? "focus:border-red-500"
              : "focus:border-[var(--primary-color)]"
          } 
          border border-transparent 
          focus:outline-none transition-colors duration-200 ${className}`}
            disabled={disabled}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={inputType}
            placeholder={t(placeholder)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full ${height} ${
              prefixIcon || prefixText ? "pl-12" : "px-4"
            } py-2 rounded-lg generic-input 
          ${
            error && touched
              ? "focus:border-red-500"
              : "focus:border-[var(--primary-color)]"
          } 
          border border-transparent 
          focus:outline-none transition-colors duration-200 ${className}`}
            disabled={disabled}
          />
        )}

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className={`absolute right-3 ${
              label ? "top-[6px]" : "top-[10px]"
            } cursor-pointer z-10`}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </button>
        )}
      </div>

      {error && touched && (
        <span className="text-sm text-red-500 mt-1">
          {t(`Validation.${error}`)}
        </span>
      )}
    </div>
  );
};

export default GenericInput;
