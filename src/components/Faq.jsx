"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faq from "../assets/faq.png";
import Link from "next/link";

const defaultFaqs = [
  {
    question: "How do I get paid?",
    answer:
      "You get paid instantly via secure electronic transfer or certified cheque the moment we pick up your keys. No waiting periods, no hassle.",
  },
  {
    question: "Why sell to Autobon?",
    answer:
      "Autobon offers a transparent, haggle-free experience. We provide firm offers, handle all the paperwork, and pick up the car from your driveway.",
  },
  {
    question: "How does Autobon determine the value of my vehicle?",
    answer:
      "We use real-time market data, historical auction results, and the specific details of your car's condition to provide a competitive, firm offer.",
  },
  {
    question: "What happens on the day of pick-up?",
    answer:
      "Our representative will perform a quick 15-minute verification of the vehicle's condition, sign the final paperwork with you, and initiate your payment.",
  },
  {
    question:
      "Will my offer change when it gets picked up? Is the cash offer really “firm”?",
    answer:
      "Yes, the offer is firm. As long as the vehicle's condition matches the description you provided online, the price we agreed upon is the price you get paid.",
  },
  {
    question: "Why won't you purchase my car?",
    answer:
      "While we buy most vehicles, we may decline cars with significant structural damage, title brands (like salvage), or those that fall outside our current inventory requirements.",
  },
  {
    question: "How does my auto loan get paid off?",
    answer:
      "We handle the payoff directly with your lender. We deduct the payoff amount from your car's value and pay you the remaining equity.",
  },
  {
    question:
      "I am still driving my car. Does Autobon allow a variation in mileage?",
    answer:
      "We allow a reasonable variation in mileage (typically up to 500km) from the time of the offer to the time of pick-up.",
  },
  {
    question: "Can I sell my car for cash with Autobon?",
    answer:
      "Absolutely! We buy cars for cash every day, whether you are buying a new one from us or just looking to sell your current ride.",
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left gap-4 hover:text-primary transition-colors"
      >
        <span className="text-[16px] md:text-[18px] font-medium text-black leading-tight">
          {question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
            isOpen ? "bg-primary border-primary text-white" : "text-gray-500"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-4 md:pr-12">
              <p className="text-gray-500 text-[15px] md:text-[16px] leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqList = items.length > 0 ? items : defaultFaqs;

  return (
    <section
      id="faq"
      className="w-full py-[60px] lg:py-[100px] bg-background scroll-mt-20"
    >
      {" "}
      <div className="max-w-custom mx-auto px-[20px] lg:px-[0px]">
        {/* HEADER */}
        <div className="mb-[40px] lg:mb-[60px] text-center">
          <h2 className="text-[28px] lg:text-[45px] font-semibold text-black tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ LIST CONTAINER */}
        <div className="flex border border-gray-200 rounded-[20px] md:rounded-[24px] flex-col bg-white px-5 md:px-10 py-2 shadow-sm mb-10 md:mb-12">
          {faqList.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* TWO-ROW SUPPORT CARD - RESPONSIVE */}
        <div className="w-full flex flex-col md:flex-row md:max-h-[350px] rounded-[16px] md:rounded-[12px] overflow-hidden border border-gray-200 bg-white shadow-lg">
          {/* Row 1/Left Column: Image */}
          <div className="h-[200px] md:h-auto md:w-1/2 lg:w-2/5 relative">
            <img
              src={faq.src}
              alt="Autobon Support Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Row 2/Right Column: Content Box */}
          <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center items-center md:items-start md:w-1/2 lg:w-3/5">
            <div className="flex flex-col gap-3 text-center md:text-left items-center md:items-start">
              <h4 className="text-[22px] self-start text-start  w-full  md:text-[26px] font-bold text-black leading-tight">
                <div className="   text-start md:text-black mb-2">
                  Questions?
                </div>
                Our Team Is Here For You!
              </h4>
              <p className="text-[#3E3E3E] text-start text-[14px] md:text-[16px] max-w-[500px]">
                Our dedicated support team is here to answer any questions you
                might have during your car selling experience.
              </p>
              <Link
                href={"/contact-us"}
                className="w-[180px] text-center   self-start sm:w-[200px] mt-4 px-5 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
