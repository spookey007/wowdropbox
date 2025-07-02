import React from "react";
import FeedbackForm from "../../components/Feedback/FeedbackForm";
import Layout from "../../components/Layout/Layout";
import BackButton from "../../components/Generic/BackButton/BackButton";
import { useTranslation } from "react-i18next";

const Feedback = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding">
        <h2 className="text-[var(--main-text)] text-2xl font-bold ">
          <BackButton pageTitle={t("headings.Feedback")} />
        </h2>
        <FeedbackForm />
      </div>
    </Layout>
  );
};

export default Feedback;
