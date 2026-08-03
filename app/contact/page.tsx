import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site";
import { IconMail, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Контакты РостПро — запишитесь на демонстрацию",
  description:
    "Закажите демонстрацию системы управления проектами РостПро: оставьте заявку — покажем платформу на живых данных и откроем бесплатный тестовый период для вашей команды.",
  alternates: { canonical: "/contact" },
};

const contactDetails = [
  { icon: IconPhone, label: "Телефон", value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: IconMail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

export default function ContactPage() {
  return (
    <Section size="lg" className="pt-8 sm:pt-12">
      <SectionHeading
        eyebrow="Контакты"
        title="Расскажем о РостПро на демо-звонке за 20 минут"
        description="Оставьте заявку на демонстрацию — покажем платформу на примере ваших проектов, ответим на вопросы о внедрении и откроем бесплатный тестовый доступ."
      />

      <div className="mt-14 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
        <Reveal className="space-y-6 order-2 lg:order-1">
          <GlassCard hover={false}>
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-5">Прямые контакты</h3>
            <ul className="space-y-4">
              {contactDetails.map((c) => (
                <li key={c.label} className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
                    <c.icon className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-[var(--text-tertiary)]">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--color-brand-blue)] transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-[var(--text-primary)]">{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard hover={false} variant="soft">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Пн–Пт, 9:00–18:00 (МСК). Ответим на заявку в течение одного рабочего дня.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
