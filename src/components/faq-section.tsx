"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  title: string;
  items: readonly FaqItem[];
}

export function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <section className="mx-auto w-full max-w-2xl px-4">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{title}</h2>
      <Accordion className="space-y-2">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            className="rounded-xl border border-gray-200 bg-white px-4"
          >
            <AccordionTrigger className="text-left text-sm font-medium text-gray-800 hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-gray-600">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
