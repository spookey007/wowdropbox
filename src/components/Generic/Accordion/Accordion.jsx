import React, { useRef, useState } from "react";
import "./Accordion.css";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-wrapper">
      <button
        className={`accordion-button ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className={`accordion-icon ${!isOpen ? "rotate" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="accordion-body"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="accordion-content">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
