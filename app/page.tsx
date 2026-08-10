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
  heroChecklist,
  industryTypes,
  keyQuestions,
  businessMetrics,
  roles,
  featuresShort,
  comparisonTable,
  trustStatement,
  beforeAfterPairs,
  implementationSupport,
  implementationNote,
  implementationDurationNote,
  pricingCaption,
} from "@/lib/content";
import { IconArrowRight, IconCheck, IconX, IconAndroid, IconApple, IconShield } from "@/components/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "РостПро — контролируйте прибыльность каждого проекта",
  description:
    "РостПро — система управления проектным бизнесом: автоматически связывает задачи, табели учёта времени, подрядчиков и финансовые показатели, показывая прибыльность каждого этапа в реальном времени.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section size="lg" className="pt-8 sm:pt-12">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div className="min-w-0">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass text-xs font-semibold text-[var(--color-brand-blue)] uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)]" />
                Платформа управления проектным бизнесом
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-7 max-w-xl text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[var(--text-primary)]">
                Контролируйте{" "}
                <span
                  className="text-gradient-glow text-gradient"
                  data-text="прибыльность"
                >
                  прибыльность
                </span>{" "}
                проектного бизнеса — по каждому проекту
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
                РостПро связывает задачи, табели, подрядчиков и деньги: вы видите маржу каждого
                проекта и этапа в реальном времени — без сведения Excel-таблиц по пятницам.
                Внедрение — от нескольких дней до нескольких недель в зависимости от команды.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl glass-soft">
                <IconShield className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  60 дней на тест — не подойдёт, вернём деньги
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button href="#contact-form" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
                  Записаться на консультацию
                </Button>
                <Button href="#pricing" size="lg" variant="secondary">
                  Тарифы от 10 000 ₽/мес
                </Button>
              </div>
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

      {/* Functionality checklist */}
      <Section size="sm" className="pt-0 sm:pt-0">
        <Reveal>
          <ExpandableGrid
            visibleCount={6}
            gridClassName="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5"
            items={heroChecklist.map((t) => (
              <span
                key={t.label}
                className="glass-soft rounded-2xl flex flex-col items-start gap-2.5 px-3.5 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="w-8 h-8 shrink-0 rounded-full icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <t.icon className="w-4 h-4" />
                </span>
                <span className="text-[12.5px] text-[var(--text-primary)] font-semibold leading-tight">{t.label}</span>
              </span>
            ))}
          />
        </Reveal>
      </Section>

      {/* 4 key questions */}
      <Section>
        <SectionHeading title="4 вопроса, ответы на которые руководитель должен видеть ежедневно" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyQuestions.map((q, i) => (
            <Reveal key={q.question} delay={i * 0.08}>
              <GlassCard className="h-full">
                <span className="w-12 h-12 rounded-2xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <q.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-[var(--text-primary)] leading-snug">
                  {q.question}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{q.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Before / after */}
      <Section>
        <SectionHeading title="Вашей команде станет проще, а не сложнее" />
        <div className="mt-14 max-w-3xl mx-auto space-y-4">
          {beforeAfterPairs.map((p, i) => (
            <Reveal key={p.before} delay={i * 0.06}>
              <GlassCard hover={false} className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-center">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]/10">
                    <IconX className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.before}</p>
                </div>
                <IconArrowRight className="hidden sm:block w-4 h-4 text-[var(--text-tertiary)] justify-self-center" />
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/10">
                    <IconCheck className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed">{p.after}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ROI calculator */}
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

      {/* All-in-one feature grid */}
      <Section size="sm" className="pt-0 sm:pt-0">
        <SectionHeading
          eyebrow="Возможности"
          title="Всё, что нужно проектной компании — без сторонних сервисов"
          description="Автоматизация проектной деятельности — это не только задачи и время: РостПро закрывает финансовый контроль, работу с подрядчиками и документооборот целиком."
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresShort.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.05}>
              <GlassCard className="h-full">
                {f.badge && (
                  <span className="inline-block mb-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]">
                    {f.badge}
                  </span>
                )}
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

      {/* Comparison table */}
      <Section size="sm">
        <SectionHeading
          eyebrow="Сравнение"
          title="Чем РостПро отличается от привычных инструментов"
          description="Автоматизация проектного управления вместо разрозненных таблиц и переписки — единая система управления проектами для всей команды."
          align="left"
        />
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <GlassCard hover={false} padding="none" className="min-w-[560px] overflow-hidden">
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr className="border-b border-[var(--glass-border-soft)]">
                    <th className="text-left font-semibold text-[var(--text-primary)] px-6 py-4 rounded-tl-3xl">Возможность</th>
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

      {/* Roles */}
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

      {/* Pricing summary */}
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

      {/* Trust / reliability */}
      <Section>
        <SectionHeading title="Надёжность корпоративного уровня" />
        <Reveal delay={0.1}>
          <GlassCard variant="strong" hover={false} className="mt-14 max-w-3xl mx-auto text-center">
            <span className="w-12 h-12 mx-auto rounded-2xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
              <IconShield className="w-6 h-6" />
            </span>
            <p className="mt-5 text-base text-[var(--text-primary)] font-medium leading-relaxed">{trustStatement}</p>
          </GlassCard>
        </Reveal>
      </Section>

      {/* Implementation support */}
      <Section>
        <SectionHeading eyebrow="Внедрение" title="Помощь с внедрением — бесплатно" description={implementationDurationNote} />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Contact form */}
      <Section id="contact-form">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Управляйте проектным бизнесом с полной прозрачностью
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Единая ERP-платформа для проектов, ресурсов, документов, финансов и аналитики:
                контролируйте эффективность компании, принимайте решения быстрее и
                масштабируйте бизнес без потери управляемости. Подходит для управления
                проектным бизнесом, проектной организацией, проектной компанией, проектным
                бюро или проектированием любого масштаба.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
