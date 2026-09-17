import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import PlotDiagram from "@/components/graphics/PlotDiagram";
import AiMark from "@/components/graphics/AiMark";
import ContactForm from "@/components/contact/ContactForm";
import { IconArrowRight, IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ГрадАнализ — предпроектная оценка участка по кадастровому номеру",
  description:
    "ГрадАнализ — предпроектная оценка участка по кадастровому номеру: сервис собирает данные из ЕГРН, ПЗЗ, генплана и зон с особыми условиями, считает максимальные законные параметры застройки и выдаёт отчёт PDF — с источником у каждой цифры.",
  alternates: { canonical: "/grad-analiz" },
};

const flow = [
  { label: "Вход", text: "кадастровый номер участка" },
  { label: "Анкета", text: "что строим, нужна ли подземная часть" },
  { label: "Выход", text: "отчёт PDF со схемами" },
];

const heroStats = [
  { value: "7 направлений", label: "сервис параллельно собирает сведения по участку из разных источников" },
  { value: "3 сценария площади", label: "«гарантированно», «база» и «верхний» — с учётом законных мер увеличения" },
  { value: "Источник у цифры", label: "документ, редакция и пункт — или адрес страницы и дата обращения" },
  { value: "Отчёт PDF", label: "со схемами и выкопировками из ГПЗУ и карт" },
];

const personas = [
  {
    kicker: "01",
    title: "Девелоперы",
    text: "Перед покупкой участка и стартом проектирования — знать реальные параметры, а не полагаться на устную оценку.",
  },
  {
    kicker: "02",
    title: "Инвесторы и собственники земли",
    text: "Понять, что участок реально позволяет построить и чем рискует сделка, прежде чем в неё входить.",
  },
  {
    kicker: "03",
    title: "Градостроительные и проектные бюро",
    text: "Быстрее готовить предпроектные заключения — с источником у каждой цифры, который можно перепроверить.",
  },
];

const reportContents = [
  "Максимальные параметры — вид использования, этажность, процент застройки, место допустимого размещения на схеме",
  "Посадка здания в двух вариантах и технико-экономические показатели: общая площадь, подземная часть, машино-места",
  "Три уровня площади — «гарантированно», «база» и «верхний» сценарий",
  "Ограничения — памятники и их зоны, охранные зоны сетей, приаэродромные территории: что запрещено, а что требует условий",
  "Окружение — транспорт, школы и сады для жилья, застройка вокруг",
  "История участка — торги, суды, разрешения, продажи",
  "Как законно увеличить площадь — отклонения, условно разрешённый вид, изменения правил, с вероятностью и сроком",
  "Риски и список «что подтвердить и заказать» — какие документы нужны дальше",
];

const steps = [
  {
    title: "Анкета",
    text: "Что строим, целевые параметры, нужен ли паркинг.",
  },
  {
    title: "Сбор",
    text: "Сервис параллельно собирает сведения по семи направлениям — ГПЗУ, кадастровые сведения, регламент, данные о памятниках, зоны с особыми условиями, окружение и историю участка — и отдельно сверяет актуальность нормативов.",
  },
  {
    title: "Анализ",
    text: "Сводит расхождения источников, выбирает вид использования, считает место допустимого размещения.",
  },
  {
    title: "Посадка и ТЭП",
    text: "Два варианта посадки здания, подземная часть, машино-места, сравнение реконструкции и нового строительства.",
  },
  {
    title: "Меры",
    text: "Законные способы повысить площадь — у каждой меры указаны основание, эффект и вероятность.",
  },
  {
    title: "Проверка",
    text: "Сервис в два прохода независимо перепроверяет источники, арифметику и редакции документов.",
  },
  {
    title: "Отчёт",
    text: "Готовый файл PDF со схемами и выкопировками из ГПЗУ и карт.",
  },
];

const differentiators = [
  {
    title: "Максимум, а не осторожная оценка",
    text: "База — предельные параметры по регламенту. Спорные и строгие трактовки уходят в раздел рисков, а не занижают итоговую цифру.",
  },
  {
    title: "Источник у каждой цифры",
    text: "Документ, редакция и пункт — или адрес страницы и дата обращения. Факт без источника в отчёт не попадает.",
  },
  {
    title: "Пробелы на виду",
    text: "То, что не удалось получить, — отдельным списком: где искали и какой документ стоит заказать.",
  },
  {
    title: "Проверяет не автор",
    text: "Отдельная проверка ищет ошибки в расчётах и ссылках до того, как отчёт уходит клиенту.",
  },
  {
    title: "Меры с вероятностью",
    text: "Верхний сценарий складывается только из мер с высокой и средней вероятностью — без обещаний.",
  },
];

