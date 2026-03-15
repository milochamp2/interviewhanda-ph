"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";

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
      <FadeUp>
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">{title}</h2>
      </FadeUp>
      <StaggerGroup className="space-y-2.5">
        {items.map((item, i) => (
          <StaggerItem key={i}>
            <Accordion className="space-y-0">
              <AccordionItem className="glow-card rounded-xl border border-gray-100/80 bg-white px-5">
                <AccordionTrigger className="text-left text-sm font-medium text-gray-800 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-500">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
