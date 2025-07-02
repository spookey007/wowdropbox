import { Form, Formik } from "formik";
import Dropdown from "../../Generic/Dropdowns/Dropdown";
import GenericInput from "../../Generic/GenericInput/GenericInput";
import GeneralButton from "../../Generic/GeneralButton";
import { OrderReturnFormFields } from "./ReturnFormFields";
import { returnOrderValidation } from "./returnOrderFormValiadion";
import {
  returnOrderReasonsEn,
  returnOrderReasonsEst,
  returnOrderReasonsRu,
} from "../../../utils/StaticData";
import { formatDate } from "./../../../utils/useFunc";
import { useDispatch, useSelector } from "react-redux";
import { createOrderReturnRequest } from "../../../reducers/orderSlice/orderReducer";
import { toggleLoginModal } from "../../../reducers/commonSlice/commonReducer";
import { showToastMessage } from "../../../services/toastService";
import { updateOrderStatusByReturnRequest } from "../../../reducers/checkOutSlice/checkOutReducer";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../../utils/translateDynamicContent";

const ReturnOrderForm = ({ singleOrderDetails, setShowOrderDetails }) => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.user);
  const { t } = useTranslation();
  const { userDetails } = result || {};

  const token = localStorage.getItem("luckyBox#@user");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const orderReturnResons =
    currentLanguage === "en"
      ? returnOrderReasonsEn
      : currentLanguage === "ru"
      ? returnOrderReasonsRu
      : returnOrderReasonsEst;

  const handleSubmitReturnRequest = (values, resetForm, setSubmitting) => {
    if (Object.keys(userDetails).length <= 0 || !token) {
      dispatch(toggleLoginModal(true));
      return;
    }

    if (values?.quantity <= 0) {
      setSubmitting(false);
      const msg =
        "Quantity can not be less than 1 ~ Количество не может быть меньше 1 ~ Kogus ei tohi olla väiksem kui 1";
      return showToastMessage(
        translateDynamicContent(msg, currentLanguage),
        "error",
        "returnOrderError"
      );
    }

    if (values?.quantity > singleOrderDetails?.quantity) {
      setSubmitting(false);
      const msg =
        "Quantity can not be greater than ordered quantity ~ Количество не может превышать заказанное количество ~ Kogus ei tohi olla suurem kui tellitud kogus";
      return showToastMessage(
        translateDynamicContent(msg, currentLanguage),
        "error",
        "returnOrderError"
      );
    }

    const updatePayLoad = {
      orderId: singleOrderDetails?._id,
      status: `${values?.quantity}-return-request`,
    };

    const formData = new FormData();
    formData.append("orderId", singleOrderDetails?._id);
    formData.append("reason", values?.reason);
    formData.append("message", values?.message);
    formData.append("attachment", values?.attachment);
    formData.append("quantity", values?.quantity);
    setSubmitting(true);
    dispatch(createOrderReturnRequest(formData))
      .then((res) => {
        const { code, msg } = res?.payload?.resultData || {};
        if (code === 200) {
          resetForm();
          dispatch(updateOrderStatusByReturnRequest(updatePayLoad));
          setSubmitting(false);
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "returnOrderSuccess"
          );
          setShowOrderDetails(false);
        } else {
          setSubmitting(false);
          showToastMessage(msg, "error", "returnOrderError");
          setShowOrderDetails(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setSubmitting(false);
        setShowOrderDetails(false);
      });
  };

  return (
    <div className="md:max-h-[600px] max-h-[500px] overflow-y-scroll hide-scrollbar">
      <div className="w-full flex flex-col md:flex-row gap-6 border-b-[1px]  border-[var(--secondary-text)] pb-4">
        <img
          className="w-[100px] h-[100px] object-cover rounded"
          src={singleOrderDetails?.productId?.bannerImage}
          alt="Product Image"
        />

        <div className="product-info space-y-2">
          <h1 className="text-2xl text-[var(--main-text)] font-bold">
            {singleOrderDetails?.productId?.name}
          </h1>

          <p className="text-[var(--secondary-text)]">
            {t("Orders.Order ID")} : #{singleOrderDetails?.orderId?.orderid}{" "}
          </p>
          <p className="text-[var(--secondary-text)]">
            {t("Orders.Date of purchase")} :{" "}
            {formatDate(singleOrderDetails?.createdAt)}
          </p>
        </div>
      </div>

      <Formik
        initialValues={{
          reason: "",
          message: "",
          attachment: "",
          quantity: 0,
        }}
        validationSchema={returnOrderValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmitReturnRequest(values, resetForm, setSubmitting);
        }}>
        {({
          values,
          setFieldValue,
          validateField,
          setFieldTouched,
          handleBlur,
          handleChange,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form className="space-y-2 mt-6">
            {OrderReturnFormFields.map((field) => {
              if (field.type === "select") {
                return (
                  <div>
                    <Dropdown
                      type="form"
                      key={field.name}
                      label={t(`Orders.${field.label}`)}
                      selectedValue={values[field.name]}
                      options={orderReturnResons}
                      onSelect={(val) => setFieldValue(field.name, val.label)}
                    />
                    {errors[field.name] && touched[field.name] && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              } else if (field.type === "file") {
                return (
                  <div key={field.name} className="flex flex-col">
                    <label className="generic-input-label">{`${t(
                      `Orders.${field.label}`
                    )}`}</label>
                    <div className="relative bg-[--card-bg] w-[400px] h-[56px] rounded-md">
                      <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[--secondary-text] text-sm font-semibold">
                        {values[field.name]
                          ? values[field.name].name
                          : t("Orders.Add a file")}
                      </h2>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        name={field.name}
                        onChange={(e) => {
                          setFieldValue(field.name, e.target.files[0]);
                          setFieldTouched(field.name, true, false);
                          validateField(field.name);
                        }}
                      />
                    </div>
                    {errors[field.name] && touched[field.name] && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              } else {
                return (
                  <GenericInput
                    isTextarea={field.type === "textarea"}
                    key={field.name}
                    label={t(`Orders.${field.label}`)}
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    placeholder={t(`Orders.${field.placeholder}`)}
                    value={values[field.name]}
                    onBlur={handleBlur}
                    required={field.required}
                    onChange={handleChange}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                  />
                );
              }
            })}
            {console.log("isSubmitting", isSubmitting)}
            <GeneralButton
              isLoading={isSubmitting}
              variant="primary"
              type="submit"
              className={"w-full"}>
              {t("Orders.Submit return request")}
            </GeneralButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReturnOrderForm;
