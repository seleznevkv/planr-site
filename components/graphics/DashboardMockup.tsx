import {
  IconTasks,
  IconBudget,
  IconClock,
  IconTeam,
  IconReports,
  IconDocument,
  IconLayers,
} from "@/components/icons";

const sidebarIcons = [IconLayers, IconTasks, IconBudget, IconTeam, IconClock, IconReports, IconDocument];

const revenueBars = [38, 52, 46, 64, 58, 72, 68, 80];

const projectShare = [
  { label: "Проект A", value: 34, color: "var(--color-brand-blue)" },
  { label: "Проект B", value: 26, color: "var(--color-brand-amber)" },
  { label: "Проект C", value: 20, color: "var(--color-brand-orange)" },
  { label: "Другие", value: 20, color: "rgba(255,255,255,0.25)" },
];

const projectRows = [
  { name: "Жилой комплекс", stage: "Проектирование", budget: "19 300 000 ₽", status: "В графике" },
  { name: "Бизнес-центр", stage: "Рабочая документация", budget: "8 200 000 ₽", status: "В графике" },
  { name: "ТЦ на Ленинском", stage: "Стадия П", budget: "6 700 000 ₽", status: "Риск" },
];

function conicGradient() {
  let acc = 0;
  const stops = projectShare.map((p) => {
    const start = (acc / 100) * 360;
    acc += p.value;
    const end = (acc / 100) * 360;
    return `${p.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

/** Stylized dashboard screenshot mockup used in the hero, built with HTML/CSS glass surfaces. */
export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div className="glass-strong rounded-[28px] p-3 sm:p-4 shadow-2xl flex gap-3">
        {/* icon sidebar */}
        <div className="hidden sm:flex flex-col items-center gap-3 glass-soft rounded-2xl py-4 px-2.5 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-navy)] mb-1" />
          {sidebarIcons.map((Icon, i) => (
            <span
              key={i}
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                i === 0 ? "bg-[var(--glass-bg-strong)] text-[var(--color-brand-blue)]" : "text-[var(--text-tertiary)]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          {/* window chrome */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-orange)]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-amber)]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-blue)]/70" />
            <span className="ml-3 text-xs font-medium text-[var(--text-tertiary)] truncate">
              PlanR · Дашборд
            </span>
          </div>

          {/* top stat row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Доход", value: "125,8 млн ₽" },
              { label: "Прибыль", value: "32,4 млн ₽" },
              { label: "Маржа", value: "25,8%" },
              { label: "Загрузка", value: "78%" },
            ].map((s) => (
              <div key={s.label} className="icon-chip rounded-xl px-2 py-2">
                <p className="text-[8px] sm:text-[9px] text-[var(--text-tertiary)] truncate">{s.label}</p>
                <p className="text-[10px] sm:text-xs font-bold text-[var(--text-primary)] truncate">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2.5 mt-2.5">
            {/* revenue bar chart */}
            <div className="glass-soft rounded-2xl p-3">
              <p className="text-[9px] sm:text-[10px] font-semibold text-[var(--text-secondary)] mb-2.5">
                Выручка по месяцам
              </p>
              <div className="flex items-end gap-1.5 h-20">
                {revenueBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-[var(--color-brand-blue)] to-[var(--color-brand-blue)]/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* donut */}
            <div className="glass-soft rounded-2xl p-3 flex flex-col items-center justify-center w-[104px] shrink-0">
              <div className="w-16 h-16 rounded-full relative" style={{ background: conicGradient() }}>
                <div className="absolute inset-2 rounded-full icon-chip flex items-center justify-center">
                  <span className="text-[9px] font-bold text-[var(--text-primary)]">100%</span>
                </div>
              </div>
              <p className="text-[8px] text-[var(--text-tertiary)] text-center mt-2 leading-tight">
                Прибыль
                <br />
                по проектам
              </p>
            </div>
          </div>

          {/* projects table */}
          <div className="glass-soft rounded-2xl mt-2.5 overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--glass-border-soft)]">
              <p className="text-[9px] sm:text-[10px] font-semibold text-[var(--text-secondary)]">Мои проекты</p>
            </div>
            <div>
              {projectRows.map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between gap-2 px-3 py-1.5 text-[8px] sm:text-[9px] border-b border-[var(--glass-border-soft)] last:border-0"
                >
                  <span className="text-[var(--text-primary)] font-medium truncate flex-1">{r.name}</span>
                  <span className="text-[var(--text-tertiary)] hidden sm:inline truncate flex-1">{r.stage}</span>
                  <span className="text-[var(--text-secondary)] truncate">{r.budget}</span>
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded-full font-semibold ${
                      r.status === "Риск"
                        ? "text-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]/10"
                        : "text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/10"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating notification chips */}
      <div className="hidden sm:flex absolute -right-6 -top-6 glass-strong rounded-2xl px-4 py-3 items-center gap-3 shadow-xl animate-float">
        <span className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)]/20 flex items-center justify-center text-[var(--color-brand-blue)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div>
          <p className="text-xs font-semibold text-[var(--text-primary)]">Табель закрыт</p>
          <p className="text-[10px] text-[var(--text-tertiary)]">Отдел монтажа · сегодня</p>
        </div>
      </div>

      <div
        className="hidden sm:flex absolute -left-6 -bottom-6 glass-strong rounded-2xl px-4 py-3 items-center gap-3 shadow-xl animate-float"
        style={{ animationDelay: "-3s" }}
      >
        <span className="w-8 h-8 rounded-full bg-[var(--color-brand-orange)]/15 flex items-center justify-center text-[var(--color-brand-orange)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.7 3.86a2 2 0 0 0-3.4 0Z" />
          </svg>
        </span>
        <div>
          <p className="text-xs font-semibold text-[var(--text-primary)]">Риск превышения бюджета</p>
          <p className="text-[10px] text-[var(--text-tertiary)]">Этап «Монтаж» · +8%</p>
        </div>
      </div>
    </div>
  );
}
