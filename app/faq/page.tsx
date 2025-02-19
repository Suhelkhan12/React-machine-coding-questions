"use client";
import React, { useState, useRef } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

type Faq = {
  id: number;
  isOpen: boolean;
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    id: 1,
    isOpen: true,
    question: "How many bones does a cat have?",
    answer: "A cat has 230 bones - 6 more than a human",
  },
  {
    id: 2,
    isOpen: false,
    question: "How much do cats sleep?",
    answer: "The average cat sleeps 12-16 hours per day",
  },
  {
    id: 3,
    isOpen: false,
    question: "How long do cats live",
    answer:
      "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
  },
];

const Faq = ({ question, answer, isOpen }: Faq) => {
  const [open, setIsOpen] = useState<boolean>(isOpen);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="border border-white/50 p-6 cursor-pointer transition-all"
      onClick={() => setIsOpen((p) => !p)}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">{question}</h1>
        <IoIosArrowDropdownCircle
          className={`size-6 transition-all ease-in-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        ref={answerRef}
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px]" : "max-h-0"
        } mt-3`}
        style={{ maxHeight: open ? answerRef.current?.scrollHeight : 0 }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <>
      <h1 className="text-8xl font-bold">Faq component</h1>
      <div className="flex flex-col gap-10 mt-8 ">
        {faqs.map((faq) => (
          <Faq key={faq.id} {...faq} />
        ))}
      </div>
    </>
  );
};

export default page;
