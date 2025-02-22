import React, { useState } from "react";

export default function Section3() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      question: "The curse of Fabric Products & Accessories !!",
      answer:
        "We have built a strong alliance with some of industry tech giants to build a most efficient data analysis and processing.",
    },
    {
      question: "Top Rayon Fabric Materials are made of ?",
      answer:
        "We have recently launched the ability to shop fabrics online and shop poles & tracks online from our website too.",
    },
    {
      question: "The Global Fabrics Distributor must be professional !!",
      answer:
        "Choose from many fabrics and design your. Create and print only the fabric you need aqueous solution for fiber surface.",
    },
  ];

  return (
    <div className="section3">
      <div className="section3-blok">
        <div className="section3-blok__section-1">
          <div className="section3-blok__section__image">
            <img src="/images/section3/section3.jpg" alt="" />
          </div>
          <div className="section3-blok__section-1__header">
            <h1>
              We Bringing A Revolutionary Change In The Textile Industry Product
            </h1>
            <img src="/images/section3/fashion.png" alt="" />
          </div>
          <div className="section3-blok__section-1__section">
            <p className="section3-blok__section-1__section__p-1">80</p>
            <p className="section3-blok__section-1__section__p-1-2">%</p>
            <p className="section3-blok__section-1__section__p-2">
              We are continually looking to improve all aspects of the
              manufacturing process -from our entire cycle manufacturing to
              packaging and shipping.
            </p>
          </div>
        </div>
        <div className="section3-blok__section-2">
          <p className="section3-blok__section-2__p-1">Get informed</p>
          <h1>Popular Questions</h1>
          <p className="section3-blok__section-2__p-2">If you work in the fashion industry, chances are you work with textiles almost constantly. Whether you’re shopping for, printing on, or working with textiles, they never seem to differ much from any fabric you’ve worked with.</p>
          <div className="section3-blok__section-2__container">
            {questions.map((item, index) => (
              <div
                key={index}
                className={`section3-blok__section-2__container-part ${
                  openIndex === index ? "active" : ""
                }`}
              >
                <div
                  className="section3-blok__section-2__container-part__header"
                  onClick={() => toggleAccordion(index)}
                >
                  <p>{item.question}</p>
                </div>
                <div className="section3-blok__section-2__container-part__footer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
