import { useTranslation } from "react-i18next";
import AccordionItem from "../../components/Generic/Accordion/Accordion";
import Layout from "../../components/Layout/Layout";
import { getFaqs } from "../../utils/StaticData";
import "./Information.css";
import BackButton from "../../components/Generic/BackButton/BackButton";
const FAQ = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="layout-padding  information-page">
        <BackButton pageTitle={t("FAQ.h")} />
        <h2>{t("FAQ.p")}</h2>

        <div className="accordion-list flex flex-col gap-4">
          {getFaqs(t).map((faq, index) => (
            <AccordionItem
              key={index}
              title={faq.title}
              content={faq.content}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
