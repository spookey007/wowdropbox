import React, { useEffect, useRef, useState } from "react";
import BackButton from "../../components/Generic/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import GenericModal from "../../components/Generic/Generic-modal/GenericModal";
import ShippingAddress from "../../components/profile/ShippingAddress";
import GeneralButton from "../../components/Generic/GeneralButton";
import OrderSummary from "../../components/Checkout/OrderSummary";
// import CardDetails from "../../components/Checkout/CardDetails";
import { useTranslation } from "react-i18next";
import { Checked } from "../../utils/SvgIcons";
import {
  getUserDetails,
  setDefaultAddress,
} from "../../reducers/userSlice/userReducer";
import { showToastMessage } from "../../services/toastService";
import { useLocation, useNavigate } from "react-router-dom";
import OrderPlacedModal from "../../components/Checkout/OrderPlacedModal";
import { userPlaceOrder } from "../../reducers/checkOutSlice/checkOutReducer";
import Layout from "../../components/Layout/Layout";

const Checkout = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const userData = useSelector((state) => state.user);
  const loading = useSelector((state) => state.checkout.isLoading.placeOrder);
  const { userDetails } = userData || {};
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const formikRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state);
    }
  }, [location.state]);

  const handleSwithAddess = (add) => {
    const userAdress = userDetails?.shippingAddress?.find(
      (ele) => ele?.isDefault
    );
    if (add._id === userAdress?._id) return;
    dispatch(setDefaultAddress(add._id))
      .then((res) => {
        const { code, msg } = res?.payload?.resultData || {};
        if (code === 200) {
          dispatch(getUserDetails());
          showToastMessage(msg, "success", "Something went wrong");
        } else {
          showToastMessage(msg, "error", "Something went wrong");
        }
      })
      .catch((error) => {
        const msg = error?.msg || "Something went wrong";
        showToastMessage(msg, "error", "Something went wrong");
      });
  };

  const handleRequestToShipOrder = async () => {
    const shippingAddress = userDetails?.shippingAddress?.find(
      (ele) => ele?.isDefault
    );
    if (!shippingAddress) {
      return showToastMessage("Select a shipping address", "error", "shipAP");
    }
    const formValues = formikRef.current?.values || {};
    const errors = await formikRef.current?.validateForm();

    if (Object.keys(errors || {}).length > 0) {
      formikRef.current?.setTouched(
        Object.keys(formValues).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }
    const finalPayload = {
      ...orderData,
      shippingAddress,
      totalAmount: orderData?.productDetails?.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0
      ),
    };
    if (showBillingForm) {
      finalPayload.billingAddress = shippingAddress;
    } else {
      finalPayload.billingAddress = formValues;
    }
    setOrderSuccess(true);
    dispatch(userPlaceOrder(finalPayload))
      .then((response) => {
        if (response?.payload?.resultData?.code === 200) {
          setOrderData(null);
          setShowBillingForm(false);
          navigate("/checkout", { replace: true });
        } else {
          showToastMessage(
            response?.payload?.resultData?.msg,
            "error",
            "Something went wrong"
          );
        }
      })
      .catch((error) => {
        const msg = error?.msg || "Something went wrong";
        showToastMessage(msg, "error", "Something went wrong");
      });
  };

  const handleNavigate = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <Layout>
      <div className="layout-padding checkout-page">
        <BackButton pageTitle={t("headings.Checkout")} />
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="flex flex-col overflow-y-scroll md:h-[600px] h-100 gap-4">
            <h2 className="shipping-address-title">
              {t("checkout.Shipping address")}
            </h2>

            <div className="flex flex-col gap-4">
              {userDetails?.shippingAddress?.length === 0 ? (
                <GeneralButton
                  variant="primary"
                  className={"w-[200px] "}
                  onClick={() => setShowAddAddress(true)}
                >
                  {t("profile.Add address")}
                </GeneralButton>
              ) : (
                userDetails?.shippingAddress?.map((item) => (
                  <div
                    className={`bg-[var(--card-bg)] p-4 text-[var(--main-text)] rounded-md font-semibold  cursor-pointer relative ${
                      item?.isDefault && "border border-primary"
                    } `}
                    key={item?._id}
                    onClick={() => handleSwithAddess(item)}
                  >
                    {item?.isDefault && (
                      <div className="absolute top-3 right-3 cursor-pointer">
                        <Checked />
                      </div>
                    )}
                    {item?.firstname} {item.lastname} <br />
                    <p className="text-[var(--secondary-text)]">
                      {item?.addressLine1} {item.addressLine2} {item?.city}
                      {item?.state} {item?.country} - {item?.zipCode}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div>
              <h2 className="shipping-address-title">
                {t("checkout.Billing address")}
              </h2>
              <div class="flex items-center mt-4  ">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={() => setShowBillingForm(!showBillingForm)}
                  className="w-6 h-6 text-[var(--primary-color)] bg-[transparent] border border-[#A3A3B7] rounded-sm checked:bg-[var(--primary-color)] checked:border-[var(--primary-color)] appearance-none cursor-pointer"
                />
                <label
                  for="default-checkbox"
                  className="ms-2 text-md font-medium text-[var(--secondary-text)] whitespace-nowrap"
                >
                  {t("checkout.BillingCheck")}
                </label>
              </div>
              {!showBillingForm && (
                <div className="mt-8">
                  <ShippingAddress
                    isBillingAddress={true}
                    checkoutPage={true}
                    formikRef={formikRef}
                  />
                </div>
              )}
            </div>

            {/* <CardDetails /> */}
          </div>
          <div className="h-full  ">
            <OrderSummary
              orderData={orderData?.productDetails}
              handleRequestToShipOrder={handleRequestToShipOrder}
              loading={loading}
            />
          </div>
        </div>

        <GenericModal
          show={showAddAddress}
          handleClose={() => setShowAddAddress(false)}
          title={"Add new address"}
          className={"max-w-[750px]"}
        >
          <ShippingAddress
            exitAddressModal={setShowAddAddress}
            shippingModal={true}
          />
        </GenericModal>

        <OrderPlacedModal
          loading={loading}
          show={orderSuccess}
          handleClose={() => setOrderSuccess(false)}
          handleNavigate={handleNavigate}
        />
      </div>
    </Layout>
  );
};

export default Checkout;
