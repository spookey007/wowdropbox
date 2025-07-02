import React from "react";
import { useTranslation } from "react-i18next";
import "./HomeAction.css";
import Magnifier from "../../assets/Footer/Magnifier.png";
import Shield from "../../assets/Footer/Shield.png";
import Truck from "../../assets/Footer/Truck.png";

const HomeActions = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full px-4 py-8  home-actions ">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row justify-between items-start gap-8">
        {[
          {
            icon: Magnifier,
            title: t("HomeAction.Transparent"),
            description: t(
              "HomeAction.All our boxes include the odds of winning each item. Probabilities are always visible for total transparency."
            ),
          },
          {
            icon: Shield,
            title: t("HomeAction.Worldwide shipping"),
            description: t(
              "HomeAction.We ship to all of Europe, the US and many other regions in Asia, Africa and South America."
            ),
          },
          {
            icon: Truck,
            title: t("HomeAction.Reliable"),
            description: t(
              "HomeAction.100% of purchases are made on verified websites. All goods are original and come with warranties."
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-4 items-center text-center md:w-1/3 w-full `}
          >
            <img src={item.icon} alt={item.title} className="w-16 h-16" />
            <h3 className={`md:text-[24px] text-[16px]   font-bold`}>
              {item.title}
            </h3>
            <p
              className={`mt-2 md:text-[16px] text-[14px]  sm:max-w-[300px]  `}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeActions;
