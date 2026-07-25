import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Спасибо за заявку",
  description: "Заявка на демонстрацию РостПро отправлена — мы свяжемся с вами в ближайшее рабочее время.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <Section size="lg" className="pt-8 sm:pt-12">
      <Reveal className="max-w-xl mx-auto">
        <GlassCard variant="strong" padding="lg" hover={false} className="text-center">
          <span className="mx-auto w-16 h-16 rounded-full icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
            <IconCheck className="w-8 h-8" />
          </span>
          <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Спасибо!
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
            Заявка отправлена. Мы свяжемся с вами в ближайшее рабочее время (Пн–Пт, 9:00–18:00 МСК), чтобы
            обсудить демонстрацию РостПро.
          </p>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">
            Если вопрос срочный — напишите на{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-[var(--color-brand-blue)] hover:underline">
              {siteConfig.email}
            </a>{" "}
            или позвоните по телефону{" "}
            <a href={siteConfig.phoneHref} className="text-[var(--color-brand-blue)] hover:underline">
              {siteConfig.phone}
            </a>
            .
          </p>
          <div className="mt-8">
            <Button href="/" size="md">
              На главную
            </Button>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
