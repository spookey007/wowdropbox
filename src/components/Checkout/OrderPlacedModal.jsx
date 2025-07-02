import React from "react";
import GenericModal from "../Generic/Generic-modal/GenericModal";
import Confirmation from "../ConfirmationTick/Confirmation";
import GeneralButton from "../Generic/GeneralButton";
import { useTranslation } from "react-i18next";

const OrderPlacedModal = ({ show, handleClose, handleNavigate, loading }) => {
  const { t } = useTranslation();
  return (
    <GenericModal
      isAuthModal={true}
      show={show}
      handleClose={handleClose}
      disableOutsideClick={true}
      title=""
      className={"max-w-[500px]"}
    >
      <div className="flex flex-col gap-4 p-8 py-16">
        <Confirmation loading={loading} />

        <h2 className="text-[var(--main-text)] font-semibold text-xl  mt-6 text-center ">
          {t("Orders.Your order has been successfully placed")}
        </h2>

        <p className="text-[var(--secondary-text)]  text-center">
          {t("Orders.Thank you for shopping with us.")}
        </p>

        <div className="flex flex-col gap-4 mt-8">
          <GeneralButton
            variant={"primary"}
            className={"w-full"}
            onClick={() => handleNavigate("/my-orders")}
          >
            {t("Orders.View order details")}
          </GeneralButton>
          <GeneralButton
            onClick={() => handleNavigate("/")}
            variant={"secondary"}
            className={"w-full"}
          >
            {t("Orders.Back to home")}
          </GeneralButton>
        </div>
      </div>
    </GenericModal>
  );
};

export default OrderPlacedModal;
