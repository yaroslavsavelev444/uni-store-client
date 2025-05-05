import React from "react";
import FAQBlock from "../FAQBlock/FAQBlock";
import { faqData } from "../../utils/options";
import "./FAQSection.css";
import FAQCard from "../FAQCard/FAQCard";
export default function FAQSection() {
  return (
    <div className="faq-section-wrapper">
      <div className="faq-left-side">
        <FAQBlock faqs={faqData} />
      </div>
      <div className="faq-right-side">
        <FAQCard
          imageSrc="/assets/img/neurocard_main.png"
          title="Условия оплаты"
          description="Информация о способах и условиях оплаты"
        />
      </div>
    </div>
  );
}
