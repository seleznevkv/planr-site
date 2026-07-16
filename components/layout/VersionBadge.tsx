"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { changelog, currentVersion } from "@/lib/changelog";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

/**
 * Small, deliberately unobtrusive version indicator next to the logo.
 * Click opens a changelog popover anchored right below it — the same
 * pattern most desktop/web apps use for "what's new" release notes.
 */
export default function VersionBadge() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(currentVersion);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="text-[10px] leading-none font-medium text-[var(--text-tertiary)] hover:text-[var(--color-brand-blue)] transition-colors tracking-wide px-1 py-0.5 -ml-1 rounded"
      >
        v{currentVersion}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="dialog"
            aria-label="История версий"
            className="absolute left-0 top-full mt-2 w-[min(90vw,380px)] z-50 glass-opaque rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--glass-border-soft)]">
              <p className="text-sm font-bold text-[var(--text-primary)]">История версий</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="w-6 h-6 rounded-full icon-chip flex items-center justify-center text-[var(--text-tertiary)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto no-scrollbar px-2 py-2">
              {changelog.map((entry) => {
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
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {entry.version}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[var(--color-brand-blue)]/15 text-[var(--color-brand-blue)]">
                            Текущая
                          </span>
                        )}
                        <span className="text-[11px] text-[var(--text-tertiary)]">
                          {dateFormatter.format(new Date(entry.date))}
                        </span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
