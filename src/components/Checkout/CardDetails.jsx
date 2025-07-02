import { Form, Formik } from "formik";
import React from "react";
import { cardDetailsValidationSchema } from "./CheckoutFormValidation";
import GenericInput from "../Generic/GenericInput/GenericInput";
import { CardDetailsFormFields } from "./CheckoutFormFields";

import { useTranslation } from "react-i18next";

const CardDetails = () => {
  // Defined initial values based on field definitions
  const initialValues = CardDetailsFormFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const { t } = useTranslation();

  return (
    <div className="mt-12">
      <h2 className="shipping-address-title">
        {t("checkout.Payment information")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={cardDetailsValidationSchema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form>
            <div className="grid gap-4">
              {CardDetailsFormFields.slice(0, 2).map((field) => (
                <GenericInput
                  key={field.name}
                  height="h-[56px]"
                  label={`checkout.${field.label}`}
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  placeholder={`checkout.${field.placeholder}`}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched[field.name]}
                  error={touched[field.name] && errors[field.name]}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {CardDetailsFormFields.slice(2).map((field) => (
                <GenericInput
                  key={field.name}
                  height="h-[56px]"
                  label={`checkout.${field.label}`}
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  placeholder={`checkout.${field.placeholder}`}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched[field.name]}
                  error={touched[field.name] && errors[field.name]}
                />
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardDetails;
