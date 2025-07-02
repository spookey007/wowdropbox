import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import "./Dropdown.css";
import { DownArrow } from "../../../utils/SvgIcons";
import { useTranslation } from "react-i18next";

/**
 * Dropdown component for various UI contexts (default, form, auth).
 *
 * @component
 * @example
 * // Basic usage for form
 * <Dropdown
 *   type="form"
 *   label="Select State"
 *   options={[{ label: "Karnataka" }, { label: "Tamil Nadu" }]}
 *   selectedValue="Karnataka"
 *   onSelect={(val) => console.log(val)}
 * />
 *
 * @param {Object} props - Component props
 * @param {"default"|"form"|"auth"} [props.type="default"] - Dropdown display type
 * @param {string} [props.label="Options"] - Default label to show when nothing is selected
 * @param {Array<{ label: string }>} [props.options=[]] - List of options to display
 * @param {Object} [props.user={}] - User info (used only for "auth" type)
 * @param {Function} [props.onSelect=() => {}] - Callback when an option is selected
 * @param {string} [props.selectedValue=""] - External selected value to prefill the dropdown (for "default" and "form" types only)
 *
 * @returns {JSX.Element} Dropdown component
 */
export default function Dropdown({
  type = "default",
  label = "Options",
  disabled = false,
  options = [],
  user = {},
  onSelect = () => {},
  selectedValue = "",
  // setSelectedLabel,
}) {
  const [selectedLabel, setSelectedLabel] = useState(label);

  const handleSelect = (option) => {
    if (type === "default" || type === "form") {
      setSelectedLabel(option.label);
    }
    onSelect(option);
  };

  // 👇 Sync selectedValue with internal label (only for default/form types)
  useEffect(() => {
    if ((type === "default" || type === "form") && selectedValue) {
      const matched = options.find((opt) => opt.label === selectedValue);
      if (matched) setSelectedLabel(matched.label);
    }
  }, [selectedValue, options, type]);

  const buttonClasses = `inline-flex w-full cursor-pointer whitespace-nowrap capitalize items-center justify-center gap-x-1.5 rounded-md text-md font-semibold dropdown-button ${
    type === "form" && "form-dropdown"
  }`;

  const menuClasses = `absolute right-0 z-10 mt-1 w-fit ${
    (type === "form" || type === "auth") && "w-full"
  } origin-top-right rounded-md shadow-lg focus:outline-none ${
    type === "auth" ? "top-[50px]" : ""
  } dropdown-menu`;

  const menuItemClasses = (active) =>
    `block w-full text-left px-5 py-4 text-sm`;

  const { t } = useTranslation();
  return (
    <Menu
      as="div"
      className={`relative inline-block text-left custom-dropdown ${
        type === "auth" ? "auth-dropdown" : type === "form" ? "w-full" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <MenuButton className={buttonClasses} disabled={disabled}>
          {type === "auth" ? (
            <div className="flex items-center gap-2">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-full object-cover"
                />
              )}
              <span>{user?.name || "User"}</span>
            </div>
          ) : // selectedLabel
          selectedValue ? (
            selectedValue
          ) : (
            label
          )}
          <DownArrow />
        </MenuButton>
      </div>

      <MenuItems className={menuClasses}>
        <div>
          {options.map((option, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <button
                  onClick={() => handleSelect(option)}
                  className={menuItemClasses(active)}
                >
                  {type === "auth" ? t(`header.${option.label}`) : option.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
