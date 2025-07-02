import React, { useEffect, useState } from "react";
import StripeForm from "../../components/StripeForm/StripeCheckout";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/Generic/BackButton/BackButton";
import GenericModal from "../../components/Generic/Generic-modal/GenericModal";
import ConfirmationModal from "./ConfirmationModal";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";
import Layout from "../../components/Layout/Layout";

const BoxPayment = () => {
  const location = useLocation();
  const [boxDetailsData, setBoxDetailsData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const characterLimit = 100;
  const [paymentInfo, setPaymentInfo] = useState({
    status: "success",
    loading: false,
    showModal: false,
    message: "",
  });

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  useEffect(() => {
    if (location.state) {
      setBoxDetailsData(location.state);
    }
  }, [location.state]);

  return (
    <Layout>
      <div className="layout-padding ">
        <BackButton pageTitle={t("headings.Box Payment")} />

        <div className="flex gap-4 flex-col md:flex-row ">
          <div className="md:w-1/2 w-full">
            <StripeForm
              boxDetailsData={boxDetailsData}
              setPaymentInfo={setPaymentInfo}
            />
          </div>

          {/* box details  */}
          <div className="md:w-1/2 w-full flex flex-col p-6 md:border-l  border-[#cccccca3] ">
            <div className="flex  flex-col sm:flex-row gap-2 ">
              <img
                className="md:w-[auto] w-[200px] md:mx-0 mx-auto    md:h-[200px] h-[150px] "
                src={boxDetailsData?.boxImage}
                alt={`${boxDetailsData?.name}`}
              />

              <div className="flex flex-col md:text-start text-center gap-2">
                <h1 className="text-2xl font-bold text-[var(--main-text)]">
                  {translateDynamicContent(
                    boxDetailsData?.boxName,
                    currentLanguage
                  ) || boxDetailsData?.boxName}
                </h1>

                {boxDetailsData?.boxDescription && (
                  <div
                    className="text-[var(--secondary-text)] text-1xl font-semibold md:max-w-[300px] transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: expanded ? "1005px" : "100px",
                    }}
                  >
                    <p>
                      {expanded
                        ? translateDynamicContent(
                            boxDetailsData.boxDescription,
                            currentLanguage
                          )
                        : translateDynamicContent(
                            boxDetailsData.boxDescription,
                            currentLanguage
                          ).slice(0, characterLimit) + "..."}
                      {boxDetailsData.boxDescription.length >
                        characterLimit && (
                        <span
                          className="text-[var(--primary-color)] cursor-pointer ml-1 inline-block"
                          onClick={() => setExpanded(!expanded)}
                        >
                          {expanded
                            ? t("general.Read less")
                            : t("general.Read more")}
                        </span>
                      )}
                    </p>
                  </div>
                )}
                <p className="text-[var(--main-text)] text-1xl font-semibold">
                  $ {boxDetailsData?.boxPrice?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <GenericModal
          isAuthModal={true}
          show={paymentInfo.showModal}
          disableOutsideClick={true}
          handleClose={() =>
            setPaymentInfo({ ...paymentInfo, showModal: false })
          }
          className={"max-w-[500px]"}
        >
          <ConfirmationModal
            status={paymentInfo.status}
            message={paymentInfo.message}
            loading={paymentInfo.loading}
            boxId={boxDetailsData?.boxId}
            handleClose={() =>
              setPaymentInfo({ ...paymentInfo, showModal: false })
            }
          />
        </GenericModal>
      </div>
    </Layout>
  );
};

export default BoxPayment;
