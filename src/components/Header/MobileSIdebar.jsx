import React, { useState } from "react";
import { headerLinks } from "../../utils/StaticData";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileSidebar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-64 p-4 transition-transform bg-[var(--card-bg)]  overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>

        <ul className="mt-10 space-y-2 font-medium">
          {headerLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-2 py-2 text-[var(--main-text)] text-sm rounded hover:bg-[var(--main-bg)]"
              >
                {t(`header.${link.label}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileSidebar;
