import React, { useEffect, useState } from "react";
import "./horizontalRoll.css";
import BubbleAnimation from "../Generic/BubbleAnimation/bubbleAnimation";

export const HorizontalRoll = ({
  randomValue,
  itemBoxRef,
  shuffledImages,
  transitionDuration,
  arrowClass,
  isRolling,
}) => {
  const [boxes, setBoxes] = useState(
    Array.from({ length: 250 }, (_, i) => i + 1)
  );
  useEffect(() => {
    setBoxes(Array.from({ length: 250 }, (_, i) => i + 1));
  }, [isRolling]);
  const halfIndex = Math.round(boxes.length / 2) + 3;
  return (
    <div className="layout-wrapper">
      <div></div>
      <div className="main-wrapper">
        <div
          className={`container-spin ${arrowClass ? "highlight-grid" : ""} `}>
          <div className="roulette-arrow" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '150px'}}>
            {/* Up Arrow */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrow-gradient-down" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0fffc1" />
                  <stop offset="1" stopColor="#f0e441" />
                </linearGradient>
              </defs>
              <polygon points="14,24 24,8 14,14 4,8" fill="url(#arrow-gradient-down)" stroke="#0fffc1" strokeWidth="2" />
            </svg>
            {/* Down Arrow */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arrow-gradient-up" x1="0" y1="28" x2="28" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0fffc1" />
                  <stop offset="1" stopColor="#f0e441" />
                </linearGradient>
              </defs>
              <polygon points="14,4 24,20 14,14 4,20" fill="url(#arrow-gradient-up)" stroke="#0fffc1" strokeWidth="2" />
            </svg>

          </div>
          <div className="container-grid horizontal-roller">
            <div className="box-wrapper">
              <div className="box-grid">
                <div className="box-container">
                  <div
                    className="item-grid"
                    style={{
                      transform: `translateX(${randomValue}%)`,
                      transition:
                        randomValue !== 0 ? transitionDuration : "none",
                    }}>
                    {boxes.map((box, index) => {
                      const image =
                        shuffledImages[index % shuffledImages.length];
                      return (
                        <div
                          className="item-box"
                          key={index}
                          data-index={index + 1}
                          ref={index === halfIndex ? itemBoxRef : null}>
                          <div className="item-box-content">
                            <div
                              className="item"
                              style={{
                                borderColor: image?.border,
                                borderWidth: "1px",
                                borderStyle: "solid",
                                "--border-color": image?.background,
                              }}>
                              <div
                                className="item-win-animation"
                                style={{
                                  background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${image?.background}, rgba(0, 0, 0, 0))`,
                                }}
                              />

                              <div
                                className="rarity-shadow"
                                style={{
                                  backgroundColor: image?.background,
                                  opacity: 0.25,
                                }}
                              />

                              <div className="item-cover">
                                <img src={image?.url} alt={image?.name} />
                              </div>
                              <div className="case-name-info">
                                <div className="item-info">{image?.name}</div>

                                <div className="flex gap-1">
                                  <div className="item-price">
                                    {image?.price?.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="rarity-border"
                                style={{ backgroundColor: image?.background }}
                              />
                              <BubbleAnimation bgColor={image?.background} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArrowIcon = () => {
  return (
    <svg
      width="17"
      height="225"
      viewBox="0 0 17 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.92993 15.7563C7.53259 16.9907 9.29181 16.9907 9.89447 15.7563L14.039 7.2669C14.5739 6.17114 13.7761 4.89377 12.5567 4.89377H4.26768C3.04831 4.89377 2.25046 6.17114 2.78541 7.2669L6.92993 15.7563Z"
        fill="#A6F434"
      />
      <path
        d="M6.92993 209.095C7.53259 207.861 9.29181 207.861 9.89447 209.095L14.039 217.585C14.5739 218.68 13.7761 219.958 12.5567 219.958H4.26768C3.04831 219.958 2.25046 218.68 2.78541 217.585L6.92993 209.095Z"
        fill="#A6F434"
      />
    </svg>
  );
};
