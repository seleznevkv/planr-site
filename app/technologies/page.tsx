import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import {
  IconServer,
  IconCloud,
  IconLock,
  IconShield,
  IconDocument,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Безопасность РостПро — защита данных, доступ, резервное копирование, 152-ФЗ",
  description:
    "РостПро — российская платформа на серверах в РФ: резервное копирование, разграничение прав доступа на уровне полей и модулей, соответствие 152-ФЗ, электронная подпись документов.",
  alternates: { canonical: "/technologies" },
};

const infraSections = [
  {
    icon: IconServer,
    title: "Российская разработка, серверы в РФ",
    text: "РостПро — российская разработка и облачная платформа: данные компании размещены на серверах на территории России — в соответствии с требованиями 152-ФЗ о локализации персональных данных. Отечественное решение для тех, кому важно импортозамещение.",
  },
  {
    icon: IconCloud,
    title: "Резервное копирование",
    text: "Данные проекта защищены регулярным резервным копированием. Сбой инфраструктуры не означает потерю истории задач, табелей, документов и бюджета.",
  },
  {
    icon: IconLock,
    title: "Права доступа на уровне полей и модулей",
    text: "Доступ настраивается не только по ролям, но и по конкретным модулям и полям. Подрядчик не увидит финансовые данные компании, бухгалтер — лишние проекты, а заказчик в клиентском портале — внутреннюю переписку команды.",
  },
  {
    icon: IconShield,
    title: "Соответствие 152-ФЗ",
    text: "Обработка персональных данных соответствует Федеральному закону № 152-ФЗ: от локализации баз данных до порядка уведомления регулятора при инцидентах. Подробности — в политике конфиденциальности.",
  },
  {
    icon: IconDocument,
    title: "Электронная подпись (ЭЦП)",
    text: "Файлы результата подписываются коллективной электронной цифровой подписью прямо в карточке файла. Все подписанты и статус подписи видны сразу — без бумажного документооборота и очереди из кабинетов.",
  },
];

// Explicit column placement on a 6-col grid so row 2 sits centered under the
// gaps of row 1 (brick/checkerboard layout), instead of stacking under row 1.
const infraPositionClass = [
  "lg:col-start-1",
  "lg:col-start-3",
  "lg:col-start-5",
  "lg:col-start-2",
  "lg:col-start-4",
];

export default function TechnologiesPage() {
  return (
    <>
      <Section size="lg" className="pt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Безопасность"
          title="Как РостПро защищает данные проекта"
          description="Для ГИПов, ИТ-директоров и служб безопасности, которым нужно понимать не только «что делает продукт», но и как устроена защита данных под капотом."
        />
      </Section>

      <Section size="sm" className="pt-0 sm:pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {infraSections.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.06}
              className={cn("lg:col-span-2", infraPositionClass[i])}
            >
              <GlassCard className="h-full">
                <span className="w-12 h-12 rounded-2xl icon-chip flex items-center justify-center text-[var(--color-brand-blue)]">
                  <s.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-[var(--text-primary)]">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <GlassCard variant="strong" padding="lg" hover={false} className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Нужен разбор безопасности перед внедрением?
            </h2>
            <p className="mt-3 text-[var(--text-secondary)] max-w-xl mx-auto">
              Обсудим требования вашей ИТ-службы и службы безопасности на консультации.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg">Записаться на демо</Button>
              <Button href="/pricing" size="lg" variant="secondary">Смотреть тарифы</Button>
            </div>
          </GlassCard>
        </Reveal>
      </Section>
    </>
  );
}
