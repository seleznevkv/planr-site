import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { blogPosts } from "@/lib/content";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Блог РостПро — статьи об управлении проектами и финансах",
  description:
    "Практические материалы о планировании, бюджете проекта, координации подрядчиков и портфельной аналитике для руководителей проектного бизнеса.",
  alternates: { canonical: "/blog" },
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

// Page is hidden until real content is ready — remove this line to bring it back.
const BLOG_HIDDEN = true;

export default function BlogPage() {
  if (BLOG_HIDDEN) notFound();

  return (
    <>
      <Section size="lg" className="pt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Блог"
          title="Материалы для тех, кто управляет проектами"
          description="Разбираем практику планирования, финансов и координации команд на примерах проектного бизнеса."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid sm:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <GlassCard className="h-full flex flex-col cursor-default">
                <span className="inline-block w-fit px-3 py-1 rounded-full text-[11px] font-semibold glass-soft text-[var(--color-brand-blue)]">
                  {post.category}
                </span>
                <h2 className="mt-4 text-lg font-bold text-[var(--text-primary)] leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between pt-5 border-t border-[var(--glass-border-soft)]">
                  <time className="text-xs text-[var(--text-tertiary)]" dateTime={post.date}>
                    {dateFormatter.format(new Date(post.date))}
                  </time>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-blue)]">
                    Читать <IconArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
