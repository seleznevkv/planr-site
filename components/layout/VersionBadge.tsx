"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { currentVersion } from "@/lib/changelog";
import ChangelogList from "@/components/changelog/ChangelogList";
import { cn } from "@/lib/utils";

/**
 * Small, deliberately unobtrusive version indicator next to the logo.
 * Click opens a changelog popover anchored right below it — the same
 * pattern most desktop/web apps use for "what's new" release notes.
 */
export default function VersionBadge() {
  const [open, setOpen] = useState(false);
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
        aria-label="История версий"
        className="inline-flex items-center gap-1 text-[10px] leading-none font-semibold text-[var(--text-tertiary)] hover:text-[var(--color-brand-blue)] transition-colors tracking-wide pl-2 pr-1.5 py-1 rounded-full glass-soft"
      >
        v{currentVersion}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
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
              <ChangelogList />
            </div>
            <a
              href="/changelog"
              className="block px-4 py-3 text-center text-xs font-semibold text-[var(--color-brand-blue)] border-t border-[var(--glass-border-soft)] hover:underline"
            >
              Открыть полную историю версий
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
