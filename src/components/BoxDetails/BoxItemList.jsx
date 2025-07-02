import { InfoIcon } from "../../utils/SvgIcons";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "./../../utils/translateDynamicContent";
import watermark from '../../assets/Cards/watermark.png';

function BoxItemList({ boxDetails, boxProductList }) {
  const getPrice = (value, position) => {
    const storeValue = Number(value).toFixed(2);
    const result = storeValue.split(".");
    return result[position];
  };

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="box-item-grid">
      {boxDetails &&
        boxProductList?.length > 0 &&
        boxProductList?.map((el, index) => {
          const { rarityLevel } = el?.pid || {};
          return (
            <>
              {el?.pid && (
                <div className="items-box">
                  <div className="chances-text">
                    <h2> {el.chance}% </h2>
                  </div>
                  <div className="info-icon relative group">
                    <div className="cursor-pointer">
                      <InfoIcon />
                    </div>

                    <div
                      className={`
  absolute bottom-full left-1/2 
  transform mb-2 
  w-max max-w-[200px] px-2 py-1 text-sm text-[var(--main-text)]
  bg-[var(--card-bg)] rounded shadow-xl   
  opacity-0 invisible
  group-hover:opacity-100 group-hover:visible
  max-h-[200px] overflow-y-auto
  ${
    index % 2 !== 0
      ? "-translate-x-[100%] md:-translate-x-[60%]"
      : "-translate-x-1/2"
  }
`}
                    >
                      {translateDynamicContent(
                        el?.pid?.description,
                        currentLanguage
                      )}
                    </div>
                  </div>
                  <div
                    className="items-box-rarity"
                    style={{
                      backgroundColor: rarityLevel?.color,
                      opacity: 0.9,
                    }}
                  ></div>

                  <div className="item-box-cover" style={{position: 'relative'}}>
                    <img src={el?.pid?.bannerImage || ""} />
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
                  </div>
                  <div className="item-box-name">
                    <div className="item-user-detail1">
                      <p className="skin-title mb-2">{el?.pid?.name}</p>
                    </div>
                    <h3 className="flex gap-1">
                      <div>
                        $ {getPrice(el?.pid?.sellPrice, 0)}.
                        {getPrice(el?.pid?.sellPrice, 1)}
                      </div>
                    </h3>
                  </div>
                </div>
              )}
            </>
          );
        })}
    </div>
  );
}

export default BoxItemList;
