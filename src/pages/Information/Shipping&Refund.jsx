import { useTranslation } from "react-i18next";
import Layout from "../../components/Layout/Layout";
import "./Information.css";
import BackButton from "../../components/Generic/BackButton/BackButton";

const ShippingRefund = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page">
        <BackButton pageTitle={t("S&R.heading")} />
        <h2>{t("S&R.h1")}</h2>

        <p>{t("S&R.p1")}</p>

        <h2>{t("S&R.deliveryTerms.h1")}</h2>

        <p>{t("S&R.deliveryTerms.p1")}</p>

        <h2>{t("S&R.shippingTimelines.h1")}</h2>

        <p>{t("S&R.shippingTimelines.p1")}</p>

        <h2>{t("S&R.customs.h1")}</h2>

        <p>{t("S&R.customs.p1")}</p>

        <h2>{t("S&R.ownership.h1")}</h2>

        <p>{t("S&R.ownership.p1")}</p>

        <h2>{t("S&R.rightToCancel.h1")}</h2>

        <p>{t("S&R.rightToCancel.p1")}</p>

        <h2>{t("S&R.returnCondition.h1")}</h2>

        <p>{t("S&R.returnCondition.p1")}</p>

        <h2>{t("S&R.exceptions.h1")}</h2>

        <p>{t("S&R.exceptions.p1")}</p>

        <ul>
          {t("S&R.exceptions.l1", { returnObjects: true }).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
        <h2>{t("S&R.refundPolicy.h1")}</h2>

        <p>{t("S&R.refundPolicy.p1")}</p>
      </div>
    </Layout>
  );
};

export default ShippingRefund;
