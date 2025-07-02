import AccordionItem from "../Generic/Accordion/Accordion";
import { getFaqs } from "../../utils/StaticData";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  return (
    <div className="accordion-list grid  md:grid-cols-2 grid-cols-1 gap-4">
      {getFaqs(t)
        .slice(0, 6)
        .map((faq, index) => (
          <AccordionItem key={index} title={faq.title} content={faq.content} />
        ))}
    </div>
  );
};

export default Faq;
