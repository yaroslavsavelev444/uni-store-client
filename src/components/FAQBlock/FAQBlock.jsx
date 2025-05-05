import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQBlock.css';

export default function FAQBlock({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-block">
      {faqs.map((item, index) => (
        <div key={index} className="block-background faq-item-custom">
          <button
            className="faq-question-custom"
            onClick={() => toggleQuestion(index)}
          >
            <span>{item.question}</span>
            {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <div
            className={`faq-answer-custom ${openIndex === index ? 'show' : ''}`}
          >
            <div className="faq-answer-content">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}