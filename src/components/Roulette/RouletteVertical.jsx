import React, { useEffect, useState } from "react";
// import rollSound from "../../assets/auido/open_box.mp3";
// import lowProbWinSound from "../../assets/auido/lowProbWin.mp3";
import "./RouletteVertical.css";
// import BubbleAnimation from "../commonComponents/BubbleAnimation/bubbleAnimation";
// import { getPrice } from "../../utils/getPrice";

const RouletteVertical = ({
  randomValue,
  itemBoxRef,
  shuffledImages,
  transitionDuration,
  audioWinRef,
  audioRef,
  fastMode,
  isRolling,
}) => {
  const [boxes, setBoxes] = useState(
    Array.from({ length: 250 }, (_, i) => i + 1)
  );
  useEffect(() => {
    setBoxes(Array.from({ length: fastMode ? 20 : 250 }, (_, i) => i + 1));
  }, [isRolling]);

  const halfIndex = Math.round(boxes.length / 2) + 1;
  return (
    <div className="vertical-layout-wrapper">
      <div className="vertical-main-wrapper">
        <div className="vertical-container">
          <div className="vertical-container-grid">
            <div className="box-wrapper">
              <div className="box-grid">
                <div className="box-container-vertical">
                  <div
                    className="vertical-item-grid"
                    style={{
                      transform: `translateX(${randomValue}%)`,
                      transition:
                        randomValue !== 0 ? transitionDuration : "none",
                    }}
                  >
                    {boxes.map((box, index) => {
                      const image =
                        shuffledImages[index % shuffledImages?.length];
                      const rartyColorName = image?.colorName?.toLowerCase();
                      return (
                        <div
                          className="vertical-item-box"
                          key={index}
                          data-index={index + 1}
                          ref={index === halfIndex ? itemBoxRef : null}
                        >
                          <div
                            className={`item-box-content ${rartyColorName} ${index}`}
                            style={{
                              borderColor: image?.background,
                              "--border-color": image?.background,
                            }}
                          >
                            <div className="item-vertical-piece">
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

                              <div className="item-cover  ">
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
                              {/* <BubbleAnimation bgColor={image?.background} /> */}
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

      {/* Disable button when rolling */}
      {/* <audio ref={audioRef} src={rollSound} /> */}
      {/* <audio ref={audioWinRef} src={lowProbWinSound} /> */}
    </div>
  );
};

export default RouletteVertical;
