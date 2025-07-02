import { Form, Formik } from "formik";
import { FeedbackFormFields } from "./FeedbackFormFields";
import GenericInput from "../Generic/GenericInput/GenericInput";
import Dropdown from "../Generic/Dropdowns/Dropdown";
import GeneralButton from "../Generic/GeneralButton";
import { feedbackValidationSchema } from "./FeedbackFormValidation";
import { createFeedback } from "../../reducers/feedBackSlice/feedbackReducer";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../services/toastService";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const FeedbackForm = () => {
  const initialValues = {
    name: "",
    email: "",
    inquiryType: "",
    message: "",
    attachment: "",
  };
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const handleSubmitFeedback = (values, formReset, setSubmitting) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("inquiryType", values.inquiryType);
    formData.append("message", values.message);
    formData.append("attachment", values.attachment);
    dispatch(createFeedback(formData))
      .then((response) => {
        const { code, msg } = response?.payload?.resultData || {};
        if (code === 200) {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "loginSuccess"
          );
          setSubmitting(false);
          formReset();
        } else {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "error",
            "loginError"
          );
          setSubmitting(false);
          formReset();
        }
      })
      .catch((error) => {
        const msg =
          error?.msg ||
          "Login failed ~ Ошибка входа ~ Sisselogimine ebaõnnestus";
        showToastMessage(
          translateDynamicContent(msg, currentLanguage),
          "error",
          "loginError"
        );
        setSubmitting(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div className="mt-8">
      <Formik
        validationSchema={feedbackValidationSchema}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setSubmitting }) =>
          handleSubmitFeedback(values, resetForm, setSubmitting)
        }>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          validateField,
          isSubmitting,
        }) => (
          <Form className="flex flex-col gap-3">
            {FeedbackFormFields.map((field) =>
              field.type !== "select" && field.type !== "file" ? (
                <GenericInput
                  isTextarea={field.type === "textarea"}
                  placeholder={t(`Feedback.${field.placeholder}`)}
                  id={field.id}
                  key={field.id}
                  label={t(`Feedback.${field.label}`)}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={field.type}
                  required={field.required}
                  height="h-[56px]"
                  error={errors[field.name]}
                  touched={touched[field.name]}
                />
              ) : field.type === "select" && field.type !== "file" ? (
                <div>
                  <label className="generic-input-label">
                    {t(`Feedback.${field.label}`)}{" "}
                  </label>
                  <Dropdown
                    type="form"
                    label={t("Feedback.Inquiry type")}
                    options={[
                      { label: t("Feedback.Question") },
                      { label: t("Feedback.Complaint") },
                      { label: t("Feedback.Feedback") },
                    ]}
                    onSelect={(val) => {
                      setFieldValue(field.name, val.label);
                    }}
                    selectedValue={values[field.name]}
                  />
                  {errors[field.name] && touched[field.name] && (
                    <p className="text-sm text-red-500 mt-1">
                      {t(`Validation.${errors[field.name]}`)}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col">
                  <label className="generic-input-label">
                    {t(`Feedback.${field.label}`)}
                  </label>

                  <div className="relative bg-[--card-bg] max-w-[400px] w-100 h-[56px] rounded-md">
                    <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[--secondary-text] text-sm font-semibold">
                      {values[field.name]
                        ? values[field.name].name
                        : t("Feedback.Add an attachment")}
                    </h2>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
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
              )
            )}
            <GeneralButton
              type="submit"
              variant={"primary"}
              className={"max-w-[500px] w-full mx-auto mt-2"}
              isLoading={isSubmitting}>
              {t("Feedback.Submit feedback")}
            </GeneralButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedbackForm;
