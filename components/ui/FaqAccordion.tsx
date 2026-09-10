"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

/** Click-to-expand FAQ list — each question opens its own answer, one at a time. */
export default function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid sm:grid-cols-2 gap-6 items-start", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <GlassCard key={item.question} hover={false} padding="none" className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-3 p-6 text-left"
            >
              <span className="text-sm font-bold text-[var(--text-primary)]">{item.question}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("shrink-0 text-[var(--text-tertiary)] transition-transform duration-200", isOpen && "rotate-180")}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-[var(--text-secondary)] leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        );
      })}
    </div>
  );
}
