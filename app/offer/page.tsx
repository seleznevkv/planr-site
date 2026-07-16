import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Публичная оферта",
  description: "Публичная оферта на предоставление доступа к платформе PlanR.",
  alternates: { canonical: "/offer" },
};

export default function OfferPage() {
  return (
    <Section size="lg" className="pt-8 sm:pt-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
        Публичная оферта
      </h1>
      <GlassCard hover={false} className="mt-8 max-w-3xl">
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            Настоящий документ является публичной офертой PlanR на предоставление доступа к
            программному обеспечению по модели подписки (SaaS) в соответствии со статьёй 437
            Гражданского кодекса Российской Федерации.
          </p>
          <p>
            Оплата выбранного тарифа означает полное и безоговорочное принятие условий оферты.
            Актуальные условия и стоимость тарифов указаны на странице {" "}
            <a href="/pricing" className="text-[var(--color-brand-blue)] font-medium">
              «Тарифы»
            </a>
            .
          </p>
          <p>
            Полный текст оферты предоставляется по запросу на {" "}
            <a href="mailto:office@planr.cloud" className="text-[var(--color-brand-blue)] font-medium">
              office@planr.cloud
            </a>
            .
          </p>
        </div>
      </GlassCard>
    </Section>
  );
}
