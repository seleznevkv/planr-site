import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ScreenshotFrame from "@/components/graphics/ScreenshotFrame";
import ContactForm from "@/components/contact/ContactForm";
import { IconArrowRight, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Сервис проверки документации — нормоконтроль по 309-ФЗ, соответствие нормам и градрегламенту",
  description:
    "Сервис РостПро проверяет проектную и рабочую документацию на соответствие нормам, ИРД и ТЗ, находит коллизии и критические ошибки — 22 ₽ за лист, на время тестового режима бесплатно, отчёт до 2 рабочих дней. Помогает ГИПам и ГАПам соответствовать 309-ФЗ о личной ответственности за качество документации.",
  alternates: { canonical: "/ai" },
};

const heroStats = [
  { value: "22 ₽", label: "за лист любого формата; на время тестового режима — бесплатно" },
  { value: "До 2 рабочих дней", label: "готовый отчёт независимо от объёма проекта" },
  { value: "Отдельный раздел", label: "возможность запуска проверки отдельно взятого раздела" },
  { value: "2000 листов", label: "бесплатно в месяц для пользователей РостПро" },
];

const problems = [
  {
    problem: "Время ГИПа уходит на сверку данных между разделами",
    solution:
      "Сервис сопоставляет данные по всем разделам за один проход — вместо ручной сверки одних и тех же значений в разных документах.",
  },
  {
    problem: "Функции нормоконтроля",
    solution:
      "Поиск разночтений в проектной документации, коллизий, несоответствий нормативным актам, проверка соответствия основным проектным решениям. Улучшение качества проектной документации. Проверка субподрядчиков.",
  },
  {
    problem: "Проверка обычно возможна только по готовому комплекту",
    solution:
      "Наш сервис можно запускать с любого момента готовности проекта — не нужно ждать полный комплект документации.",
  },
];

const steps = [
  {
    title: "Загрузка документации",
    text: "Загружаете проектную или рабочую документацию — весь комплект или отдельные разделы.",
  },
  {
    title: "Экспертиза",
    text: "Сервис сопоставляет разделы между собой и проверяет их по действующим нормам и градрегламенту.",
  },
  {
    title: "Выдача результата",
    text: "Готовый отчёт в HTML: замечания сгруппированы по разделам и критичности, у каждого — ссылка на пункт нормативной документации.",
  },
  {
    title: "Выдача вариантов корректировки",
    text: "Сервис предлагает варианты исправления найденных несоответствий.",
  },
];

const personas = [
  {
    kicker: "01",
    title: "Проектные организации",
    text: "Единый стандарт проверки для всех команд: каждый проект проходит одинаковый контроль до выпуска.",
  },
  {
    kicker: "02",
    title: "Фрилансеры",
    text: "Проверяют свой раздел перед сдачей: ошибки и разночтения видно сразу, а не когда их находит экспертиза или стройка.",
  },
  {
    kicker: "03",
    title: "Заказчики",
    text: "Видят реальную готовность проекта до выхода на экспертизу или на площадку.",
  },
];

const aiDoes = [
  "Проверяет соответствие проекта действующим нормам",
  "Сверяет разделы между собой: отметки, спецификации, ТЭП, площади и т.д.",
  "Формулирует замечание со ссылкой на пункт нормы",
  "Предлагает варианты корректировки",
];

const specialistDoes = [
  "Оценивает каждое замечание",
  "Принимает проектные решения",
  "Назначает ответственных за исправления",
  "Подписывает документацию и отвечает за неё",
];

