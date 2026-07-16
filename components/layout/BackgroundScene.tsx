"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

/**
 * Fixed full-viewport backdrop: a near-solid base with a couple of very
 * soft, same-hue-family blobs for depth — kept deliberately quiet so text
 * sitting directly on it (not inside a glass card) stays readable, and so
 * dozens of translucent cards don't all compete with a busy multi-color
 * wash behind them. Blobs drift slowly (CSS) and shift subtly with scroll
 * (parallax) for a touch of life without becoming the main event.
 */
export default function BackgroundScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 2000], [0, -110]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 140]);

  return (
    <div ref={ref} className="bg-scene" aria-hidden="true">
      <motion.div
        style={{ y: y1, background: "var(--blob-a)", top: "-16%", left: "-10%" }}
        className="blob blob-animate w-[34rem] h-[34rem]"
      />
      <motion.div
        style={{
          y: y2,
          background: "var(--blob-b)",
          bottom: "-18%",
          right: "-6%",
          animationDelay: "-11s",
        }}
        className="blob blob-animate w-[32rem] h-[32rem]"
      />
      <motion.div
        style={{
          y: y1,
          background: "var(--blob-c)",
          top: "38%",
          left: "50%",
          animationDelay: "-6s",
        }}
        className="blob blob-animate w-[16rem] h-[16rem]"
      />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
