import React from "react";
import GenericInput from "../Generic/GenericInput/GenericInput";
import GeneralButton from "../Generic/GeneralButton";
import { resetPasswordFields } from "./AuthFields";
import { resetPasswordValidationSchema } from "./AuthValidationSchema";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userResetPassword } from "../../reducers/authSlice/authReducer";
import { showToastMessage } from "../../services/toastService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const ResetPassword = ({ closeResetPassword, token }) => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.auth);
  const { isLoading } = result || {};
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const handleSubmitForgetPassword = (values, resetForm, setSubmitting) => {
    setSubmitting(true);
    const payload = {
      password: values.password,
      token: token,
    };
    dispatch(userResetPassword(payload))
      .then((response) => {
        const { code, msg } = response?.payload?.resultData || {};
        if (code === 200) {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "loginSuccess"
          );
          closeResetPassword(false);
          resetForm();
          navigate("/");
          setSubmitting(false);
        } else {
          closeResetPassword(false);
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "loginError"
          );
          navigate("/");
          setSubmitting(false);
        }
      })
      .catch((error) => {
        const msg = error?.msg || "Login failed";
        showToastMessage(
          translateDynamicContent(msg, currentLanguage),
          "error",
          "loginError"
        );
        closeResetPassword(false);
        setSubmitting(false);
        navigate("/");
      });
  };
  const { t } = useTranslation();
  return (
    <div className="forgot-password">
      <p> {t("auth.Enter a new password to secure your account")}</p>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmitForgetPassword(values, resetForm, setSubmitting)
        }
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form class="space-y-4 md:space-y-6" autoComplete="off">
            {resetPasswordFields.map((field) => (
              <GenericInput
                key={field.id}
                placeholder={t(`auth.${field.placeholder}`)}
                type={field.type}
                name={field.name}
                id={field.name}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors[field.name]}
                touched={touched[field.name]}
                showPasswordToggle={true}
              />
            ))}
            <GeneralButton
              variant={"primary"}
              className={"w-full"}
              type="submit"
              disabled={
                isLoading ||
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                Object.keys(touched).length === 0
              }
            >
              {t("auth.Reset password")}
            </GeneralButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
