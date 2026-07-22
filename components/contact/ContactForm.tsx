"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-2xl glass-soft px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/60 transition-all";

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // project_name / admin_email / form_subject are stripped out server-side
  // by app/api/contact/route.ts and everything else becomes a row in the
  // notification email.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;

    try {
      const res = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error("request failed");
      form.reset();
      router.push("/thank-you");
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <GlassCard variant="strong" padding="lg" hover={false}>
      <h3 className="text-xl font-bold text-[var(--text-primary)]">Оставьте заявку</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Расскажем о PlanR и покажем платформу на демо-звонке за 20 минут.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="hidden" name="project_name" value={siteConfig.name} />
        <input type="hidden" name="admin_email" value={siteConfig.email} />
        <input type="hidden" name="form_subject" value="Новая заявка с сайта PlanR" />

        <input required name="Имя" type="text" placeholder="Введите имя" className={inputClass} />
        <input required name="Телефон" type="tel" placeholder="Введите телефон" className={inputClass} />
        <input required name="Почта" type="email" placeholder="Введите почту" className={inputClass} />
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input type="checkbox" required name="consent" className="peer sr-only" />
          <span className="mt-0.5 w-5 h-5 shrink-0 rounded-md icon-chip flex items-center justify-center text-transparent transition-colors peer-checked:bg-[var(--color-brand-blue)] peer-checked:border-[var(--color-brand-blue)] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand-blue)]/60">
            <IconCheck className="w-3.5 h-3.5" strokeWidth={3} />
          </span>
          <span className="text-xs text-[var(--text-tertiary)] leading-relaxed">
            Я согласен(-на) на обработку персональных данных в соответствии с{" "}
            <a href="/privacy" className="text-[var(--color-brand-blue)] hover:underline">
              политикой конфиденциальности
            </a>
          </span>
        </label>
        {error && (
          <p className="text-xs text-[var(--color-brand-orange)]">
            Не удалось отправить заявку. Попробуйте ещё раз или напишите на{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
            .
          </p>
        )}
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Отправляем…" : "Записаться на демо"}
        </Button>
      </form>
    </GlassCard>
  );
}
