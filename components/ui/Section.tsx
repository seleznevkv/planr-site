import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeClass: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-36",
};

export default function Section({ children, className, size = "md", ...props }: SectionProps) {
  return (
    <section className={cn(sizeClass[size], className)} {...props}>
      <div className="container-px max-w-[1280px] mx-auto">{children}</div>
    </section>
  );
}
