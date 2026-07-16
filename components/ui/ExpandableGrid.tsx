"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ExpandableGridProps = {
  items: ReactNode[];
  visibleCount: number;
  gridClassName: string;
};

/**
 * Grid that shows only the first `visibleCount` items on mobile, with a
 * "Show more" toggle to reveal the rest. From `sm` up, every item is shown
 * and the toggle disappears — the collapse only exists to keep small
 * screens from being flooded with tiles.
 *
 * Takes already-rendered items (not raw data + a render function): data
 * containing component references (e.g. icon: SomeIcon) can't cross the
 * Server → Client boundary as props, but pre-rendered elements can.
 */
export default function ExpandableGrid({ items, visibleCount, gridClassName }: ExpandableGridProps) {
  const [expanded, setExpanded] = useState(false);
  const remaining = items.length - visibleCount;
  const hasMore = remaining > 0;

  return (
    <div>
      <div className={gridClassName}>
        {items.map((item, i) => (
          <div
            key={i}
            className={i >= visibleCount && !expanded ? "hidden sm:contents" : "contents"}
          >
            {item}
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-5 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={cn(
              "glass-soft rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)]",
              "transition-transform duration-300 hover:-translate-y-0.5"
            )}
          >
            {expanded ? "Свернуть" : `Показать ещё (${remaining})`}
          </button>
        </div>
      )}
    </div>
  );
}
