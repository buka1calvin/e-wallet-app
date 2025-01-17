import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/fqas";
import Image from "next/image";
import Link from "next/link";

const FQA = () => {
  return (
    <section className="w-full min-h-screen md:px-20 px-4 flex md:flex-row flex-col gap-6 py-20 max-h-fit">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-4 text-secondary">Frequently Asked Questions</h1>
        <p className="text-base text-neutral-700 mb-6">
          Have questions about how our app works? We’ve got you covered! Check
          out these frequently asked questions to learn more about what our
          personal financial manager can do for you.
        </p>
        <Link href="mailto:calvinbukarani@gmail.com" className="text-white bg-secondary py-2 px-4 rounded-full">Contact Us</Link>
        <Image
          src="/images/cards-img.webp"
          alt="cards"
          width={400}
          height={400}
        />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-neutral-700">
        Find Answers to Common Questions
        </h1>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem value={i.toString()} key={i}>
              <AccordionTrigger className="text-neutral-700 font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-neutral-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FQA;
