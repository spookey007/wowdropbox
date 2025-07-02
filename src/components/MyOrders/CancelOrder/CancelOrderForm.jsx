import { Form, Formik } from "formik";
import GenericInput from "../../Generic/GenericInput/GenericInput";
import GeneralButton from "../../Generic/GeneralButton";
import { cancelOrderValidation } from "./cancelOrderFormValiadion";
import { orderCancelByUser } from "../../../reducers/orderSlice/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../../../services/toastService";
import { updateOrderStatus } from "../../../reducers/checkOutSlice/checkOutReducer";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../../utils/translateDynamicContent";

const CancelOrderForm = ({ singleOrderDetails, setShowOrderDetails }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const orderCancelFormFields = [
    {
      id: "reason",
      label: t("Orders.Reason for cancellation"),
      placeholder: t("Orders.Enter reason for cancellation"),
      name: "reason",
      type: "textarea",
      required: true,
    },
  ];

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.order);

  const handleSubmitCancelOrder = (values, resetForm, setSubmitting) => {
    const payload = {
      orderId: singleOrderDetails?._id,
      reason: values.reason,
    };
    const updatePayLoad = {
      orderId: singleOrderDetails?._id,
      status: "cancel",
    };
    setSubmitting(true);
    dispatch(orderCancelByUser(payload))
      .then((res) => {
        if (res?.payload?.resultData?.code === 200) {
          resetForm();
          dispatch(updateOrderStatus(updatePayLoad));
          setSubmitting(false);
          showToastMessage(
            translateDynamicContent(
              res?.payload?.resultData?.message,
              currentLanguage
            ),
            "success",
            "cancelOrderSuccess"
          );
        } else {
          showToastMessage(
            res?.payload?.resultData?.message,
            "error",
            "cancelOrderError"
          );
        }

        setShowOrderDetails(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="max-h-[500px] overflow-y-scroll hide-scrollbar">
      <div className="w-full flex flex-col md:flex-row gap-6 border-b-[1px]  border-[var(--secondary-text)] pb-4">
        <img
          className="w-[150px] h-[150px] object-cover rounded"
          src={singleOrderDetails?.productId?.bannerImage}
          alt="product-image"
        />

        <div className="product-info space-y-3">
          <h1 className="text-2xl text-[var(--main-text)] font-bold">
            {singleOrderDetails?.productId?.name}
          </h1>

          <p className="text-[var(--secondary-text)]">
            Order Id : #{singleOrderDetails?.orderId?.orderid}{" "}
          </p>
          <p className="text-[var(--secondary-text)]">
            Item Price : ${singleOrderDetails?.price}
          </p>
        </div>
      </div>

      <Formik
        initialValues={{
          reason: "",
        }}
        validationSchema={cancelOrderValidation}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          handleSubmitCancelOrder(values, resetForm, setSubmitting);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form className="space-y-4 mt-6">
            {orderCancelFormFields.map((field) => {
              return (
                <GenericInput
                  isTextarea={field.type === "textarea"}
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={values[field.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors[field.id]}
                  touched={touched[field.id]}
                />
              );
            })}
            <GeneralButton
              disabled={isSubmitting || isLoading.cancelOrder}
              loading={isSubmitting || isLoading.cancelOrder}
              variant="primary"
              type="submit"
              className={"w-full"}>
              {t("Orders.Submit Cancel")}
            </GeneralButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CancelOrderForm;
