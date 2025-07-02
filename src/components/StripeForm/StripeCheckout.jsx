import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import GeneralButton from "../Generic/GeneralButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUserBoughtBoxes } from "../../reducers/userSlice/userReducer";
import {
  chargeSavedCard,
  createStripePayment,
  deleteUserSavedCards,
  getUserSavedCards,
  savePaymentData,
} from "../../reducers/paymentSlice/paymentReducer";
import { useEffect, useState } from "react";
import { cardType } from "../../utils/StaticData";
import { TrashIcon } from "../../utils/SvgIcons";
import { showToastMessage } from "../../services/toastService";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../Generic/Confirmation/ConfirmationModal";
import { toggleLoginModal } from "../../reducers/commonSlice/commonReducer";

import visa from "../../assets/Payments/visa.png";
import mastercard from "../../assets/Payments/master.webp";
import amex from "../../assets/Payments/american.png";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

// Test Account Publick Key
// const stripePromise = loadStripe(
//   "pk_test_51NSPysLCLwWjHak82ceWWAmiCQjJ6iMJlBpFmk2Az3AVmx8B6CaceZoJajE1QrFAt4FyoJrZzBjtyHmpzRTPxH4b00IS52sBFn"
// );
const stripePromise = loadStripe(
  "pk_live_51NSPysLCLwWjHak8ISruZhljHYOZKxeI97Fh0WEMF8vYYh4FSPFKNUSiAHfz7aDAACpaF19ZgpBluyf8TFTLFE8w00tnpbdxv1"
);

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#ccc",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const CheckoutForm = ({ boxDetailsData, setPaymentInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [cardErrors, setCardErrors] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [cardComplete, setCardComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const [selectedCardId, setSelectedCardId] = useState("new");
  const { boxPrice, boxId, boxName } = boxDetailsData || {};
  const result = useSelector((state) => state.user);
  const { userDetails } = result || {};
  const { username, email } = userDetails || {};
  const cardResult = useSelector((state) => state.payment);
  const token = localStorage.getItem("luckyBox#@user");
  const { isLoading } = cardResult || {};
  const { savedCards } = cardResult || {};
  const [savePermission, setSavePermission] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const [showModal, setShowModal] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState(null);
  useEffect(() => {
    dispatch(getUserSavedCards());
  }, []);

  useEffect(() => {
    if (savedCards?.length > 0) {
      setSelectedCardId(savedCards[savedCards.length - 1].id);
    }
  }, [savedCards]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!token && Object.keys(userDetails).length <= 0) {
  //     dispatch(toggleLoginModal(true));
  //     return;
  //   }
  //   const useSavedCard = selectedCardId !== "new";
  //   setPaymentInfo({
  //     status: "",
  //     loading: true,
  //     showModal:
  //       (cardComplete.number && cardComplete.expiry && cardComplete.cvc) ||
  //       useSavedCard,
  //     message: "",
  //   });

  //   if (!useSavedCard) {
  //     if (
  //       !cardComplete.number ||
  //       !cardComplete.expiry ||
  //       !cardComplete.cvc ||
  //       cardErrors.number ||
  //       cardErrors.expiry ||
  //       cardErrors.cvc
  //     ) {
  //       const newErrors = {};
  //       if (!cardComplete.number && !cardErrors.number) {
  //         newErrors.number = "Card number is required";
  //       }
  //       if (!cardComplete.expiry && !cardErrors.expiry) {
  //         newErrors.expiry = "Card expiry is required";
  //       }
  //       if (!cardComplete.cvc && !cardErrors.cvc) {
  //         newErrors.cvc = "Card CVC is required";
  //       }

  //       setCardErrors((prev) => ({ ...prev, ...newErrors }));
  //       return;
  //     }
  //   }

  //   if (!stripe || !elements) return;

  //   const amountInCents = boxPrice * 100;

  //   try {
  //     let paymentIntentId = null;
  //     if (useSavedCard) {
  //       const response = await dispatch(
  //         chargeSavedCard({
  //           amount: amountInCents,
  //           paymentMethodId: selectedCardId,
  //         })
  //       );

  //       const { code, id, message } = response?.payload?.resultData || {};

  //       if (code !== 200) {
  //         const errorMsg = message || "Failed to charge saved card.";

  //         setPaymentInfo({
  //           status: "error",
  //           loading: false,
  //           showModal: true,
  //           message: errorMsg,
  //         });
  //         return;
  //       }

  //       paymentIntentId = id;
  //     } else {
  //       const response = await dispatch(
  //         createStripePayment({
  //           amount: amountInCents,
  //           savePermission: savePermission,
  //         })
  //       );

  //       if (response?.payload?.resultData?.msg) {
  //         if (
  //           response?.payload?.resultData?.msg?.raw.type ===
  //             "invalid_request_error" &&
  //           response?.payload?.resultData?.msg?.raw.code ===
  //             "resource_missing" &&
  //           response?.payload?.resultData?.msg?.raw.message.includes(
  //             "a similar object exists in test mode"
  //           )
  //         ) {
  //           setPaymentInfo({
  //             status: "error",
  //             loading: false,
  //             showModal: true,
  //             message:
  //               "It looks like you're using a test payment Card. Please refresh and try with Real Payment Card.",
  //           });
  //           return;
  //         }
  //       }

  //       const clientSecret = response?.payload?.resultData?.clientSecret;

  //       if (!clientSecret) {
  //         const errorMsg = "Client secret not found";
  //         setPaymentInfo({
  //           status: "error",
  //           loading: false,
  //           showModal: true,
  //           message: errorMsg,
  //         });
  //         return;
  //       }

  //       const result = await stripe.confirmCardPayment(clientSecret, {
  //         payment_method: {
  //           card: elements.getElement(CardNumberElement),
  //           billing_details: {
  //             name: username,
  //             email: email,
  //           },
  //         },
  //         receipt_email: email,
  //       });

  //       if (result.error) {
  //         if (
  //           result.error.type === "invalid_request_error" &&
  //           result.error.code === "resource_missing" &&
  //           result.error.message.includes(
  //             "a similar object exists in test mode"
  //           )
  //         ) {
  //           setPaymentInfo({
  //             status: "error",
  //             loading: false,
  //             showModal: true,
  //             message:
  //               "It looks like you're using a test payment Card. Please refresh and try with Real Payment Card.",
  //           });
  //           return;
  //         } else {
  //           setPaymentInfo({
  //             status: "error",
  //             loading: false,
  //             showModal: true,
  //             message: result.error.message,
  //           });
  //           return;
  //         }
  //       }

  //       if (result.paymentIntent?.status !== "succeeded") {
  //         const errorMsg = "Payment did not succeed.";

  //         setPaymentInfo({
  //           status: "error",
  //           loading: false,
  //           showModal: true,
  //           message: errorMsg,
  //         });
  //         return;
  //       }

  //       paymentIntentId = result.paymentIntent.id;

  //       elements.getElement(CardNumberElement)?.clear();
  //       elements.getElement(CardExpiryElement)?.clear();
  //       elements.getElement(CardCvcElement)?.clear();
  //     }

  //     // Save payment to backend
  //     const saveResponse = await dispatch(
  //       savePaymentData({
  //         boxId,
  //         paymentIntentId,
  //         boxName,
  //       })
  //     );

  //     const { code, data } = saveResponse?.payload?.resultData || {};

  //     if (code === 200) {
  //       dispatch(updateUserBoughtBoxes(data));
  //       setPaymentInfo({
  //         status: "success",
  //         loading: false,
  //         showModal: true,
  //         message: "Thank you for your payment",
  //       });
  //     } else {
  //       const errorMsg = "Payment succeeded, but saving failed.";

  //       setPaymentInfo({
  //         status: "error",
  //         loading: false,
  //         showModal: true,
  //         message: errorMsg,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     const errorMsg =
  //       error.message || "An unexpected error occurred. Please try again.";

  //     setPaymentInfo({
  //       status: "error",
  //       loading: false,
  //       showModal: true,
  //       message: errorMsg,
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || Object.keys(userDetails).length === 0) {
      dispatch(toggleLoginModal(true));
      return;
    }

    const useSavedCard = selectedCardId !== "new";
    const isCardValid =
      cardComplete.number && cardComplete.expiry && cardComplete.cvc;

    setPaymentInfo({
      status: "",
      loading: true,
      showModal: useSavedCard || isCardValid,
      message: "",
    });

    if (
      !useSavedCard &&
      (!isCardValid || Object.values(cardErrors).some(Boolean))
    ) {
      const newErrors = {
        ...(cardComplete.number ? {} : { number: "Card number is required" }),
        ...(cardComplete.expiry ? {} : { expiry: "Card expiry is required" }),
        ...(cardComplete.cvc ? {} : { cvc: "Card CVC is required" }),
      };
      setCardErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    if (!stripe || !elements) return;

    const amountInCents = boxPrice * 100;
    let paymentIntentId = null;

    try {
      if (useSavedCard) {
        const { payload } = await dispatch(
          chargeSavedCard({
            amount: amountInCents,
            paymentMethodId: selectedCardId,
          })
        );

        const { code, id, message } = payload?.resultData || {};

        if (code !== 200) {
          return setPaymentInfo({
            status: "error",
            loading: false,
            showModal: true,
            message: message || "Failed to charge saved card.",
          });
        }

        paymentIntentId = id;
      } else {
        const { payload } = await dispatch(
          createStripePayment({
            amount: amountInCents,
            savePermission,
          })
        );
        
        const stripeError = payload?.resultData?.msg?.raw;
        if (
          stripeError?.type === "invalid_request_error" &&
          stripeError?.code === "resource_missing" &&
          stripeError?.message?.includes("a similar object exists in test mode")
        ) {
          return setPaymentInfo({
            status: "error",
            loading: false,
            showModal: true,
            message:
              "It looks like you're using a test payment card. Please refresh and try with a real card.",
          });
        }

        const clientSecret = payload?.resultData?.clientSecret;
        if (!clientSecret) {
          return setPaymentInfo({
            status: "error",
            loading: false,
            showModal: true,
            message: "Client secret not found",
          });
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: username,
              email,
            },
          },
          receipt_email: email,
        });

        if (result.error) {
          const msg = result.error?.message || "Payment error occurred.";
          return setPaymentInfo({
            status: "error",
            loading: false,
            showModal: true,
            message: msg,
          });
        }

        if (result.paymentIntent?.status !== "succeeded") {
          return setPaymentInfo({
            status: "error",
            loading: false,
            showModal: true,
            message: "Payment did not succeed.",
          });
        }

        paymentIntentId = result.paymentIntent.id;

        // Clear card inputs
        elements.getElement(CardNumberElement)?.clear();
        elements.getElement(CardExpiryElement)?.clear();
        elements.getElement(CardCvcElement)?.clear();
      }

      // Save payment to backend
      const { payload: savePayload } = await dispatch(
        savePaymentData({ boxId, paymentIntentId, boxName })
      );

      const { code, data } = savePayload?.resultData || {};

      if (code === 200) {
        dispatch(updateUserBoughtBoxes(data));
        setPaymentInfo({
          status: "success",
          loading: false,
          showModal: true,
          message: "Thank you for your payment",
        });
      } else {
        setPaymentInfo({
          status: "error",
          loading: false,
          showModal: true,
          message: "Payment succeeded, but saving failed.",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentInfo({
        status: "error",
        loading: false,
        showModal: true,
        message:
          error.message || "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleDeleteSavesCard = (id) => {
    setCardErrors({ number: "", expiry: "", cvc: "" });
    setCardComplete({ number: false, expiry: false, cvc: false });
    const payload = {
      paymentMethodId: id,
    };
    dispatch(deleteUserSavedCards(payload))
      .then((res) => {
        const { code, msg } = res?.payload?.resultData || {};
        if (code === 200) {
          if (selectedCardId === id) {
            setSelectedCardId("new");
            setCardErrors({ number: "", expiry: "", cvc: "" });
            setCardComplete({ number: false, expiry: false, cvc: false });
          }
          dispatch(getUserSavedCards());
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "Something went wrong"
          );
          setShowModal(false);
        } else {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "Something went wrong"
          );
          setShowModal(false);
        }
      })
      .catch((error) => {
        const msg = error?.msg || "Something went wrong";
        showToastMessage(msg, "error", "Something went wrong");
        setShowModal(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between md:flex-row flex-col-reverse md:gap-2 gap-6 items-center border-primary border-b rounded-md  bg-[#a7f4344d] mb-4 px-2 py-4">
        <h2 className="text-[var(--main-text)] text-xl font-bold ">
          {t("PaymentPage.Choose Payment Method")}
        </h2>

        <div className="flex  ">
          {cardType.map((card) => (
            <img
              key={card.name}
              className="w-[40px] h-[30px] mx-1 rounded-md hover:scale-110 transition-all duration-200 cursor-pointer"
              src={
                card.name === "Visa"
                  ? visa
                  : card.name === "mastercard"
                  ? mastercard
                  : amex
              }
              alt={`${card.name} logo`}
            />
          ))}
        </div>
      </div>
      {savedCards.length > 0 && (
        <div className="mb-8">
          {savedCards.length > 0 &&
            savedCards?.map((card) => (
              <label
                key={card.id}
                className=" mb-2 flex items-center justify-between bg-[var(--card-bg)] p-3 rounded-md">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value={card.id}
                    checked={selectedCardId === card?.id}
                    onChange={() => setSelectedCardId(card.id)}
                  />
                  <span className="ml-2">
                    <img
                      className="w-[40px]"
                      src={`https://img.icons8.com/color/48/000000/${card?.card?.brand}.png`}
                      alt={`${card?.card?.brand} logo`}
                    />
                  </span>
                  <span className="ml-2 text-[var(--main-text)]">
                    {card?.card.brand.toUpperCase()} **** {card.card.last4} (exp{" "}
                    {card?.card.exp_month}/{card.card.exp_year})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                    setDeleteCardId(card.id);
                  }}>
                  <TrashIcon />
                </button>
              </label>
            ))}
          <label className=" bg-[var(--card-bg)] p-3 rounded-md flex items-center">
            <input
              type="radio"
              name="payment"
              value="new"
              checked={selectedCardId === "new"}
              onChange={() => setSelectedCardId("new")}
            />
            <span className="ml-2 font-medium text-[var(--main-text)] ">
              {t("PaymentPage.Use a new card")}
            </span>
          </label>
        </div>
      )}

      {selectedCardId === "new" && (
        <>
          <h2 className="text-lg font-bold mb-2 text-[var(--main-text)]">
            {t("PaymentPage.Enter your card details")}
          </h2>
          <div className="mb-4">
            <label className="generic-input-label">
              {t("PaymentPage.Card Number")}
            </label>
            <div
              className="p-3 rounded"
              style={{ background: "var(--card-bg)" }}>
              <CardNumberElement
                options={cardStyle}
                onChange={(e) => {
                  setCardErrors((prev) => ({
                    ...prev,
                    number: e.error?.message || "",
                  }));
                  setCardComplete((prev) => ({ ...prev, number: e.complete }));
                }}
              />
            </div>
            {cardErrors.number && (
              <p className="text-red-500 text-sm mt-1">{cardErrors.number}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            <div className="mb-4">
              <label className="generic-input-label">
                {t("PaymentPage.Expiry")}
              </label>
              <div
                className="p-3 rounded"
                style={{ background: "var(--card-bg)" }}>
                <CardExpiryElement
                  options={cardStyle}
                  onChange={(e) => {
                    setCardComplete((prev) => ({
                      ...prev,
                      expiry: e.complete,
                    }));
                    setCardErrors((prev) => ({
                      ...prev,
                      expiry: e.error?.message || "",
                    }));
                  }}
                />
              </div>
              {cardErrors.expiry && (
                <p className="text-red-500 text-sm mt-1">{cardErrors.expiry}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="generic-input-label">
                {t("PaymentPage.CVC")}
              </label>
              <div
                className="p-3 rounded"
                style={{ background: "var(--card-bg)" }}>
                <CardCvcElement
                  options={cardStyle}
                  onChange={(e) => {
                    setCardComplete((prev) => ({ ...prev, cvc: e.complete }));
                    setCardErrors((prev) => ({
                      ...prev,
                      cvc: e.error?.message || "",
                    }));
                  }}
                />
              </div>
              {cardErrors.cvc && (
                <p className="text-red-500 text-sm mt-1">{cardErrors?.cvc}</p>
              )}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={savePermission}
              onChange={(e) => setSavePermission(e.target.checked)}
            />
            <label className="generic-input-label">
              {t("PaymentPage.Save my payment details for future use")}
            </label>
          </div>
        </>
      )}
      <GeneralButton
        variant={"primary"}
        className={"md:w-[200px] w-full "}
        type="submit">
        {t("PaymentPage.Pay")} $ {boxPrice}
      </GeneralButton>

      <ConfirmationModal
        isLoading={isLoading.deleteCard}
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={() => handleDeleteSavesCard(deleteCardId)}
        type="delete"
      />
    </form>
  );
};

const StripeForm = ({ boxDetailsData, setPaymentInfo }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm
      boxDetailsData={boxDetailsData}
      setPaymentInfo={setPaymentInfo}
    />
  </Elements>
);

export default StripeForm;
