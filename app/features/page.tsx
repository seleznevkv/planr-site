import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ScreenshotFrame from "@/components/graphics/ScreenshotFrame";
import { featuresDetailed, featureGroups } from "@/lib/content";
import { IconCheck, IconArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Как PlanR ведёт проект — от постановки задачи до прибыли по этапу",
  description:
    "Реальный интерфейс и сценарии PlanR для каждой роли в команде: задачи, тайм-трекинг, бюджет проекта, ЭЦП, клиентский портал, премиальный фонд и отчёты.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  let itemIndex = 0;

  return (
    <>
      <Section size="lg" className="pt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Возможности"
          title="Как PlanR ведёт проект: от постановки задачи до прибыли по этапу"
          description="Ниже — реальный интерфейс и сценарии для каждой роли в команде."
        />
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {featureGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="glass-soft rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {g.label}
              </a>
            ))}
          </div>
        </Reveal>
      </Section>

      {featureGroups.map((group) => {
        const items = group.slugs
          .map((slug) => featuresDetailed.find((f) => f.slug === slug))
          .filter((f): f is (typeof featuresDetailed)[number] => Boolean(f));

        return (
          <Section key={group.id} size="sm" className="pt-0 sm:pt-0 scroll-mt-28" id={group.id}>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-brand-blue)] text-center">
              {group.label}
            </h2>

            <div className="mt-10 flex flex-col gap-16 sm:gap-24">
              {items.map((f) => {
                const i = itemIndex++;
                return (
                  <div key={f.slug} id={f.slug} className="scroll-mt-28">
                    <div
                      className={cn(
                        "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                        i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                      )}
                    >
                      <Reveal>
                        <span className="w-14 h-14 rounded-2xl glass-soft flex items-center justify-center text-[var(--color-brand-blue)]">
                          <f.icon className="w-7 h-7" />
                        </span>
                        <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                          {f.title}
                        </h3>

                        <div className="mt-6 space-y-4">
                          <GlassCard variant="soft" padding="sm" hover={false}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-orange)]">Боль</p>
                            <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{f.pain}</p>
                          </GlassCard>
                          <GlassCard variant="soft" padding="sm" hover={false}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-blue)]">Решение PlanR</p>
                            <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{f.solution}</p>
                          </GlassCard>
                        </div>

                        <ul className="mt-6 space-y-3">
                          {f.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                              <IconCheck className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </Reveal>

                      <Reveal delay={0.12} y={32}>
                        {f.image ? (
                          <>
                            <ScreenshotFrame src={f.image} alt={f.imageAlt ?? f.title} />
                            <div className="mt-4 flex items-start gap-3 glass-soft rounded-2xl px-4 py-3.5">
                              <span className="w-8 h-8 shrink-0 rounded-lg icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                                <f.icon className="w-4 h-4" />
                              </span>
                              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{f.mechanic}</p>
                            </div>
                          </>
                        ) : (
                          <GlassCard variant="strong" padding="lg" hover={false} className="relative overflow-hidden">
                            <div
                              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-20 dark:opacity-10 pointer-events-none"
                              style={{ background: "var(--color-brand-blue)" }}
                            />
                            <div className="relative">
                              <span className="w-11 h-11 rounded-xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                                <f.icon className="w-5 h-5" />
                              </span>
                              <p className="mt-6 text-sm text-[var(--text-secondary)] leading-relaxed">{f.mechanic}</p>
                            </div>
                          </GlassCard>
                        )}
                      </Reveal>
                    </div>
                  </div>
                );
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-14 text-center">
                <Button href="/contact" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
                  Обсудить на демо
                </Button>
              </div>
            </Reveal>
          </Section>
        );
      })}

      <Section>
        <Reveal>
          <GlassCard variant="strong" padding="lg" hover={false} className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Хотите увидеть эти функции на своих проектах?
            </h2>
            <p className="mt-3 text-[var(--text-secondary)] max-w-xl mx-auto">
              Покажем PlanR на демо-звонке за 20 минут и настроим первый проект вместе с вами.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg">Записаться на демо</Button>
              <Button href="/pricing" size="lg" variant="secondary">Смотреть тарифы</Button>
            </div>
          </GlassCard>
        </Reveal>
      </Section>
    </>
  );
}
