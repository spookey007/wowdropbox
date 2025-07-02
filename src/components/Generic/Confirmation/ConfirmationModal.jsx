import React from "react";
import GenericModal from "../Generic-modal/GenericModal";
import GeneralButton from "../GeneralButton";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({
  isLoading,
  showModal,
  setShowModal,
  handleConfirm,
  type = "delete",
}) => {
  const { t } = useTranslation();
  return (
    <>
      <GenericModal
        className={"max-w-[500px]"}
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={t("confirmation.heading")}
      >
        <div>
          <h2 className="text-[var(--main-text)] font-semibold text-lg  ">
            {t("confirmation.staticMessage")} {type}?
          </h2>

          <div className="flex gap-4 mt-6">
            <GeneralButton
              variant={"primary"}
              className={"w-full"}
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              {t("general.Confirm")}
            </GeneralButton>
            <GeneralButton
              className={"w-full"}
              variant={"secondary"}
              onClick={() => setShowModal(false)}
            >
              {t("general.Cancel")}
            </GeneralButton>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default ConfirmationModal;
