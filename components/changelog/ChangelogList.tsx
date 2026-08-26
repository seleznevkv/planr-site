"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ChangelogEntry } from "@/lib/changelog";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

/**
 * Accordion list of changelog entries — shared between the header's
 * VersionBadge popover and the standalone /changelog page.
 */
export default function ChangelogList({ entries, className }: { entries: ChangelogEntry[]; className?: string }) {
  const currentVersion = entries[0]?.version;
  const [expanded, setExpanded] = useState<string | null>(currentVersion ?? null);

  return (
    <div className={className}>
      {entries.map((entry) => {
        const isOpen = expanded === entry.version;
        const isCurrent = entry.version === currentVersion;
        return (
          <div key={entry.version} className="px-1.5">
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : entry.version)}
              className="w-full flex items-center justify-between gap-3 py-2.5 text-left"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{entry.version}</span>
                {isCurrent && (
                  <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[var(--color-brand-blue)]/15 text-[var(--color-brand-blue)]">
                    Текущая
                  </span>
                )}
                {entry.date && (
                  <span className="text-[11px] text-[var(--text-tertiary)]">
                    {dateFormatter.format(new Date(entry.date))}
                  </span>
                )}
              </span>
              <svg
                width="12"
                height="12"
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
                  <ul className="pb-3 pl-1 space-y-1.5">
                    {entry.changes.map((c, i) => (
                      <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-[var(--text-secondary)]">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-brand-blue)] shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="border-b border-[var(--glass-border-soft)] last:border-0" />
          </div>
        );
      })}
    </div>
  );
}
