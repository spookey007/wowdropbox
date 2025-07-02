import React, { useState } from "react";
import GenericInput from "../Generic/GenericInput/GenericInput";
import "./Auth.css";
import { loginFormFields, registerFormFields } from "./AuthFields";
import GeneralButton from "../Generic/GeneralButton";
import AuthBanner from "../../assets/Auth/auth-banner.webp";
import { CloseIcon } from "../../utils/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";

import {
  loginValidationSchema,
  registerValidationSchema,
} from "./AuthValidationSchema";
import { toggleLoginModal } from "../../reducers/commonSlice/commonReducer";
import { showToastMessage } from "../../services/toastService";
import { userLogin, userRegister } from "../../reducers/authSlice/authReducer";
import { getUserDetails } from "../../reducers/userSlice/userReducer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { socket } from "../../config/socket";
import { translateDynamicContent } from "./../../utils/translateDynamicContent";

const Auth = ({ showForgot }) => {
  const [isLogin, setIsLogin] = useState(true);
  const result = useSelector((state) => state.auth);
  const [check, setCheck] = useState(false);
  const { isLoading } = result || {};
  const dispatch = useDispatch();

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const registerInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleForgotPasswordToggle = () => {
    dispatch(toggleLoginModal(false));
    showForgot(true);
  };

  const currentFields = isLogin ? loginFormFields : registerFormFields;

  const handleSubmit = (data, forReset, setSubmitting, isLogin) => {
    if (isLogin) {
      setSubmitting(true);
      dispatch(userLogin(data))
        .then((response) => {
          const { code, msg, token } = response?.payload?.resultData || {};
          if (code === 200) {
            showToastMessage(
              translateDynamicContent(msg, currentLanguage),
              "success",
              "loginSuccess"
            );
            localStorage.setItem("luckyBox#@user", token);
            dispatch(getUserDetails());
            socket.emit("join", token);
            dispatch(toggleLoginModal(false));
            setSubmitting(false);
            forReset();
          } else if (code === 401) {
            showToastMessage(
              translateDynamicContent(msg, currentLanguage),
              "error",
              "loginError"
            );
            setSubmitting(false);
          } else {
            showToastMessage(
              translateDynamicContent(msg, currentLanguage),
              "error",
              "loginError"
            );
            setSubmitting(false);
          }
        })
        .catch((error) => {
          const msg =
            error?.msg ||
            "Login failed ~ Не удалось войти в систему ~ Sisselogimine ebaõnnestu";
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "loginError"
          );
          setSubmitting(false);
        });
    } else {
      setSubmitting(true);
      dispatch(userRegister(data))
        .then((response) => {
          if (response?.payload?.resultData?.code === 200) {
            const msg =
              response?.payload?.resultData?.msg || "Registration successful";
            showToastMessage(
              translateDynamicContent(msg, currentLanguage),
              "success",
              "register"
            );
            setSubmitting(false);
            forReset();
            dispatch(toggleLoginModal(false));
          } else {
            const msg =
              response?.payload?.resultData?.msg ||
              "Registration failed ~ Регистрация не удалась ~ Registreerimine ebaõnnestus";
            showToastMessage(
              translateDynamicContent(msg, currentLanguage),
              "error",
              "register"
            );
            setSubmitting(false);
          }
        })
        .catch((error) => {
          const msg =
            error?.msg ||
            "Registration failed ~ Регистрация не удалась ~ Registreerimine ebaõnnestus";
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "register"
          );
          setSubmitting(false);
        });
    }
  };

  // Login with google

  const handleLoginWithGoogle = () => {
    window.location.href = "https://api.wowdropbox.eu/api/auth/google";
  };

  return (
    <div className="flex">
      <div className="auth-form-container flex flex-col gap-2 md:w-1/2 w-full">
        <h2 className="auth-title">
          {isLogin ? t("auth.Login") : t("auth.Create an account")}
        </h2>

        <div className="auth-mobile-cross">
          <GeneralButton
            variant="icon"
            className="absolute top-2 right-2"
            onClick={() => dispatch(toggleLoginModal(false))}
          >
            <CloseIcon />
          </GeneralButton>
        </div>

        <Formik
          initialValues={isLogin ? loginInitialValues : registerInitialValues}
          validationSchema={
            isLogin ? loginValidationSchema : registerValidationSchema
          }
          onSubmit={(values, { resetForm, setSubmitting }) => {
            handleSubmit(values, resetForm, setSubmitting, isLogin);
          }}
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
            <Form className="space-y-4 md:space-y-6" autoComplete="off">
              <>
                {currentFields.map((field) => (
                  <div key={field.id}>
                    <GenericInput
                      showPasswordToggle={field.type === "password"}
                      label={`auth.${field.label}`}
                      type={field.type}
                      name={field.name}
                      id={field.id}
                      placeholder={`auth.${field.placeholder}`}
                      value={values[field.id]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors[field.id]}
                      touched={touched[field.id]}
                    />
                  </div>
                ))}

                {isLogin && (
                  <button
                    type="button"
                    className="auth-forgot-password"
                    onClick={handleForgotPasswordToggle}
                  >
                    {t("auth.Forgot password?")}
                  </button>
                )}

                {!isLogin && (
                  <div class="flex items-end  gap-2 ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={check}
                      onChange={(e) => setCheck(e.target.checked)}
                      className="w-5 h-5 text-[var(--primary-color)] bg-[transparent] border border-[#A3A3B7] rounded-sm checked:bg-[var(--primary-color)] checked:border-[var(--primary-color)] appearance-none cursor-pointer"
                    />
                    <label for="default-checkbox" className="auth-terms-text">
                      {t("auth.I agree to the")}{" "}
                      <Link to={"/terms-of-service"} target="_blank">
                        {t("auth.Terms and condition")}
                      </Link>{" "}
                      and{" "}
                      <Link to={"/provably-fair"} target="_blank">
                        {t("auth.Provably Fair")}
                      </Link>
                      .
                    </label>
                  </div>
                )}

                <GeneralButton
                  variant="primary"
                  className={"mt-4 w-full"}
                  isLoading={isSubmitting}
                  disabled={
                    (!isLogin && !check) ||
                    isLoading ||
                    isSubmitting ||
                    Object.keys(errors).length > 0
                  }
                  type="submit"
                >
                  {isLogin ? t("auth.Login") : t("auth.Sign up")}
                </GeneralButton>
              </>
            </Form>
          )}
        </Formik>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <h2>{t("auth.Or continue with")}</h2>
          <div className="auth-divider-line" />
        </div>

        <GeneralButton
          variant="secondary"
          className="w-full"
          onClick={handleLoginWithGoogle}
        >
          {t("auth.Sign up with Google")}
        </GeneralButton>

        <p className="auth-toggle-text">
          {isLogin
            ? t("auth.Don't have an account?")
            : t("auth.Already have an account?")}
          <span onClick={handleToggle}>
            {isLogin ? t("auth.Create an account") : t("auth.Login")}
          </span>
        </p>
      </div>

      <div className="auth-banner-container w-1/2 md:block hidden relative">
        <img src={AuthBanner} alt="auth" className="auth-banner" />
        <GeneralButton
          variant="icon"
          className="absolute top-2 right-2"
          onClick={() => dispatch(toggleLoginModal(false))}
        >
          <CloseIcon />
        </GeneralButton>
      </div>
    </div>
  );
};

export default Auth;
