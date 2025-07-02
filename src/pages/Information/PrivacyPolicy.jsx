import { useTranslation } from "react-i18next";
import Layout from "../../components/Layout/Layout";
import "./Information.css";
import PrivacyENG from "./privacyData/PrivacyENG";
import PrivacyEST from "./privacyData/PrivacyEST";
import PrivacyRUS from "./privacyData/PrivacyRUS";

const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page">
        {i18n.language === "en" ? (
          <PrivacyENG />
        ) : i18n.language === "est" ? (
          <PrivacyEST />
        ) : (
          <PrivacyRUS />
        )}
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
