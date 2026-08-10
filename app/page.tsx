import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ScreenshotFrame from "@/components/graphics/ScreenshotFrame";
import ExpandableGrid from "@/components/ui/ExpandableGrid";
import ContactForm from "@/components/contact/ContactForm";
import RoiCalculator from "@/components/pricing/RoiCalculator";
import PricingPlans from "@/components/pricing/PricingPlans";
import {
  industryTypes,
  businessMetrics,
  roles,
  featuresShort,
  problemQuotes,
  systemShowcase,
  objections,
  comparisonTable,
  trustPoints,
  aboutStatement,
  implementationSupport,
  implementationNote,
  implementationDurationNote,
  pricingCaption,
} from "@/lib/content";
import { IconArrowRight, IconCheck, IconAndroid, IconApple } from "@/components/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "РостПро — контролируйте прибыльность каждого проекта",
  description:
    "РостПро — система управления проектным бизнесом: автоматически связывает задачи, табели учёта времени, подрядчиков и финансовые показатели, показывая прибыльность каждого этапа в реальном времени.",
  alternates: { canonical: "/" },
};

const differentiation = featuresShort.filter((f) => f.badge);

export default function HomePage() {
  return (
    <>
      {/* Экран 1 — Hero */}
      <Section size="lg" className="pt-8 sm:pt-12">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div className="min-w-0">
            <Reveal>
              <h1 className="max-w-xl text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.1rem] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[var(--text-primary)]">
                Проектная компания видит{" "}
                <span className="text-gradient-glow text-gradient" data-text="прибыль">
                  прибыль
                </span>{" "}
                насквозь — от сметы до последнего акта
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Одна система вместо четырёх и переписки: задачи, часы, документы, деньги.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button href="#contact-form" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
                  Записаться на консультацию
                </Button>
                <Button href="#sebestoimost" size="lg" variant="secondary">
                  Посмотреть, как считается себестоимость
                </Button>
              </div>
              <p className="mt-4 text-sm text-[var(--text-tertiary)] max-w-md">
                60 дней для тестов · Внедрение — от нескольких дней до нескольких недель в
                зависимости от команды · Помощь при запуске бесплатно
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={24} className="min-w-0 lg:-mt-6">
            <ScreenshotFrame
              src="/screenshots/dashboard-v2.png"
              alt="Дашборд организации в РостПро: статусы проектов, загруженность ГИПов, финансовый график"
              priority
            />
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-end gap-2.5">
              <span className="text-xs text-[var(--text-tertiary)]">Доступно для:</span>
              <span className="inline-flex items-center gap-1.5 glass-soft rounded-full px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                <IconApple className="w-3.5 h-3.5" />
                iOS
              </span>
              <span className="inline-flex items-center gap-1.5 glass-soft rounded-full px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                <IconAndroid className="w-3.5 h-3.5" />
                Android
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Экран 2 — узнавание проблемы */}
      <Section size="sm">
        <SectionHeading title="Так выглядит проектный бизнес без системы" />
        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {problemQuotes.map((q, i) => (
            <Reveal key={q.quote} delay={i * 0.07}>
              <GlassCard hover={false} className="h-full">
                <p className="text-base font-semibold text-[var(--text-primary)] leading-relaxed">
                  «{q.quote}»
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">— {q.source}</p>
                <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {q.interpretation}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Экран 3 — что показывает система */}
      <Section size="sm">
        <SectionHeading eyebrow="Что показывает система" title="Три вещи, которые вы увидите сразу" align="left" />
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {systemShowcase.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <GlassCard id={s.slug} className="h-full scroll-mt-28">
                <span className="w-12 h-12 rounded-2xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <s.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-[var(--text-primary)] leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ROI calculator — подтверждает блок «Себестоимость» на своих цифрах */}
      <Section size="sm">
        <SectionHeading
          eyebrow="Окупаемость"
          title="Сколько вы теряете на ручной отчётности сейчас"
          description="Посчитайте на своих цифрах: сколько часов команда тратит на сведение данных вручную и за сколько дней это окупает тариф «Команда»."
          align="left"
        />
        <Reveal delay={0.1} className="mt-10">
          <RoiCalculator />
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 text-center">
            <Button href="#contact-form" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
              Записаться на консультацию
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Экран 4 — чем отличаемся */}
      <Section size="sm">
        <SectionHeading title="Преимущества над конкурентами" align="left" />
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {differentiation.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.06}>
              <GlassCard className="h-full">
                <span className="inline-block mb-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-500">
                  {f.badge}
                </span>
                <span className="w-11 h-11 rounded-xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <f.icon className="w-5 h-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-[var(--text-primary)] leading-snug">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{f.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Экран 5 — сравнение с тем, как сейчас */}
      <Section size="sm">
        <SectionHeading title="Сейчас у вас, скорее всего, так" align="left" />
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <GlassCard hover={false} padding="none" className="min-w-[560px] overflow-hidden">
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr className="border-b border-[var(--glass-border-soft)]">
                    <th className="text-left font-semibold text-[var(--text-primary)] px-6 py-4 rounded-tl-3xl"></th>
                    {comparisonTable.columns.map((col, i) => (
                      <th
                        key={col}
                        className={cn(
                          "text-center font-semibold px-6 py-4",
                          i === comparisonTable.columns.length - 1
                            ? "text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/[0.06] rounded-tr-3xl"
                            : "text-[var(--text-primary)]"
                        )}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.rows.map((row, rowIndex) => (
                    <tr key={row.feature} className="border-b border-[var(--glass-border-soft)] last:border-0">
                      <td
                        className={cn(
                          "px-6 py-4 font-medium text-[var(--text-primary)]",
                          rowIndex === comparisonTable.rows.length - 1 && "rounded-bl-3xl"
                        )}
                      >
                        {row.feature}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={cn(
                            "text-center px-6 py-4",
                            i === row.values.length - 1 && "bg-[var(--color-brand-blue)]/[0.06]",
                            i === row.values.length - 1 &&
                              rowIndex === comparisonTable.rows.length - 1 &&
                              "rounded-br-3xl"
                          )}
                        >
                          {v === true ? (
                            <IconCheck className="w-4 h-4 mx-auto text-[var(--color-brand-blue)]" />
                          ) : v === false ? (
                            <span className="text-[var(--text-tertiary)]">—</span>
                          ) : (
                            <span className="text-[var(--text-tertiary)] text-xs">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        </Reveal>
      </Section>

      {/* Экран 6 — возражения */}
      <Section size="sm">
        <SectionHeading title="Вопросы, которые обычно задают перед внедрением" align="left" />
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {objections.map((o, i) => (
            <Reveal key={o.question} delay={i * 0.07}>
              <GlassCard hover={false} className="h-full">
                <p className="text-sm font-bold text-[var(--text-primary)]">{o.question}</p>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{o.answer}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* О клиентах — из /about */}
      <Section size="sm">
        <Reveal>
          <GlassCard variant="strong" padding="lg" hover={false} className="max-w-3xl mx-auto text-center">
            <p className="text-lg sm:text-xl text-[var(--text-primary)] font-medium leading-relaxed">
              {aboutStatement}
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      {/* Implementation support — раскрывает ответ на «внедрение дороже подписки» */}
      <Section size="sm">
        <SectionHeading eyebrow="Внедрение" title="Помощь с внедрением — бесплатно" description={implementationDurationNote} align="left" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {implementationSupport.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <span className="w-12 h-12 rounded-2xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <s.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-[var(--text-primary)] leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-[var(--text-tertiary)] max-w-2xl mx-auto">{implementationNote}</p>
        </Reveal>
      </Section>

      {/* Экран 7 — роли */}
      <Section>
        <SectionHeading title="Решения для каждой роли" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <GlassCard className="h-full flex flex-col items-center text-center">
                <span className="w-14 h-14 rounded-full icon-chip flex items-center justify-center text-base font-bold text-[var(--color-brand-blue)]">
                  {r.initials}
                </span>
                <h3 className="mt-4 text-base font-bold text-[var(--text-primary)]">{r.name}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{r.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section size="sm">
        <SectionHeading title="Для компаний, работающих по проектной модели" />
        <Reveal delay={0.1}>
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
        </Reveal>
      </Section>

      {/* Pricing summary — отвечает на P0.4 (цена) */}
      <Section size="sm" id="pricing">
        <SectionHeading
          eyebrow="Тарифы"
          title="Прозрачные цены без скрытых платежей"
          description="Тарифы отличаются только количеством пользователей — полный функционал РостПро доступен на каждом плане."
          align="left"
        />
        <Reveal delay={0.1}>
          <div className="mt-10">
            <PricingPlans />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl mx-auto text-center text-sm text-[var(--text-secondary)] leading-relaxed">
            {pricingCaption}
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/pricing" variant="secondary">
              Смотреть все тарифы и вопросы
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Business metrics */}
      <Section>
        <SectionHeading
          title="Все ключевые показатели бизнеса — в одном окне"
          description="Пример данных для демонстрации возможностей платформы — цифры конкретной компании мы не публикуем."
        />
        <div className="mt-14 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
          <Reveal>
            <GlassCard variant="strong" padding="md" hover={false} className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/power-3.svg"
                alt="Аналитика по срокам, финансированию и загрузке команды в РостПро"
                className="w-full h-auto"
              />
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard variant="strong" padding="none" hover={false}>
              {businessMetrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[var(--glass-border-soft)] last:border-0"
                >
                  <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-[var(--text-tertiary)]"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                    {m.label}
                  </span>
                  <span className="text-base font-bold text-[var(--text-primary)]">{m.value}</span>
                </div>
              ))}
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* Экран 8 — доверие */}
      <Section>
        <SectionHeading
          title="Надёжность корпоративного уровня"
          description="Данные компании защищены на всех уровнях — от инфраструктуры до прав доступа отдельного сотрудника."
        />
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustPoints.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.07}>
              <GlassCard variant="strong" hover={false} className="h-full flex flex-col items-center text-center">
                <span className="w-12 h-12 rounded-2xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <t.icon className="w-6 h-6" />
                </span>
                <p className="mt-4 text-sm font-semibold text-[var(--text-primary)] leading-snug">{t.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Экран 9 — финальный CTA + форма */}
      <Section id="contact-form">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Посмотрите на своих проектах
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Ответим на вопросы и посчитаем себестоимость по вашему договору. Единая
                платформа для проектов, ресурсов, документов, финансов и аналитики — для любой
                проектной компании.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
