import React from "react";
import { useTranslation } from "react-i18next";

const NoData = ({ title }) => {
  const { t } = useTranslation();
  return (
    <div className="text-lg font-bold text-[var(--main-text)]">
      {t("general.No")} {title} {t("general.found")}
    </div>
  );
};

export default NoData;
