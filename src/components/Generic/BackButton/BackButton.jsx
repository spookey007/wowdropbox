import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton = ({ showBackText = false, pageTitle }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  const { t } = useTranslation();
  return (
    <h1 className="text-[var(--main-text)] flex gap-2  md:text-2xl text-xl font-bold mb-6 ">
      <button
        onClick={handleClick}
        className="back-button flex  text-[var(--main-text)] border-[1px] border-[var(--card-bg)] justify-center items-center w-[30px]  text-[16px] font-medium rounded-[6px] cursor-pointer h-[35px]"
      >
        <BackIcon />
        {showBackText && t("general.Back")}
      </button>
      {pageTitle}
    </h1>
  );
};

export default BackButton;

const BackIcon = () => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.75 16.6548L8.25 11.1548L13.75 5.65479"
        stroke="var(--main-text)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
