"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { pricingPlans } from "@/lib/content";

const teamPlan = pricingPlans.find((p) => p.id === "team")!;

const fieldClass =
  "w-full rounded-2xl glass-soft px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/60 transition-all";

const rub = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export default function RoiCalculator() {
  const [employees, setEmployees] = useState(15);
  const [rate, setRate] = useState(900);
  const [hours, setHours] = useState(6);

  const { monthlySavings, paybackDays } = useMemo(() => {
    const savings = Math.max(employees, 0) * Math.max(hours, 0) * Math.max(rate, 0);
    const dailySavings = savings / 30;
    const days = dailySavings > 0 ? Math.ceil(teamPlan.price / dailySavings) : null;
    return { monthlySavings: savings, paybackDays: days };
  }, [employees, rate, hours]);

  return (
    <GlassCard variant="strong" padding="lg" hover={false} className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-[var(--text-secondary)] mb-2">
            Сотрудников в проектной работе
            <span className="text-[var(--text-primary)] font-bold">{employees}</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full accent-[var(--color-brand-blue)]"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-[var(--text-secondary)] mb-2">
            Средняя ставка часа, ₽
            <span className="text-[var(--text-primary)] font-bold">{rub.format(rate)} ₽</span>
          </label>
          <input
            type="range"
            min={200}
            max={3000}
            step={50}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[var(--color-brand-blue)]"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-[var(--text-secondary)] mb-2">
            Часов в месяц на ручную отчётность (на человека)
            <span className="text-[var(--text-primary)] font-bold">{hours} ч</span>
          </label>
          <input
            type="range"
            min={0}
            max={40}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-[var(--color-brand-blue)]"
          />
        </div>
        <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
          Это ориентировочный расчёт для оценки порядка цифр, а не финансовое обязательство: реальная
          экономия зависит от процессов вашей команды.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center glass-soft rounded-2xl p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
          Экономия рабочего времени
        </p>
        <p className="mt-3 text-4xl font-extrabold text-gradient">
          ≈ {rub.format(monthlySavings)} ₽<span className="text-lg">/мес</span>
        </p>
        <div className="w-full h-px bg-[var(--glass-border-soft)] my-6" />
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
          Тариф «Команда» окупается за
        </p>
        <p className="mt-3 text-4xl font-extrabold text-[var(--text-primary)]">
          {paybackDays !== null ? `${paybackDays} дн.` : "—"}
        </p>
      </div>
    </GlassCard>
  );
}
