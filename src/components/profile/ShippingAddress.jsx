import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { showToastMessage } from "../../services/toastService";

import GenericInput from "../Generic/GenericInput/GenericInput";
import GeneralButton from "../Generic/GeneralButton";
import Dropdown from "../Generic/Dropdowns/Dropdown";
import { shippingAddressValidationSchema } from "./ProfileValidation";
import { shippingAddressFields } from "./ProfileFields";
import {
  editAddress,
  getUserDetails,
  updateAddress,
} from "../../reducers/userSlice/userReducer";
import { useTranslation } from "react-i18next";
import { CountryData } from "../../utils/CountryData";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const ShippingAddress = ({
  selectedAddress,
  setShowAddressForm,
  isBillingAddress,
  checkoutPage = false,
  formikRef,
  exitAddressModal = () => {},
  shippingModal = false,
}) => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.user);

  const { isLoading } = result || {};
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const initialValues = shippingAddressFields.reduce((acc, field) => {
    acc[field.name] = selectedAddress?.[field.name] || "";
    return acc;
  }, {});

  const [countries] = useState(
    CountryData.map((item) => ({ label: item.country, value: item.country }))
  );
  const [states, setStates] = useState([]);

  const handleUpdateForm = async (values, formReset, setSubmitting) => {
    const action = selectedAddress ? editAddress : updateAddress;
    const payload = selectedAddress
      ? { ...values, _id: selectedAddress._id }
      : values;

    setSubmitting(true);
    await dispatch(action(payload)).then((res) => {
      const { code, msg } = res?.payload?.resultData || {};
      if (code === 200) {
        showToastMessage(
          translateDynamicContent(msg, currentLanguage),
          "success",
          "Shipping address updated successfully"
        );
        formReset();
        exitAddressModal(false);
        dispatch(getUserDetails());
        setSubmitting(false);
        if (!shippingModal) setShowAddressForm(false);
      } else {
        showToastMessage(msg, "error", "Shipping address update failed");
        setSubmitting(false);
      }
    });
  };

  useEffect(() => {
    if (selectedAddress?.country) {
      const countryEntry = CountryData.find(
        (item) => item.country === selectedAddress.country
      );
      if (countryEntry) {
        const mappedStates = countryEntry.states.map((state) => ({
          label: state.name,
          value: state.name,
        }));
        setStates(mappedStates);
      }
    }
  }, [selectedAddress]);

  return (
    <div className={`personal-info ${checkoutPage ? "mb-8" : ""}`}>
      <p>{t("profile.Fill in your details")}</p>
      <Formik
        innerRef={checkoutPage ? formikRef : null}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={shippingAddressValidationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleUpdateForm(values, resetForm, setSubmitting)
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <div className="grid grid-cols-2 mt-2 gap-3">
              {shippingAddressFields.map((item, index) =>
                item.type !== "select" ? (
                  item.name !== "countryCode" && (
                    <GenericInput
                      prefixText={item.name === "mobile" && values.countryCode}
                      key={index}
                      placeholder={
                        item.name === "mobile"
                          ? item.placeholder
                          : t(`profile.${item.placeholder}`)
                      }
                      type={item.type}
                      name={item.name}
                      id={item.id}
                      height="h-[56px]"
                      touched={touched[item.id]}
                      value={values[item.id]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={item.name === "mobile" && !values.country}
                      error={touched[item.id] && errors[item.id]}
                    />
                  )
                ) : (
                  <div className="w-100" key={item.id}>
                    <Dropdown
                      type="form"
                      options={
                        item.name === "country"
                          ? countries
                          : item.name === "state"
                          ? states
                          : []
                      }
                      label={t(`profile.${item.name}`)}
                      disabled={item.name === "state" && !values.country}
                      onSelect={(option) => {
                        setFieldValue(item.name, option.label);
                        if (item.name === "country") {
                          const selected = CountryData.find(
                            (c) => c.country === option.label
                          );
                          const stateOptions =
                            selected?.states?.map((s) => ({
                              label: s.name,
                              value: s.name,
                            })) || [];
                          setStates(stateOptions);
                          setFieldValue("state", "");
                          const code = selected?.phoneCode || "";
                          setFieldValue("countryCode", code);
                        }
                      }}
                      selectedValue={
                        item.name === "state"
                          ? states.find((s) => s.label === values.state)
                              ?.label || ""
                          : values[item.name]
                      }
                    />
                    {errors[item.name] && touched[item.name] && (
                      <div className="text-red-500 text-xs">
                        {t(`Validation.${errors[item.name]}`)}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
            {!checkoutPage && (
              <GeneralButton
                type="submit"
                variant="primary"
                className={`mt-4 md:w-[200px] w-full ${
                  isBillingAddress ? "md:w-full" : "md:w-[200px] "
                } `}
                isLoading={isSubmitting || isLoading.updateAddress}
              >
                {selectedAddress
                  ? t("profile.Update address")
                  : t("profile.Add address")}
              </GeneralButton>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShippingAddress;
