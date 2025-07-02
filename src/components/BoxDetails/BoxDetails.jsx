import React, { useState, useEffect, useRef, Fragment } from "react";
import { queryString } from "../../utils/useFunc";
import "./BoxDetails.css";
import "../Roulette/style.css";
import { HorizontalRoll } from "./HorizontalRoll";
import { useDispatch, useSelector } from "react-redux";
import { getClientSeed } from "../../utils/useFunc";
import BoxItemList from "./BoxItemList";
import GeneralButton from "../Generic/GeneralButton";
import BackButton from "../Generic/BackButton/BackButton";
import {
  getGameResult,
  getSingleBoxData,
  setWinItemImage,
} from "../../reducers/boxesSlice/boxReducer";
import { showToastMessage } from "../../services/toastService";
import { toggleLoginModal } from "../../reducers/commonSlice/commonReducer";
import { useNavigate } from "react-router-dom";
// import { boxDetails } from "./../../utils/StaticData";
import rollSound from "../../assets/Cases/sounds/roll-box.mp3";
import winItemSound from "../../assets/Cases/sounds/win-item.mp3";
import { translateDynamicContent } from "../../utils/translateDynamicContent";
import { useTranslation } from "react-i18next";
import Layout from "../Layout/Layout";
import FlyItem from "./FlyBoxItem";
import confetti from "canvas-confetti";
import { motion } from 'framer-motion';

