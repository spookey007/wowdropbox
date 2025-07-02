import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

import { personalInfoFields } from "./ProfileFields";
import GeneralButton from "../Generic/GeneralButton";
import GenericInput from "../Generic/GenericInput/GenericInput";
import { personalInfoValidationSchema } from "./ProfileValidation";
import {
  getUserDetails,
  updateUserDetails,
} from "../../reducers/userSlice/userReducer";
import { showToastMessage } from "../../services/toastService";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const PersonalInfo = ({ userDetails }) => {
  // Setting initial Value to the form
  const initialValues = personalInfoFields.reduce((acc, field) => {
    acc[field.name] = userDetails?.[field.name] || "";
    return acc;
  }, {});

  const dispatch = useDispatch();

  const result = useSelector((state) => state.user);
  const { isLoading } = result || {};

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  //Updating user details
  const handleUpdateDetails = (values, setSubmitting) => {
    setSubmitting(true);
    dispatch(updateUserDetails(values))
      .then((res) => {
        const { code, msg } = res?.payload?.resultData || {};
        if (code === 200) {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "User details updated successfully"
          );
          setSubmitting(false);
          dispatch(getUserDetails());
        } else {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "User details update failed"
          );
          setSubmitting(false);
        }
      })
      .catch((error) => {
        const msg =
          error?.msg ||
          "User details update failed ~ Не удалось обновить данные пользователя ~ Kasutaja andmete uuendamine ebaõnnestus";
        showToastMessage(
          translateDynamicContent(msg, currentLanguage),
          "error",
          "User details update failed"
        );
        setSubmitting(false);
      });
  };

  return (
    <div className="personal-info">
      <div className="flex-col flex gap-1 mb-4">
        <h2>{t("profile.Personal Information")}</h2>
        <p>{t("profile.Enter your personal information")}</p>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={personalInfoValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdateDetails(values, setSubmitting);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form>
            {personalInfoFields.slice(0, 1).map((item, index) => (
              <GenericInput
                disabled={true}
                key={index}
                placeholder={`profile.${item.placeholder}`}
                type={item.type}
                name={item.name}
                id={item.id}
                height="h-[56px]"
                value={values[item.id]}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched[item.id]}
                error={touched[item.id] && errors[item.id]}
              />
            ))}

            <div className="grid grid-cols-2 mt-3 gap-3">
              {personalInfoFields.slice(1, 5).map((item) => (
                <GenericInput
                  key={item.id}
                  placeholder={`profile.${item.placeholder}`}
                  type={item.type}
                  name={item.name}
                  id={item.id}
                  height="h-[56px]"
                  value={values[item.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched[item.id]}
                  error={touched[item.id] && errors[item.id]}
                />
              ))}
            </div>

            <GeneralButton
              variant="primary"
              className="mt-4 md:w-[133px] w-full "
              type="submit"
              isLoading={isSubmitting}
              disabled={isLoading.updateUser || isSubmitting}>
              {t("profile.Update")}
            </GeneralButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfo;
