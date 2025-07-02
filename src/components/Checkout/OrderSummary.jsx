import React from "react";
import GeneralButton from "../Generic/GeneralButton";
import OrderPlacedModal from "./OrderPlacedModal";
import { useTranslation } from "react-i18next";

const OrderSummary = ({ orderData, handleRequestToShipOrder, loading }) => {
  const { t } = useTranslation();
  const totalOrderPrice = orderData?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="shipping-address-title">
          {t("checkout.Order summary")}
        </h2>

        <div className="bg-[var(--card-bg)] p-4 text-[var(--main-text)] rounded-md mt-4">
          {orderData?.length > 0 ? (
            orderData?.map((item) => (
              <div
                className={`bg-[var(--card-bg)] p-2 text-[var(--main-text)] rounded-md font-semibold  cursor-pointer flex justify-between items-center `}
                key={item?.productId}
              >
                <h1>
                  <span className="text-[var(--secondary-text)]">
                    x{item?.quantity}{" "}
                  </span>
                  {item?.name}
                </h1>
                <p className="text-[var(--secondary-text)]">
                  ${(item?.price * item?.quantity).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center pt-4 pb-4">No items in cart</p>
          )}

          <div className="my-4 w-100 h-[1px] bg-[var(--secondary-text)]"></div>

          <div
            className={`bg-[var(--card-bg)] p-2 text-[var(--main-text)] rounded-md font-semibold  cursor-pointer flex justify-between items-center `}
          >
            <h1>{t("checkout.Order total")} </h1>
            <p className="text-[var(--main-text)] text-xl ">
              {/* ${totalOrderPrice?.toFixed(2) || 0} */}$0.00
            </p>
          </div>
        </div>
      </div>

      <GeneralButton
        disabled={!orderData || orderData?.length === 0 || loading}
        variant="primary"
        className="mt-4 w-full "
        onClick={handleRequestToShipOrder}
      >
        {loading ? "Placing order..." : t("checkout.Place Order")}
      </GeneralButton>
    </div>
  );
};

export default OrderSummary;