const faq = [
  {
    question: "Какую документацию проверяет сервис?",
    answer:
      "Проектную и рабочую документацию, сметы и ВОР — любые разделы: архитектурные решения, конструкции, инженерные сети, пожарная безопасность и другие.",
  },
  {
    question: "Сколько стоит проверка?",
    answer:
      "22 ₽ за лист документации любого формата — оплата по фактическому объёму. На время тестового режима проверка бесплатна.",
  },
  {
    question: "Заменяет ли это нормоконтроль и экспертизу?",
    answer:
      "Нет — это подготовка перед ними. Экспертиза смотрит документацию, а не то, в чём её готовили: процесс не меняется, кроме того, что замечаний становится меньше.",
  },
  {
    question: "Значит, нормоконтролёр больше не нужен?",
    answer:
      "Наоборот, нужен более сильный. Механическую часть — сверку и вычитку — забирает сервис, а содержательная экспертная оценка остаётся за человеком.",
  },
  {
    question: "Что если сервис ошибётся или я не согласен с замечанием?",
    answer:
      "Сервис ничего не отправляет сам — он отдаёт список замечаний специалисту, который проверяет и решает по каждому пункту. Ошибочное замечание отсеивается быстро; риск не в лишнем пункте, а в пропущенном.",
  },
  {
    question: "Может ли сервис ссылаться на несуществующие нормы?",
    answer:
      "Такое иногда случается при автоматизированной проверке. Поэтому у каждого замечания — ссылка на конкретный пункт нормы, проверить которую занимает секунды.",
  },
  {
    question: "Может ли сервис проектировать или считать конструкции?",
    answer:
      "Нет. Расчёты выполняет расчётный комплекс, за решение отвечает инженер с допуском — сервис хорошо читает документацию, но не заменяет проектирование.",
  },
  {
    question: "Насколько это безопасно для документации?",
    answer:
      "Обработка документации выполняется на локальных серверах.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function AiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Section size="lg" className="pt-8 sm:pt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-14">
            <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[var(--color-brand-blue)]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 w-72 h-72 rounded-full bg-[var(--color-brand-orange)]/15 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-[var(--color-brand-blue)] uppercase tracking-wide">
                Тестовый режим
              </span>
              <h1 className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-[var(--text-primary)]">
                Сервис проверки документации
              </h1>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Сервис проверяет проектную и рабочую документацию параллельно по всем
                разделам: соответствие нормам, противоречия между разделами и внутри каждого
                раздела — с любого момента готовности проекта.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#zayavka" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
                  Оставить заявку
                </Button>
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                На время тестового режима проверка бесплатна — до 800 листов за одну сессию.
              </p>

              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {heroStats.map((s) => (
                  <div key={s.label} className="rounded-2xl glass-soft p-5">
                    <p className="text-2xl font-extrabold text-[var(--text-primary)]">{s.value}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Why this matters */}
      <Section size="sm">
        <SectionHeading title="Зачем это нужно" align="left" />
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <Reveal key={p.problem} delay={i * 0.08}>
              <GlassCard hover={false} className="h-full">
                <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">{p.problem}</p>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{p.solution}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section size="sm">
        <SectionHeading title="Как это работает" align="left" />
        <div className="mt-10 flex flex-col lg:flex-row items-stretch gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col lg:flex-row items-stretch gap-4 flex-1 min-w-0">
              <Reveal delay={i * 0.08} className="flex-1 min-w-0">
                <GlassCard hover={false} className="h-full text-center">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-brand-blue)]">
                    Этап {i + 1}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
                </GlassCard>
              </Reveal>
              {i < steps.length - 1 && (
                <IconArrowRight className="hidden lg:block w-4 h-4 mt-8 text-[var(--color-brand-blue)]/60 shrink-0 self-start" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--text-tertiary)]">
          Решения и ответственность за исправления остаются на сотруднике.
        </p>
      </Section>

      {/* Example findings */}
      <Section size="sm">
        <SectionHeading
          eyebrow="Иллюстрация"
          title="Пример замечаний в отчёте"
          description="Фрагмент реального отчёта: документ, лист, содержание замечания, ссылка на норму и вариант корректировки."
          align="left"
        />
        <Reveal delay={0.08}>
          <ScreenshotFrame
            src="/screenshots/ai-report-example.jpg"
            alt="Пример отчёта сервиса проверки документации: таблица замечаний со ссылками на нормы и вариантами корректировки"
            className="mt-10 max-w-4xl mx-auto"
          />
        </Reveal>
      </Section>

      {/* Personas */}
      <Section>
        <SectionHeading
          eyebrow="Для кого"
          title="Кому подойдёт сервис проверки документации"
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <Reveal key={p.kicker} delay={i * 0.07}>
              <GlassCard className="h-full">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-brand-blue)]">{p.kicker}</p>
                <h3 className="mt-2 text-base font-bold text-[var(--text-primary)] leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{p.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Role split */}
      <Section size="sm">
        <SectionHeading
          eyebrow="Разделение ролей"
          title="Инструмент специалиста, а не его замена"
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <Reveal>
            <GlassCard hover={false} className="h-full">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Сервис делает</h3>
              <ul className="mt-4 space-y-3">
                {aiDoes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <IconCheck className="w-4 h-4 mt-0.5 text-[var(--color-brand-blue)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard hover={false} className="h-full">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Специалист решает</h3>
              <ul className="mt-4 space-y-3">
                {specialistDoes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <IconCheck className="w-4 h-4 mt-0.5 text-[var(--color-brand-blue)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <p className="mt-8 text-center text-sm font-medium text-[var(--text-primary)]">
            Проектные решения и ответственность остаются за специалистом.
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section size="sm">
        <SectionHeading title="Вопросы" align="left" />
        <Reveal delay={0.05}>
          <FaqAccordion items={faq} className="mt-10" />
        </Reveal>
      </Section>

      {/* Application form */}
      <Section id="zayavka">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Готовы проверить первый комплект документации?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Оставьте заявку — подключим к тестовому режиму сервиса проверки документации и
              ответим на вопросы.
            </p>
            <div className="mt-6 rounded-2xl glass-soft px-4 py-3.5">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 leading-relaxed">
                Сейчас сервис работает в тестовом режиме: проверка бесплатна, до 800 листов за одну
                сессию. Обычная цена — 22 ₽ за лист.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              heading="Заявка на проверку документации"
              description="Подключим к тестовому режиму и ответим на вопросы."
              subject="Заявка на проверку документации"
              submitLabel="Оставить заявку"
              sendWelcome={false}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