const caseStats = [
  { value: "2 676,7 м²", label: "общая площадь, сценарий «база»" },
  { value: "2 820,1 м²", label: "верхний сценарий" },
  { value: "5 эт.", label: "вместо 8 по регламенту — из-за режима зоны охраны памятника" },
  { value: "2 ч 34 мин", label: "заняла работа сервиса" },
];

const caseBullets = [
  "Регламент зоны разрешал 8 этажей, но режим зоны охраны памятника ограничил здание пятью — без этого площадь в отчёте была бы завышена почти вдвое.",
  "Пожарные машины подъезжают только с улицы, поэтому пятно здания — 289 м², а не 392 м², которые дал бы процент застройки.",
  "Реконструкция существующего здания дала на 1 142 м² больше, чем снос и новое строительство, — при условии подать заявление на разрешение, пока действует ГПЗУ.",
  "Итог — отчёт на 16 таблиц и 7 схем и список документов, которые нужно заказать дальше.",
];

const faq = [
  {
    question: "Это юридическое заключение или гарантия согласования?",
    answer:
      "Нет. Это предпроектная оценка участка — максимальные параметры по действующим документам. Решения по согласованию принимают органы власти.",
  },
  {
    question: "Отчёт заменяет ГПЗУ?",
    answer: "Нет — ГПЗУ является основой, на которой строится расчёт.",
  },
  {
    question: "Всё происходит полностью автоматически?",
    answer:
      "Не полностью: часть источников закрыта, топосъёмку и технические условия клиент заказывает сам.",
  },
  {
    question: "Что если по участку не удалось найти часть сведений?",
    answer:
      "Пробелы попадают в отчёт отдельным списком — с указанием, где искали и какой документ стоит заказать, а не молча занижают итоговую цифру.",
  },
  {
    question: "Почему в отчёте несколько сценариев площади, а не одна цифра?",
    answer:
      "«Гарантированно» и «база» — то, что можно уверенно посчитать по регламенту. «Верхний» сценарий добавляет законные способы увеличить площадь — с вероятностью и сроком по каждой мере.",
  },
  {
    question: "Кто проверяет расчёт перед тем, как отчёт уходит клиенту?",
    answer:
      "Сервис в два прохода независимо перепроверяет источники, арифметику и актуальность редакций документов — до передачи отчёта дальше.",
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ГрадАнализ",
  serviceType: "Предпроектная оценка земельного участка",
  description:
    "Предпроектная оценка участка по кадастровому номеру: максимальные законные параметры застройки, ограничения и риски, отчёт PDF с источником у каждой цифры.",
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: "RU",
  url: `${siteConfig.url}/grad-analiz`,
};

export default function GradAnalizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }}
      />
      <Section size="lg" className="pt-8 sm:pt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-14">
            <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[var(--color-brand-blue)]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 w-72 h-72 rounded-full bg-[var(--color-brand-orange)]/15 blur-3xl" />

            <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-[var(--color-brand-blue)] uppercase tracking-wide">
                  <AiMark className="w-4 h-4" animated={false} />
                  ГрадАнализ
                </span>
                <h1 className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight text-[var(--text-primary)]">
                  Что можно построить на участке{" "}
                  <span className="inline-block align-middle rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    новое
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  Сервис собирает сведения из государственных источников по кадастровому
                  номеру, считает максимальные законные параметры застройки и выдаёт отчёт PDF для
                  девелопера — с источником у каждой цифры.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {flow.map((f, i) => (
                    <div key={f.label} className="contents">
                      <div className="rounded-xl glass-soft px-4 py-2.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wide text-[var(--color-brand-blue)]">
                          {f.label}
                        </span>
                        <span className="text-sm text-[var(--text-secondary)]">{f.text}</span>
                      </div>
                      {i < flow.length - 1 && (
                        <IconArrowRight className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href="#zayavka" size="lg" icon={<IconArrowRight className="w-4 h-4" />}>
                    Оставить заявку
                  </Button>
                </div>
              </div>

              <PlotDiagram />
            </div>

            <div className="relative mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-2xl glass-soft p-5">
                  <p className="text-2xl font-extrabold text-[var(--text-primary)]">{s.value}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Application form */}
      <Section id="zayavka" size="sm">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Хотите узнать, что можно построить на вашем участке?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Оставьте заявку — покажем пример отчёта и ответим на вопросы про ГрадАнализ.
            </p>
            <div className="mt-6 rounded-2xl glass-soft px-4 py-3.5">
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                Для расчёта укажите кадастровый номер участка или приложите документы.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
                <li>
                  <span className="font-semibold text-[var(--text-primary)]">Идеально:</span> ГПЗУ и
                  топосъёмка М 1:500
                </li>
                <li>
                  <span className="font-semibold text-[var(--text-primary)]">Минимум:</span>{" "}
                  кадастровый номер
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              heading="Заявка на анализ участка"
              description="Укажите кадастровый номер или приложите документы."
              subject="Заявка на анализ участка (ГрадАнализ)"
              submitLabel="Оставить заявку"
              sendWelcome={false}
              extraField={{
                name: "Кадастровый номер",
                placeholder: "Введите кадастровый номер участка",
              }}
              fileField={{
                name: "Прикреплённые файлы",
                label: "Прикрепить документы — ГПЗУ, топосъёмка М 1:500 или другие",
              }}
            />
          </Reveal>
        </div>
      </Section>

      {/* Problem */}
      <Section size="sm">
        <SectionHeading title="Задача" align="left" />
        <Reveal delay={0.05}>
          <GlassCard hover={false} className="mt-10">
            <p className="text-base font-bold text-[var(--text-primary)] leading-snug">
              Прежде чем платить за участок или проект, нужно знать, что здесь законно можно
              построить.
            </p>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Ответ разбросан по десяткам источников: ЕГРН, правила землепользования и застройки,
              генплан, проекты планировки, режимы зон охраны памятников, охранные зоны сетей,
              приаэродромные территории, своды правил. Собрать их, свести противоречия и посчитать
              реальную площадь объекта вручную — долгая работа специалиста, и ошибка в ней стоит
              денег.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      {/* Personas */}
      <Section size="sm">
        <SectionHeading eyebrow="Для кого" title="Кому подойдёт ГрадАнализ" align="left" />
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

      {/* Report contents */}
      <Section size="sm">
        <SectionHeading eyebrow="Результат" title="Что в отчёте" align="left" />
        <Reveal delay={0.05}>
          <GlassCard hover={false} className="mt-10">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {reportContents.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <IconCheck className="w-4 h-4 mt-0.5 text-[var(--color-brand-blue)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </Section>

      {/* How it works */}
      <Section size="sm">
        <SectionHeading title="Как устроено" align="left" />
        <div className="mt-10 space-y-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <GlassCard hover={false} className="flex items-start gap-5">
                <span className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-brand-blue)]/15 text-[var(--color-brand-blue)] font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Differentiators */}
      <Section size="sm">
        <SectionHeading eyebrow="Чем отличается" title="Что делает отчёт надёжным" align="left" />
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <GlassCard hover={false} className="h-full">
                <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">{d.title}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{d.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Example */}
      <Section size="sm">
        <SectionHeading
          eyebrow="Пример"
          title="Участок 560 м² в историческом центре областного города"
          description="Обезличенный пример из рабочего прогона."
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {caseStats.map((s) => (
            <Reveal key={s.label}>
              <div className="rounded-2xl glass-soft p-5 h-full">
                <p className="text-2xl font-extrabold text-[var(--text-primary)]">{s.value}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)] leading-snug">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08}>
          <ul className="mt-8 space-y-3 max-w-3xl">
            {caseBullets.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                <IconCheck className="w-4 h-4 mt-0.5 text-[var(--color-brand-blue)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-6 text-xs text-[var(--text-tertiary)]">
          Показывать этот пример публично можно только с согласия заказчика.
        </p>
      </Section>

      {/* FAQ */}
      <Section size="sm">
        <SectionHeading title="Вопросы" align="left" />
        <Reveal delay={0.05}>
          <FaqAccordion items={faq} className="mt-10" />
        </Reveal>
      </Section>

    </>
  );
}
