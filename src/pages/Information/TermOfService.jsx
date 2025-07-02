import "./Information.css";
import Layout from "../../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import TermsOfUseEN from "./TOSData/TermsENG";
import TermsOfUseET from "./TOSData/TermEST";
import TermsOfUseRU from "./TOSData/TermsRUS";

const TermOfService = () => {
  const { i18n } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page">
        {i18n.language === "en" ? (
          <TermsOfUseEN />
        ) : i18n.language === "est" ? (
          <TermsOfUseET />
        ) : (
          <TermsOfUseRU />
        )}
      </div>
    </Layout>
  );
};

export default TermOfService;
