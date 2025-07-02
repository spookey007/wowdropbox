import React from "react";
import { Checked, Unchecked } from "../../utils/SvgIcons";
import { useTranslation } from "react-i18next";
// import GeneralButton from "../Generic/GeneralButton";

const CartItem = ({ item, selectedItems, onClick }) => {
  const { t } = useTranslation();
  const isSelected = selectedItems.includes(item);
  const bgColor = item?.productId?.rarityLevel?.color;
  const outOfStock = item?.productId?.totalProduct === 0 ? true : false;

  return (
    <div className="cart-item relative">
      {outOfStock && (
        <div className="absolute top-2 right-3">
          <p className="text-[var(--secondary-text)] font-semibold text-sm">
            {t("cart.outofstock")}
          </p>
        </div>
      )}
      {!outOfStock && (
        <button
          className="absolute top-3 right-3 cursor-pointer"
          disabled={outOfStock}
          onClick={onClick}
        >
          {isSelected ? <Checked /> : <Unchecked />}
        </button>
      )}
      <div
        className="item-rarity-color"
        style={{
          backgroundColor: bgColor,
          opacity: 0.9,
        }}
      ></div>
      <img src={item?.productId.bannerImage} alt={"img"} />

      <div>
        <h2>{item?.productId.name}</h2>
        <h3 className="item-price">${item?.productId.sellPrice}</h3>
      </div>
      {/* <div className="flex gap-2">
        <GeneralButton variant="secondary" className={"w-full mt-4"}>
          Remove
        </GeneralButton>
      </div> */}
    </div>
  );
};

export default CartItem;
