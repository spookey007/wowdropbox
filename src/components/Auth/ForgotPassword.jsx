import React from "react";
import GenericInput from "../Generic/GenericInput/GenericInput";
import GeneralButton from "../Generic/GeneralButton";
import { Form, Formik } from "formik";
import { forgotPasswordValidationSchema } from "./AuthValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { userForGetPassWord } from "./../../reducers/authSlice/authReducer";
import { showToastMessage } from "./../../services/toastService";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const ForgotPassword = ({ forgotPassword }) => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.auth);
  const { isLoading } = result || {};

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleForgetPassword = (data, resetForm, setSubmitting) => {
    const payload = {
      value: data.email,
    };
    setSubmitting(true);
    dispatch(userForGetPassWord(payload))
      .then((response) => {
        const { code, msg } = response?.payload?.resultData || {};
        if (code === 200) {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "loginSuccess"
          );
          forgotPassword(false);
          resetForm();
          setSubmitting(false);
        } else {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "loginError"
          );
          forgotPassword(false);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        const msg =
          error?.msg ||
          "Login failed ~ Не удалось войти в систему ~ Sisselogimine ebaõnnestus";
        showToastMessage(
          translateDynamicContent(msg, currentLanguage),
          "error",
          "loginError"
        );
        setSubmitting(false);
      });
  };

  return (
    <div className="forgot-password">
      <p>
        {t(
          "auth.Enter your account's email and we'll send you a link to reset your password."
        )}
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleForgetPassword(values, resetForm, setSubmitting)
        }
        enableReinitialize={true}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form class="space-y-4 md:space-y-6" autoComplete="off">
            <GenericInput
              placeholder={t("auth.Enter email")}
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />

            <GeneralButton
              variant={"primary"}
              className={"w-full"}
              type="submit"
              disabled={
                errors.email || !values.email || isLoading || isSubmitting
              }>
              {t("auth.Send reset link")}
            </GeneralButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
