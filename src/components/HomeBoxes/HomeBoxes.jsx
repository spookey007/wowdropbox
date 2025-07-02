import React, { Fragment, useState, useRef } from "react";
import ItemCard from "./ItemCard";
import "./HomeBoxes.css";
import { useSelector } from "react-redux";
import { LoaderCard } from "../CardsLoader/LoaderCard";
import NoData from "../Generic/NoData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const HomeBoxes = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const result = useSelector((state) => state.box);
  const { boxFiltersData, boxList, isLoading } = result || {};
  const { boxFilter, boxLoader } = isLoading || {};

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const filteredBoxes =
    selectedFilter && selectedFilter !== "all"
      ? boxList?.filter((box) =>
          box?.category?.some((elem) => elem?._id === selectedFilter)
        )
      : boxList;

  return (
    <div>
      <div className="home-box-filter">
        <h2 className="home-boxes-title">{t("home.Mystery Boxes")}</h2>
        <div className="relative md:max-w-[880px] max-w-full md:pr-6 pr-2 ">
          <div className="home-swiper-button-prev home-custom-swiper-button" />
          <div className="home-swiper-button-next home-custom-swiper-button" />

          {!boxFilter ? (
            <Swiper
              modules={[Navigation]}
              rewind={false}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              navigation={{
                nextEl: ".home-swiper-button-next",
                prevEl: ".home-swiper-button-prev",
              }}
              breakpoints={{
                768: { slidesPerView: "auto", spaceBetween: 2 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: "auto" },
              }}
              slidesPerView="auto"
              spaceBetween={8}
              className="home-boxes-filter-list"
            >
              <SwiperSlide className="!w-auto">
                <div
                  className={`home-boxes-filter-item ${
                    selectedFilter === "all" && "active-filter"
                  }`}
                  onClick={() => setSelectedFilter("all")}
                >
                  <label htmlFor="all">{t("home.All")}</label>
                </div>
              </SwiperSlide>

              {boxFiltersData?.length > 0 &&
                boxFiltersData?.map((item, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    <div
                      className={`home-boxes-filter-item ${
                        selectedFilter === item?._id && "active-filter"
                      }`}
                      onClick={() => setSelectedFilter(item?._id)}
                    >
                      <label htmlFor={item?._id}>
                        {translateDynamicContent(item?.name, currentLanguage) ||
                          item?.name}
                      </label>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <p className="text-white px-2">Loading...</p>
          )}
        </div>
      </div>

      <div className="home-boxes-grid">
        {!boxLoader ? (
          filteredBoxes?.length > 0 ? (
            filteredBoxes?.map((item) => {
              return <ItemCard item={item} key={item?._id} />;
            })
          ) : (
            <NoData title={t("general.Boxes")} />
          )
        ) : (
          Array(8)
            .fill(null)
            .map((_, index) => <LoaderCard key={index} />)
        )}
      </div>
    </div>
  );
};

export default HomeBoxes;
