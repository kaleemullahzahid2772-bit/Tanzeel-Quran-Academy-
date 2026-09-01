"use client";

import React, { useState } from "react";
import { Search, MessageSquare } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import { faqsData } from "@/data/faqs";
import Link from "next/link";

const categories = ["All", "General", "Classes", "Tutors", "Technical", "Payments"];

export default function FAQClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Real-time Search Input */}
      <div className="w-full max-w-md mt-4 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g., female tutor, trial, software)..."
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-12 pr-4 py-3.5 outline-none shadow-lg transition-colors"
        />
      </div>

      {/* Category Tabs & FAQ Accordion List */}
      <section className="bg-[var(--color-black)] py-16 px-4 w-full">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-[var(--color-accent)] text-white shadow-md"
                    : "bg-[var(--color-surface)] text-gray-400 border border-[var(--color-border)] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Component */}
          {filteredFaqs.length > 0 ? (
            <FAQAccordion items={filteredFaqs} />
          ) : (
            <div className="py-12 text-center text-gray-400 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
              No questions found matching your search term.
            </div>
          )}

          {/* Need More Help Banner */}
          <div className="mt-8 bg-[var(--color-surface)] border border-[var(--color-sky)]/30 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
            <MessageSquare className="w-8 h-8 text-[var(--color-sky-light)]" />
            <h3 className="text-xl font-bold text-white">Still Have Questions?</h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Our academic support team is available 24/7 on WhatsApp and Email to assist you.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              Contact Support Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
