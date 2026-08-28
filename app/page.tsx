import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ScreenshotFrame from "@/components/graphics/ScreenshotFrame";
import ContactForm from "@/components/contact/ContactForm";
import RoiCalculator from "@/components/pricing/RoiCalculator";
import PricingPlans from "@/components/pricing/PricingPlans";
import {
  industryTypes,
  roles,
  featuresShort,
  objections,
  trustPoints,
  pricingCaption,
} from "@/lib/content";
import { IconArrowRight, IconAndroid, IconApple } from "@/components/icons";

export const metadata: Metadata = {
  title: "РостПро — система управления проектной организацией: проекты, ресурсы, экономика",
  description:
    "РостПро — система для автоматизации проектного управления: связывает задачи, фактические трудозатраты, расходы, ресурсы, подрядчиков и документы, чтобы руководитель видел, что происходит с проектами и как это отражается на их экономике.",
  alternates: { canonical: "/" },
};

const readyIndustries = industryTypes.filter((ind) => !ind.comingSoon);

const problemCards = [
  {
    title: "100% загрузки ≠ 100% прибыли",
    text: "Заполненная команда сама по себе не говорит о том, насколько эффективно работает проект.",
  },
  {
    title: "Проблемы становятся видны поздно",
    text: "Если данные приходится собирать вручную, отклонение можно заметить уже после того, как на него можно повлиять.",
  },
  {
    title: "Решения принимаются без полной картины",
    text: "Когда задачи, трудозатраты и деньги находятся в разных местах, руководителю приходится собирать картину самостоятельно.",
  },
];

const planFactSteps = [
  { title: "План", text: "Что должно произойти и сколько проект должен стоить." },
  { title: "Факт", text: "Сколько времени и ресурсов уже использовано." },
  { title: "Отклонение", text: "Где фактические показатели расходятся с планом." },
  { title: "Экономика", text: "Как изменения отражаются на себестоимости и финансовом результате." },
];

