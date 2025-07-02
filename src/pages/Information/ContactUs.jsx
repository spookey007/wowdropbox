import BackButton from "../../components/Generic/BackButton/BackButton";
import Layout from "../../components/Layout/Layout";
import "./Information.css";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page flex flex-col gap-4 ">
        <BackButton pageTitle={t("headings.Contact Us")} />
        <div className="contact-box">
          <h3>{t("Contact.Business & other inquiries")}</h3>
          <a href="mailto:info@wowdropbox.eu">info@wowdropbox.eu</a>
        </div>

        <div className="contact-box">
          <h3>{t("Contact.Corporate information")}</h3>
          <p>
            Whalepartners OÜ
            <br />
            REG No. 14674044
            <br />
            VAT No. EE102141508
          </p>
        </div>

        <div className="contact-box">
          <h3>{t("Contact.Address")}</h3>
          <p>Estonia, Harjumaa, Tallinn, Tornimäe 5, 10145</p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
