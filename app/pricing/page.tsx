import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import PricingPlans from "@/components/pricing/PricingPlans";
import RoiCalculator from "@/components/pricing/RoiCalculator";
import Accordion from "@/components/ui/Accordion";
import { pricingFaq, pricingTrialDays, pricingIncludedFeatures, pricingJumpNote, pricingCaption } from "@/lib/content";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Тарифы РостПро — прозрачные цены для проектного бизнеса",
  description:
    "Сколько стоит РостПро: тарифы отличаются только количеством пользователей, весь функционал и внедрение системы проектного управления включены в стоимость на каждом плане — фиксированная цена без скидок.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Section size="lg" className="pt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Тарифы"
          title="Прозрачные цены без скрытых платежей"
          description="Тарифы отличаются только количеством пользователей — полный функционал РостПро доступен на каждом плане."
        />
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong text-base font-bold text-[var(--text-primary)]">
              {pricingTrialDays} дней для тестов
            </span>
          </div>
        </Reveal>
        <div className="mt-10">
          <PricingPlans />
        </div>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl mx-auto text-center text-sm font-medium text-[var(--text-primary)] leading-relaxed">
            {pricingCaption}
          </p>
          <p className="mt-3 max-w-2xl mx-auto text-center text-sm text-[var(--text-secondary)] leading-relaxed">
            {pricingJumpNote}
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Окупаемость"
          title="Сколько вы теряете на ручной отчётности сейчас"
          description="Примерный расчёт: сколько часов команда тратит на сведение данных вручную и за сколько дней это окупает тариф «Команда»."
        />
        <Reveal delay={0.1} className="mt-10">
          <RoiCalculator />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Функциональность"
          title="Полный функционал включён в каждый тариф"
          description="Мы не ограничиваем возможности платформы по тарифам — единственное отличие между планами — это количество пользователей."
        />
        <Reveal delay={0.1}>
          <GlassCard hover={false} className="mt-10 max-w-2xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {pricingIncludedFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <IconCheck className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" />
                  {f}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </Section>

      <Section size="sm">
        <SectionHeading eyebrow="Вопросы" title="Частые вопросы об оплате и тарифах" align="left" />
        <div className="mt-10 max-w-3xl">
          <Accordion items={pricingFaq} />
        </div>
      </Section>
    </>
  );
}
