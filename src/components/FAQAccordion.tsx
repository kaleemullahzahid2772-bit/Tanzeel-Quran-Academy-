"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/data/faqs";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-[var(--color-surface)] border-[var(--color-accent)]/50 shadow-[0_4px_20px_rgba(250,132,30,0.15)]"
                : "bg-[var(--color-surface)]/80 border-[var(--color-border)] hover:border-white/20"
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isOpen ? "text-[var(--color-accent)]" : "text-gray-500"
                  }`}
                />
                <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                  {item.question}
                </h3>
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center bg-[var(--color-black-soft)] border border-[var(--color-border)] text-gray-400 transition-transform duration-300 shrink-0 ${
                  isOpen ? "rotate-180 text-[var(--color-accent)] border-[var(--color-accent)]/40" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[var(--color-border)]/50 animate-fade-in">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
