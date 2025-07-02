import { useTranslation } from "react-i18next";
import Confirmation from "../../components/ConfirmationTick/Confirmation";
import GeneralButton from "../../components/Generic/GeneralButton";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({
  loading,
  status = "success",
  boxId,
  message,
  handleClose,
}) => {
  const navigate = useNavigate();
  const navigateToBoxPage = () => {
    navigate(`/boxs-details?id=${boxId}`, { replace: true });
  };

  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 p-8 py-16">
      <Confirmation loading={loading} status={status} />

      <h2 className="text-[var(--main-text)] font-semibold text-xl  mt-6 text-center ">
        {status === "success"
          ? t("PaymentPage.Your payment was successful")
          : status === "error"
          ? t("PaymentPage.Your payment failed")
          : t("PaymentPage.Payment status")}
      </h2>
      {!loading && (
        <p className="text-[var(--secondary-text)]  text-center">
          {message || ""}
        </p>
      )}
      <div className="flex flex-col gap-4 mt-8">
        {status === "error" ? (
          <GeneralButton
            variant={"secondary"}
            className={"w-full"}
            onClick={handleClose}
          >
            Try again
          </GeneralButton>
        ) : status === "success" ? (
          <GeneralButton
            variant={"primary"}
            className={"w-full"}
            onClick={navigateToBoxPage}
          >
            {t("PaymentPage.Go to box opening page")}
          </GeneralButton>
        ) : null}
      </div>
    </div>
  );
};

export default ConfirmationModal;
