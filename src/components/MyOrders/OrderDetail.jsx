import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../../reducers/checkOutSlice/checkOutReducer";
import { getStatusColor, splitPrefix } from "../../utils/useFunc";
import GeneralButton from "../Generic/GeneralButton";
import Loader from "../Generic/Loader";
import ReturnOrderForm from "./ReturnOrder/ReturnOrderForm";
import CancelOrderForm from "./CancelOrder/CancelOrderForm";
import { useTranslation } from "react-i18next";

const OrderDetail = ({
  setShowReturnForm,
  showReturnForm,
  selectedOrderId,
  setShowCancelReason,
  showCancelReason,
  setShowOrderDetails,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading, singleOrderDetails, boxPrice } = useSelector(
    (state) => state.checkout
  );

  const trackUrl = `https://track.global/en/tracking/${singleOrderDetails?.trackOrderNumber}?trackingNumber=${singleOrderDetails?.trackOrderNumber}`;

  const handleTrackOrderByUser = () => {
    window.open(trackUrl, "_blank");
  };

  useEffect(() => {
    dispatch(getSingleOrder(selectedOrderId));
  }, [dispatch, selectedOrderId]);

  const handleShowReturnForm = () => {
    setShowReturnForm(true);
  };

  const handleShowCancelReason = () => {
    setShowCancelReason(true);
  };

  if (isLoading?.singleOrder) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (showReturnForm) {
    return (
      <ReturnOrderForm
        singleOrderDetails={singleOrderDetails}
        setShowOrderDetails={setShowOrderDetails}
      />
    );
  }

  if (showCancelReason) {
    return (
      <CancelOrderForm
        singleOrderDetails={singleOrderDetails}
        setShowOrderDetails={setShowOrderDetails}
      />
    );
  }

  return (
    <div className="space-y-6 overflow-x-auto md:h-full h-[500px]">
      <div className="w-full flex flex-col md:flex-row gap-6">
        <img
          className="md:w-[300px] w-[150px] md:h-[150px] h-[200px] object-contain rounded"
          src={singleOrderDetails?.productId?.bannerImage}
          alt={singleOrderDetails?.productId?.name}
        />

        <div className="product-info space-y-3">
          <h1 className="text-2xl text-[var(--main-text)] font-bold">
            {singleOrderDetails?.productId?.name}
          </h1>

          <p>
            <span className="text-[var(--secondary-text)] font-medium">
              {t("Orders.Box price")}
            </span>
            <span className="text-[var(--main-text)]">
              {" "}
              $ {boxPrice?.toFixed(2) || 0}
            </span>
          </p>

          <p>
            <span className="text-[var(--secondary-text)] font-medium">
              {t("Orders.Quantity")}
            </span>
            <span className="text-[var(--main-text)]">
              {" "}
              {singleOrderDetails?.quantity}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <span className="text-[var(--secondary-text)] font-medium">
              {t("Orders.Status")}
            </span>
            <span
              className={`font-semibold text-[#000] ${getStatusColor(
                singleOrderDetails?.status
              )} border rounded-full px-2 py-0.5 whitespace-nowrap`}
            >
              {`${
                splitPrefix(singleOrderDetails?.status)?.removed
                  ? `${splitPrefix(singleOrderDetails?.status)?.removed}`
                  : ""
              }`}
              {t(`Orders.${splitPrefix(singleOrderDetails?.status)?.cleaned}`)}
            </span>
          </p>

          <div>
            <p className="text-[var(--secondary-text)] font-medium">
              {t("Orders.Shipping Address")}
            </p>
            <p className="text-[var(--main-text)] font-normal">
              {singleOrderDetails?.orderId?.shippingAddress?.firstname}{" "}
              {singleOrderDetails?.orderId?.shippingAddress?.lastname}
              <br />
              {singleOrderDetails?.orderId?.shippingAddress?.addressLine1}{" "}
              {singleOrderDetails?.orderId?.shippingAddress?.addressLine2}
              <br />
              {singleOrderDetails?.orderId?.shippingAddress?.city}{" "}
              {singleOrderDetails?.orderId?.shippingAddress?.state}
              <br />
              {singleOrderDetails?.orderId?.shippingAddress?.country} -{" "}
              {singleOrderDetails?.orderId?.shippingAddress?.zipCode}
            </p>
          </div>

          <div>
            <p className="text-[var(--secondary-text)] font-medium">
              {t("Orders.Billing Address")}
            </p>
            <p className="text-[var(--main-text)] font-normal">
              {singleOrderDetails?.orderId?.billingAddress?.firstname}{" "}
              {singleOrderDetails?.orderId?.billingAddress?.lastname}
              <br />
              {singleOrderDetails?.orderId?.billingAddress?.addressLine1}{" "}
              {singleOrderDetails?.orderId?.billingAddress?.addressLine2}
              <br />
              {singleOrderDetails?.orderId?.billingAddress?.city}{" "}
              {singleOrderDetails?.orderId?.billingAddress?.state}
              <br />
              {singleOrderDetails?.orderId?.billingAddress?.country} -{" "}
              {singleOrderDetails?.orderId?.billingAddress?.zipCode}
            </p>
          </div>
        </div>
      </div>
      {singleOrderDetails?.status === "cancel" && (
        <div className="border-t-[1px] border-[var(--secondary-text)]">
          <p className="text-[var(--secondary-text)] font-medium pt-2">
            {`${t("Orders.Your order has been canceled by the")} ${
              singleOrderDetails?.cancelByUser
                ? t("Orders.you")
                : t("Orders.admin")
            } ${t("Orders.due to the following reason:")}`}
          </p>
          <p className="text-[var(--main-text)] font-normal mt-1 break-words  ">
            {singleOrderDetails?.reason}
          </p>
        </div>
      )}
      {singleOrderDetails?.status !== "cancel" &&
        splitPrefix(singleOrderDetails?.status)?.cleaned !== "return-request" &&
        splitPrefix(singleOrderDetails?.status)?.cleaned !==
          "returned-accepted" &&
        splitPrefix(singleOrderDetails?.status)?.cleaned !==
          "returned-rejected" && (
          <div className="flex items-center justify-end gap-2 border-t-[1px] border-[var(--secondary-text)] pt-4">
            {singleOrderDetails?.status === "shipped" && (
              <GeneralButton
                onClick={handleTrackOrderByUser}
                variant="primary"
                className="max-w-[300px]"
              >
                {t("Orders.Track Order")}
              </GeneralButton>
            )}

            {singleOrderDetails?.status === "delivered" && (
              <GeneralButton
                variant="secondary"
                className="max-w-[200px]"
                onClick={handleShowReturnForm}
              >
                {t("headings.Return Order")}
              </GeneralButton>
            )}

            {singleOrderDetails?.status !== "cancel" &&
              singleOrderDetails?.status !== "shipped" &&
              singleOrderDetails?.status !== "delivered" && (
                <GeneralButton
                  variant="secondary"
                  className="max-w-[200px]"
                  onClick={handleShowCancelReason}
                >
                  {t("Orders.Cancel order")}
                </GeneralButton>
              )}
          </div>
        )}
    </div>
  );
};

export default OrderDetail;
