import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ExpandableGrid from "@/components/ui/ExpandableGrid";
import { companyValues, industryTypes, aboutStatement } from "@/lib/content";
import { legalEntity } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "О компании PlanR — миссия и история продукта",
  description:
    "Узнайте о миссии, ценностях и истории развития платформы PlanR для управления проектами, ресурсами и финансами.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section size="lg" className="pt-8 sm:pt-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-[var(--color-brand-blue)] uppercase tracking-wide">
              О нас
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary)]">
              Порядок в проектах — наша единственная задача
            </h1>
            <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">
              PlanR создан для руководителей, которые хотят видеть реальную картину бизнеса —
              сроки, ресурсы и деньги в одном окне, без разрозненных таблиц, созвонов «для
              галочки» и отчётов, которые устаревают быстрее, чем доходят до стола.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <GlassCard variant="strong" padding="lg" hover={false}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/demo-power.svg"
                alt="Иллюстрация: работа над проектами в PlanR"
                className="w-full h-auto rounded-2xl"
              />
              <p className="mt-6 text-5xl font-extrabold text-gradient">Всё под контролем</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                планирование, ресурсы и финансы проекта — в одном окне, без хаоса разрозненных
                инструментов
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section size="sm">
        <Reveal>
          <GlassCard variant="strong" padding="lg" hover={false} className="max-w-3xl mx-auto text-center">
            <p className="text-lg sm:text-xl text-[var(--text-primary)] font-medium leading-relaxed">
              {aboutStatement}
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      <Section size="sm" className="pt-0 sm:pt-0">
        <Reveal>
          <GlassCard variant="soft" hover={false} className="max-w-2xl mx-auto text-center">
            <p className="text-base sm:text-lg text-[var(--text-primary)] font-medium leading-relaxed">
              Узнать подробнее о развитии функционала PlanR можно по ссылке «История версий» —
              нажмите на номер версии рядом с логотипом вверху страницы.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading eyebrow="Миссия" title="Одна версия правды для каждого решения" description="Каждое решение о сроках, бюджете и команде должно опираться на актуальные данные — а не на интуицию и разрозненные таблицы." />
        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {companyValues.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <GlassCard className="h-full">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{v.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Отрасли"
          title="Специализация на проектном бизнесе"
          description="PlanR создан для компаний, где основной актив — время и экспертиза специалистов."
          align="left"
        />
        <div className="mt-10">
          <ExpandableGrid
            visibleCount={6}
            gridClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            items={industryTypes.map((ind) => (
              <div
                key={ind.label}
                className={cn(
                  "relative rounded-2xl px-3 py-5 flex flex-col items-center text-center gap-2.5 transition-all duration-300",
                  ind.comingSoon ? "glass-soft opacity-70" : "glass hover:-translate-y-1"
                )}
              >
                {ind.comingSoon && (
                  <div className="group/tip absolute top-2 right-2">
                    <span
                      tabIndex={0}
                      title={ind.note}
                      className="w-4 h-4 rounded-full icon-chip flex items-center justify-center text-[9px] font-bold text-[var(--text-tertiary)] cursor-help outline-none"
                    >
                      ?
                    </span>
                    <div className="pointer-events-none absolute right-0 top-full mt-2 w-52 rounded-xl glass-opaque p-3 text-[11px] leading-snug text-[var(--text-secondary)] text-left opacity-0 scale-95 origin-top-right transition-all duration-200 group-hover/tip:opacity-100 group-hover/tip:scale-100 group-focus-within/tip:opacity-100 group-focus-within/tip:scale-100 z-20">
                      {ind.note}
                    </div>
                  </div>
                )}
                <span
                  className={cn(
                    "w-9 h-9 rounded-xl icon-chip flex items-center justify-center",
                    ind.comingSoon ? "text-[var(--text-tertiary)]" : "text-[var(--color-brand-blue)]"
                  )}
                >
                  <ind.icon className="w-4.5 h-4.5" />
                </span>
                <span
                  className={cn(
                    "text-xs font-medium leading-snug",
                    ind.comingSoon ? "text-[var(--text-tertiary)]" : "text-[var(--text-secondary)]"
                  )}
                >
                  {ind.label}
                </span>
              </div>
            ))}
          />
        </div>
      </Section>

      <Section size="sm">
        <SectionHeading eyebrow="Реквизиты" title="Юридическая информация" align="left" />
        <Reveal delay={0.1}>
          <GlassCard hover={false} className="mt-10 max-w-2xl">
            <p className="text-sm font-bold text-[var(--text-primary)]">{legalEntity.name}</p>
            <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-[var(--text-tertiary)]">ИНН</dt>
                <dd className="text-[var(--text-secondary)]">{legalEntity.inn}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-tertiary)]">КПП</dt>
                <dd className="text-[var(--text-secondary)]">{legalEntity.kpp}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-tertiary)]">ОГРН</dt>
                <dd className="text-[var(--text-secondary)]">{legalEntity.ogrn}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[var(--text-tertiary)]">Юридический адрес</dt>
                <dd className="text-[var(--text-secondary)]">{legalEntity.address}</dd>
              </div>
            </dl>
          </GlassCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <GlassCard variant="strong" padding="lg" hover={false} className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Присоединяйтесь к компаниям, которые управляют организацией и проектами эффективно
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg">Запросить демонстрацию</Button>
              <Button href="/features" size="lg" variant="secondary">Смотреть возможности</Button>
            </div>
          </GlassCard>
        </Reveal>
      </Section>
    </>
  );
}
