import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "strong" | "soft";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const variantClass: Record<NonNullable<GlassCardProps["variant"]>, string> = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
};

const paddingClass: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
};

export default function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  padding = "md",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl transition-all duration-300 ease-out",
        variantClass[variant],
        paddingClass[padding],
        hover &&
          "hover:-translate-y-1 hover:shadow-[var(--glass-shadow-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
