import { useTranslation } from "react-i18next";
import Layout from "../../components/Layout/Layout";
import "./Information.css";
import ReturnPolicyEN from "./ReturnData/ReturnEng";
import ReturnPolicyEST from "./ReturnData/ReturnEST";
import ReturnPolicyRU from "./ReturnData/ReturnRUS";

const ReturnPolicy = () => {
  const { i18n } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page">
        {i18n.language === "en" ? (
          <ReturnPolicyEN />
        ) : i18n.language === "est" ? (
          <ReturnPolicyEST />
        ) : (
          <ReturnPolicyRU />
        )}
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
