import React from "react";
import GeneralButton from "../Generic/GeneralButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";
import watermark from '../../assets/Cards/watermark.png';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handlOpenBox = (boxId) => {
    navigate(`/boxs-details?id=${boxId}`);
  };

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className={`home-boxes-item  `}>
      <div className="home-boxes-item-image" style={{position: 'relative'}}>
        {item?.rarityLevel?.color && (
          <div
            className="home-boxes-item-rarity"
            style={{ backgroundColor: item.rarityLevel.color }}
          ></div>
        )}
        <img
          src={watermark}
          alt="watermark"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        <img
          src={item?.image}
          alt={item?.name}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
      <div className="home-box-info">
        <h2
          className="home-boxes-item-name"
          style={{
            color: '#0fffc1',
            fontFamily: 'Bungee, sans-serif',
            textShadow: '0 2px 8px #0fffc1cc, 0 1px 0 #23244d',
            letterSpacing: '1px',
            fontWeight: 800
          }}
        >
          {translateDynamicContent(item?.name, currentLanguage) || item?.name}
        </h2>
        {item?.description && (
          <p className="home-boxes-item-description">
            {translateDynamicContent(item?.description, currentLanguage) || item?.description}
          </p>
        )}
      </div>
      <h3 className="home-boxes-item-price">${item?.price?.toFixed(2)}</h3>
      <GeneralButton
        variant="primary"
        className={"mt-4 w-full"}
        onClick={() => handlOpenBox(item?._id)}
      >
        {t("home.Buy now")}
      </GeneralButton>
    </div>
  );
};

export default ItemCard;