let liveDataInterval;
let spinTimeOut;
export const BoxDetails = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.box);
  const userResult = useSelector((state) => state.user);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const { userDetails } = userResult || {};
  const { boughtBoxes } = userDetails || {};
  const token = localStorage.getItem("luckyBox#@user");
  const { boxDetails, boxProductList, isLoading, winItemImage } = result || {};
  const { boxDetailLoader } = isLoading || {};
  const { image, name, description } = boxDetails || {};
  const afterTranslateDescription =
    translateDynamicContent(description, currentLanguage) || description;
  const afterTranslateBoxName =
    translateDynamicContent(name, currentLanguage) || name;
  const { id: boxId } = queryString();
  const [itemsDetailsList, setItemsDetailsList] = useState([]);
  const [clientSeed, setClientSeed] = useState();
  const [price, setprice] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [randomValue, setRandomValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [arrowClass, setArrowClass] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const itemBoxRef = useRef(null);
  const audioRef = useRef(null);
  const audioWinRef = useRef(null);
  const navigate = useNavigate();
  const [transitionDuration, setTransitionDuration] = useState("none");
  const rouletteSliderWarpRef = useRef(null);
  spinTimeOut = 4200;
  const filterBoxItems = boxDetails?.boxItems?.filter(
    (el) => el?.pid && el?.pid?._id
  );
  const [expanded, setExpanded] = useState(false);
  const characterLimit = 150;

  // const [winItem, setWinItemImage] = useState(null);

  useEffect(() => {
    const userSeed = getClientSeed();
    setClientSeed(userSeed);
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  useEffect(() => {
    const arr = [];
    let startIndex = 0;
    if (filterBoxItems && filterBoxItems.length > 0) {
      for (let i = 0; i < 15; i++) {
        if (filterBoxItems.length === startIndex) {
          startIndex = 0;
        }
        arr.push(filterBoxItems[startIndex]);
        startIndex++;
      }
    }
    const itemsDetails = arr.map((el) => ({
      name: el?.pid?.name,
      price: el?.pid?.sellPrice,
      url: el?.pid?.bannerImage,
      background: el?.pid?.rarityLevel?.color,
      border: el?.pid?.rarityLevel?.color,
      colorName: el?.pid?.rarityLevel?.name,
    }));
    setItemsDetailsList(itemsDetails);
    setShuffledImages(shuffleArray(itemsDetails));
  }, [boxDetails]);

  useEffect(() => {
    dispatch(getSingleBoxData(boxId));
  }, [boxId, dispatch]);

  useEffect(() => {
    if (boxDetails?.boxItems?.length > 0) {
      setprice(boxDetails.price);
    }
  }, [boxDetails]);

  const addHighlightClass = () => {
    setArrowClass(true);
    
    if (itemBoxRef.current) itemBoxRef.current.classList.add("highlight");
    if (audioWinRef.current) {
      audioWinRef.current.play();
    }
    getLiveData();
  };
  const getLiveData = () => {
    liveDataInterval = setTimeout(() => {
      setOpenBox(false);
      setDisableButton(false);
      dispatch(setWinItemImage(null));
    }, 4000);
  };

  const handleOneHorizontalRoll = (winnerData) => {
    // We are tragetting 128 Index Position for the set real Result in the spin
    const targetIndex = 128;
    const rollItems = document.querySelectorAll(".item-grid .item-box");
    if (targetIndex >= 0 && targetIndex < rollItems.length) {
      if (winnerData) {
        const {
          bannerImage,
          name,
          sellPrice: price,
          rarityLevel,
        } = winnerData.pid;

        const item = rollItems[targetIndex];
        const itemCoverImg = item.querySelector(".item-cover img");
        const itemInfo = item.querySelector(".item-info");
        const priceElement = item.querySelector(".item-price");
        const rarityBgColor = item.querySelector(".rarity-shadow");
        const borderLine = item.querySelector(".item");
        const bottomBorderLine = item.querySelector(".rarity-border");
        const bubble = item.querySelector(".bubble");
        if (
          itemCoverImg &&
          itemInfo &&
          priceElement &&
          rarityBgColor &&
          borderLine &&
          bottomBorderLine &&
          bubble
        ) {
          itemCoverImg.src = bannerImage;
          dispatch(setWinItemImage(bannerImage));
          itemInfo.innerText = name?.split("(")[0].trim();
          priceElement.innerHTML = `${price?.toFixed(2)}`;
          rarityBgColor.style.backgroundColor = rarityLevel?.color;
          bottomBorderLine.style.backgroundColor = rarityLevel?.color;
          bubble.style.backgroundColor = rarityLevel?.color;
          borderLine.style.borderColor = rarityLevel?.color;
          borderLine.style.setProperty("--border-color", rarityLevel?.color);
          itemInfo.style.color = rarityLevel?.color;
        }
      }
    } else {
      console.error("Target index is out of range.");
    }
  };

  const handleGameResult = async (boxId, actualBoxPrice) => {
    try {
      const playData = {
        type: "user",
        boxId: boxId,
        randomNumber: clientSeed,
        boxPrice: actualBoxPrice,
      };
      dispatch(getGameResult(playData)).then((res) => {
        if (res?.payload?.resultData?.code === 200) {
          const winData = res?.payload?.resultData?.winResult;
          handleOneHorizontalRoll(winData);
          return;
        } else {
          showToastMessage(
            "Something went Wrong with game Result",
            "error",
            "gameResultError"
          );
        }
      });
    } catch (err) {
      console.log("Error in the Game Result Function", err);
    }
  };

  const gameResult = () => {
    handleGameResult(boxDetails?._id, price);
  };

  const handleRollStart = async () => {
    if (isRolling) return;
    clearInterval(liveDataInterval);
    if (!token && Object.keys(userDetails).length <= 0) {
      dispatch(toggleLoginModal(true));
      return;
    }
    if (!boughtBoxes?.includes(boxId)) {
      const msg =
        "Please purchase this Items before spin. ~ Пожалуйста, купите этот предмет перед вращением ~ Palun ostke see ese enne keerutamist.";
      return showToastMessage(
        translateDynamicContent(msg, currentLanguage),
        "error",
        "gameResultError"
      );
    }
    if (audioRef.current) {
      audioRef.current.play();
    }

    setOpenBox(true);
    gameResult();
    setIsRolling(true);
    setArrowClass(false);
    setDisableButton(true);
    if (itemBoxRef.current) {
      itemBoxRef.current.classList.remove("highlight");
    }
    setShuffledImages(shuffleArray(itemsDetailsList));
    setRandomValue(0);
    setTransitionDuration("none");
    setTimeout(() => {
      const randomInRange = -49.8 - Math.random() * 0.4;
      setRandomValue(randomInRange);
      setTransitionDuration("all 4s cubic-bezier(0.0, 0.0, 0.0, 1.0)");
      setTimeout(() => {
        setRandomValue(Math.round(randomInRange));
        setTransitionDuration("all 0.3s cubic-bezier(0.0, 0.0, 0.0, 1.0)");
        setIsRolling(false);
        setTimeout(() => {
          addHighlightClass("paid");
        }, 600);
      }, spinTimeOut);
    }, 10);
  };

  const handlespinvalueFree = () => {
    setOpenBox(true);
    if (isRolling) return;
    clearInterval(liveDataInterval);
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsRolling(true);
    setArrowClass(false);
    setDisableButton(true);
    if (itemBoxRef.current) {
      itemBoxRef.current.classList.remove("highlight");
    }
    setShuffledImages(shuffleArray(itemsDetailsList));
    setRandomValue(0);
    setTransitionDuration("none");
    setTimeout(() => {
      const randomInRange = -49.8 - Math.random() * 0.4;
      setRandomValue(randomInRange);
      setTransitionDuration("all 4s cubic-bezier(0.0, 0.0, 0.0, 1.0)");
      setTimeout(() => {
        setRandomValue(Math.round(randomInRange));
        setTransitionDuration("all 0.3s cubic-bezier(0.0, 0.0, 0.0, 1.0)");
        // Confetti on roulette-slider-warp
        if (rouletteSliderWarpRef.current) {
          const rect = rouletteSliderWarpRef.current.getBoundingClientRect();
          const canvas = document.createElement('canvas');
          canvas.style.position = 'absolute';
          canvas.style.left = 0;
          canvas.style.top = 0;
          canvas.style.width = rect.width + 'px';
          canvas.style.height = rect.height + 'px';
          canvas.width = rect.width;
          canvas.height = rect.height;
          canvas.style.pointerEvents = 'none';
          canvas.style.zIndex = 99;
          rouletteSliderWarpRef.current.appendChild(canvas);
          const myConfetti = confetti.create(canvas, { resize: false, useWorker: true });
          myConfetti({
            particleCount: 180,
            spread: 90,
            origin: { x: 0.5, y: 0.7 },
            colors: ["#0fffc1", "#f0e441", "#ff4fd8", "#fff"],
            scalar: 1.2,
            zIndex: 99,
            ticks: 120,
          });
          setTimeout(() => {
            canvas.remove();
          }, 1800);
        }
        setTimeout(() => {
          addHighlightClass("free");
        }, 600);
        setIsRolling(false);
      }, spinTimeOut);
    }, 10);
  };

  const handleBuyBox = () => {
    if (!token && Object.keys(userDetails).length <= 0) {
      dispatch(toggleLoginModal(true));
      return;
    }

    const payload = {
      boxId: boxId,
      boxPrice: price,
      boxImage: image,
      boxName: afterTranslateBoxName,
      boxDescription: afterTranslateDescription,
    };

    navigate("/box-payment", { state: payload });
  };

  return (
    <Layout>
      <Fragment>
        {boxDetailLoader ? (
          <p>Loading...</p>
        ) : (
          <div className="case-detail layout-padding">
            <div className={`case-detail-top-grid case-wrapper`}>
              <div className="case-detail-left  relative">
                <div className="case-deatil-btn">
                  <h2>{afterTranslateBoxName}</h2>
                  {afterTranslateDescription && (
                    <motion.div
                      className="text-[var(--secondary-text)] text-1xl text-center md:max-w-[800px] transition-all duration-300 ease-in-out overflow-hidden"
                      style={{
                        maxHeight: expanded ? "1005px" : "128px",
                        background: 'rgba(24,26,32,0.85)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '1.05rem',
                        lineHeight: 1.6,
                        color: '#fff',
                        boxShadow: '0 2px 12px #0fffc144',
                        marginBottom: '10px',
                        letterSpacing: '0.01em',
                        fontFamily: 'inherit',
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p style={{ margin: 0 }}>
                        {expanded
                          ? afterTranslateDescription
                          : afterTranslateDescription.slice(0, characterLimit) + "..."}
                        {afterTranslateDescription.length > characterLimit && (
                          <motion.span
                            className="text-[var(--primary-color)] cursor-pointer ml-1 inline-block"
                            onClick={() => setExpanded(!expanded)}
                            whileHover={{ scale: 1.08, color: '#0fffc1' }}
                            whileTap={{ scale: 0.95 }}
                            style={{ fontWeight: 700, textShadow: '0 2px 8px #0fffc1cc' }}
                          >
                            {expanded
                              ? t("general.Read less")
                              : t("general.Read more")}
                          </motion.span>
                        )}
                      </p>
                    </motion.div>
                  )}
                  <div className="flex gap-2">
                    {boughtBoxes?.includes(boxId) ? (
                      <GeneralButton
                        variant={"primary"}
                        onClick={handleRollStart}
                        disabled={disableButton}>
                        {!token && Object.keys(userDetails).length <= 0
                          ? t("box.SIGN IN TO UNBOX")
                          : t(`box.Open box`)}
                      </GeneralButton>
                    ) : (
                      <GeneralButton variant={"primary"} onClick={handleBuyBox}>
                        {!token && Object.keys(userDetails).length <= 0
                          ? t("box.SIGN IN TO UNBOX")
                          : ` ${t("box.Buy Box for")} $ ${price?.toFixed(2)}`}
                      </GeneralButton>
                    )}
                    <GeneralButton
                      variant={"secondary"}
                      onClick={handlespinvalueFree}
                      disabled={disableButton}>
                      {t("box.Demo")}
                    </GeneralButton>
                  </div>
                </div>
              </div>

              <BackButton pageTitle={t("headings.Box Opening")} />
              <div className={`case-detail-right relative`}>
                {!openBox ? (
                  <div className="box-detail">
                    <img className="h-[229px]" src={image} />
                  </div>
                ) : (
                  <div className="roulette-slider-warp" ref={rouletteSliderWarpRef} style={{position: 'relative'}}>
                    <HorizontalRoll
                      randomValue={randomValue}
                      itemBoxRef={itemBoxRef}
                      shuffledImages={shuffledImages}
                      transitionDuration={transitionDuration}
                      arrowClass={arrowClass}
                      isRolling={isRolling}
                    />
                    {!isRolling && winItemImage && (
                      <div className="winning-item">
                        <FlyItem ItemImage={winItemImage} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="box-item-section box-item-section-product-card">
              <div className="items-title-grid">
                <div className="section-title">
                  <h2>{t("Orders.Items")}</h2>
                </div>
              </div>
              {boxProductList && boxProductList?.length > 0 && (
                <BoxItemList
                  boxDetails={boxDetails}
                  boxProductList={boxProductList}
                />
              )}
            </div>
            <audio ref={audioRef} src={rollSound} />
            <audio ref={audioWinRef} src={winItemSound} />
          </div>
        )}
      </Fragment>
    </Layout>
  );
};
