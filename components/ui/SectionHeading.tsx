import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase glass text-[var(--color-brand-blue)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-[1.12] tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
