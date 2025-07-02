import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Livedrops.css";
import { useSelector } from "react-redux";
import LivedropSkeleton from "../CardsLoader/livedropSkeleton";
import { translateDynamicContent } from "../../utils/translateDynamicContent";
import { useTranslation } from "react-i18next";

function LiveDropsSlider() {
  const result = useSelector((state) => state.livedrop);
  const { liveDropsData = [], loading } = result || {};

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && liveDropsData.length > 1) {
      swiperRef.current.slideTo(1, 0); // jump to next
      setTimeout(() => {
        swiperRef.current.slideTo(0, 300); // scroll back smoothly
      }, 50);
    }
  }, [liveDropsData]);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="drop-list">
      <div className="drop-list-container relative">
        <div className="swiper-button-prev custom-swiper-button" />
        <div className="swiper-button-next custom-swiper-button" />
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          rewind={false}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          slidesPerView={"auto"}
          spaceBetween={16}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: { slidesPerView: "auto", spaceBetween: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="drop-list-grid"
        >
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={index} className="drop-card !w-auto">
                  <LivedropSkeleton />
                </SwiperSlide>
              ))
            : liveDropsData.map((elem, index) => (
                <SwiperSlide key={index} className="drop-card !w-auto">
                  <div className="drop-card-content">
                    <div className="drop-card-main relative">
                      <div className="drop-card-cover relative">
                        <img
                          src={elem?.item?.image}
                          alt=""
                          className="live-item"
                        />
                        <img src={elem?.case?.image} className="live-box" />
                      </div>
                      <div className="drop-card-user-info">
                        <div className="drop-user-image">
                          <span className="m-auto">{elem?.user?.name}</span>
                        </div>
                        <h4 className="break-keep flex gap-1 items-center justify-center">
                          ${elem?.item?.price.toFixed(2)}
                        </h4>
                      </div>
                      <div className="case-and-item-details">
                        <div className="drop-user-image">
                          <span>
                            {translateDynamicContent(
                              elem?.case?.name,
                              currentLanguage
                            ) || elem?.case?.name}
                          </span>
                        </div>
                        <h4 className="break-keep flex gap-1 items-center text-[14px] font-[500] text-[var(--main-text)]">
                          {elem?.item?.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default LiveDropsSlider;
