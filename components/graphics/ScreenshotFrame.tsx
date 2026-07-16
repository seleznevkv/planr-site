"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
};

const frameShadow = "0 24px 48px -12px rgba(15, 23, 35, 0.35), 0 8px 16px -8px rgba(15, 23, 35, 0.25)";

/**
 * Real product screenshot presented with a macOS-style 12px rounded frame
 * and a floating drop shadow, consistent with the glass card language used
 * everywhere else on the site. Click opens an enlarged view — still rounded
 * and shadowed, never edge-to-edge — so detail is readable without leaving
 * the page. `sizes` covers the two contexts we use it in: full-width in a
 * two-column grid, half-width in a stacked layout.
 */
export default function ScreenshotFrame({ src, alt, caption, className, priority }: ScreenshotFrameProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <figure className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть скриншот в полном размере"
        className="group relative block w-full cursor-zoom-in rounded-[12px] text-left"
      >
        <div
          className="relative overflow-hidden rounded-[12px] border border-[var(--glass-border-soft)] bg-[var(--bg-3)] transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{ boxShadow: frameShadow }}
        >
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full glass-opaque flex items-center justify-center text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </div>
      </button>
      {caption && (
        <figcaption className="mt-3 text-xs text-[var(--text-tertiary)] text-center">{caption}</figcaption>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 sm:p-10"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              className="absolute top-5 right-5 w-10 h-10 rounded-full glass-opaque flex items-center justify-center text-[var(--text-primary)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[min(92vw,1400px)] max-h-[88vh] overflow-hidden rounded-2xl border border-white/10"
              style={{ boxShadow: "0 32px 64px -16px rgba(0, 0, 0, 0.6)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                sizes="92vw"
                className="w-auto h-auto max-w-full max-h-[88vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