const excelSeparately = ["план — отдельно", "часы — отдельно", "задачи — отдельно", "деньги — отдельно"];

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
                Финансовая прозрачность проектов
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-7 max-w-xl text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.1rem] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-[var(--text-primary)]">
                Единая система для управления проектами, ресурсами и{" "}
                <span className="text-gradient-glow text-gradient" data-text="экономикой">
                  экономикой
                </span>{" "}
                проектной компании
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
                РостПро связывает задачи, фактические трудозатраты, расходы, ресурсы, подрядчиков и
                документы — чтобы руководитель видел, что происходит с проектами и как это
                отражается на их экономике.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="#contact-form" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
                  Записаться на консультацию
                </Button>
                <Button href="#features" size="lg" variant="secondary">
                  Посмотреть, как работает РостПро
                </Button>
              </div>
              <p className="mt-4 text-sm text-[var(--text-tertiary)] max-w-md">
                Для архитектурных бюро, проектных институтов, инжиниринговых компаний и дизайн-студий
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={24} className="min-w-0 lg:-mt-6">
            <ScreenshotFrame
              src="/screenshots/dashboard-v3.png"
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

      {/* Problem */}
      <Section>
        <SectionHeading
          title="Загрузка 100%, а прибыли не видно"
          description="Проектная компания может быть загружена под завязку — и при этом терять деньги. Проблема часто не на поверхности: задачи ведутся отдельно, часы — в таблицах, документы — в почте, финансовые данные — в другой системе. В результате руководитель видит отдельные показатели, но не всегда видит общую картину проекта."
        />
        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {problemCards.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{p.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* One system */}
      <Section size="sm">
        <Reveal>
          <GlassCard variant="strong" padding="lg" hover={false} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Одна система — единая картина проекта
            </h2>
            <p className="mt-5 text-base text-[var(--text-primary)] font-medium leading-relaxed">
              РостПро связывает задачи, время, ресурсы и финансы в одной системе.
            </p>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Сотрудники фиксируют фактически затраченное время. Задачи и этапы связаны с проектом.
              Затраты учитываются в его экономике. В результате данные складываются в одну картину,
              а не в несколько разрозненных отчётов.
            </p>
            <div className="mt-7">
              <Button href="#features" size="lg">
                Посмотреть РостПро в работе
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      {/* Features */}
      <Section size="sm" id="features">
        <SectionHeading title="Всё, что нужно для управления проектом" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresShort.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.06}>
              <GlassCard className="h-full">
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

      {/* Plan -> Fact -> Deviation -> Economy */}
      <Section size="sm">
        <SectionHeading title="От плана — к фактической экономике проекта" />
        <div className="mt-10 flex flex-col lg:flex-row items-stretch gap-4">
          {planFactSteps.map((s, i) => (
            <div key={s.title} className="flex flex-col lg:flex-row items-stretch gap-4 flex-1 min-w-0">
              <Reveal delay={i * 0.08} className="flex-1 min-w-0">
                <GlassCard hover={false} className="h-full text-center">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
                </GlassCard>
              </Reveal>
              {i < planFactSteps.length - 1 && (
                <IconArrowRight className="hidden lg:block w-4 h-4 mt-8 text-[var(--color-brand-blue)]/60 shrink-0 self-start" />
              )}
            </div>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm font-medium text-[var(--text-primary)]">
            Финансовая картина становится точнее по мере накопления фактических данных.
          </p>
        </Reveal>
      </Section>

      {/* Roles */}
      <Section id="roles">
        <SectionHeading
          title="Одна система. Разные задачи для разных руководителей"
          description="РостПро собирает данные проекта в одном месте, но каждый руководитель использует их для своей зоны ответственности."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <Reveal key={r.kicker} delay={i * 0.07}>
              <GlassCard className="h-full">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-brand-blue)]">{r.kicker}</p>
                <h3 className="mt-2 text-base font-bold text-[var(--text-primary)] leading-snug">{r.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{r.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why companies outgrow Excel */}
      <Section size="sm">
        <SectionHeading
          title="Почему проектные компании перерастают Excel"
          description="Excel удобен, пока проектов немного. Когда проектов становится больше, появляются разные таблицы, версии файлов и ручная сверка."
        />
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {excelSeparately.map((s) => (
              <span key={s} className="glass-soft rounded-full px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)]">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-[var(--text-tertiary)]">Цифры есть, но единой картины нет.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <GlassCard variant="strong" padding="lg" hover={false} className="mt-10 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">РостПро связывает эти данные</h3>
            <p className="mt-3 text-sm font-bold text-[var(--text-primary)]">
              Задачи → время → ресурсы → затраты → документы → экономика проекта
            </p>
            <p className="mt-5 text-sm text-[var(--text-secondary)] leading-relaxed">
              РостПро не требует отказываться от всей существующей ИТ-инфраструктуры. Он закрывает
              контур управления проектной работой и экономикой там, где отдельных таблиц и систем уже
              недостаточно.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      {/* ROI calculator */}
      <Section size="sm" id="calculator">
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

      {/* Objections */}
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

      {/* Pricing */}
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
        </Reveal>
      </Section>

      {/* Trust */}
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

      {/* Industries */}
      <Section size="sm" id="industries">
        <SectionHeading title="Для проектных компаний" />
        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-lg font-semibold text-[var(--text-secondary)]">
            {readyIndustries.map((ind, i) => (
              <span key={ind.label}>
                {ind.label}
                {i < readyIndustries.length - 1 && <span className="mx-2 text-[var(--text-tertiary)]">·</span>}
              </span>
            ))}
          </p>
        </Reveal>
      </Section>

      {/* Connectedness statement */}
      <Section>
        <Reveal>
          <p className="max-w-3xl mx-auto text-center text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-snug">
            Важна не отдельная функция. Важна связь между ними.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl mx-auto text-center text-base text-[var(--text-secondary)] leading-relaxed">
            Задача сама по себе не показывает экономику. Табель сам по себе не показывает состояние
            проекта. Финансовый отчёт сам по себе не объясняет, что происходит на этапе
            проектирования.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl mx-auto text-center text-base font-bold text-[var(--text-primary)] leading-relaxed">
            Ценность появляется, когда эти данные связаны с одним проектом.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-5 max-w-xl mx-auto text-center text-base text-[var(--text-secondary)] leading-relaxed">
            В РостПро задача связана с временем, время — с проектом, проект — с затратами, затраты
            — с его экономикой.
          </p>
        </Reveal>
      </Section>

      {/* Final CTA + form */}
      <Section id="contact-form">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Посмотрите РостПро на ваших проектах
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                Покажем систему на сценарии проектной компании: как устроен проект, как фиксируются
                трудозатраты, как формируется план-факт, как руководители видят данные, как работают
                документы и подрядчики.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
