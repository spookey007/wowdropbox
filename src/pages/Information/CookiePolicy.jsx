import { useTranslation } from "react-i18next";
import Layout from "../../components/Layout/Layout";
import CookieEng from "./cookieData/CookieEng";
import CookieEST from "./cookieData/CookieEST";
import "./Information.css";
import CookieRus from "./cookieData/CookieRus";

const CookiePolicy = () => {
  const { t, i18n } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page">
        {i18n.language === "en" ? (
          <CookieEng />
        ) : i18n.language === "est" ? (
          <CookieEST />
        ) : (
          <CookieRus />
        )}
      </div>
    </Layout>
  );
};

export default CookiePolicy;
