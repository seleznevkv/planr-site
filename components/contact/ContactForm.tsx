"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-2xl glass-soft px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/60 transition-all";

type ContactFormProps = {
  heading?: string;
  description?: string;
  subject?: string;
  submitLabel?: string;
  /** When false, the applicant does not receive the automatic welcome email. */
  sendWelcome?: boolean;
  /** Optional extra free-text field (e.g. a cadastral number) — becomes its own row in the notification email. */
  extraField?: { name: string; placeholder: string };
  /**
   * Optional "attach documents" control, shown as plain text that opens the
   * native file picker on click. The files themselves aren't uploaded
   * anywhere (the site's email backend can't carry attachments) — only the
   * chosen file names are sent, as a plain text row, so the team knows to
   * ask the applicant for the actual documents.
   */
  fileField?: { name: string; label: string };
};

export default function ContactForm({
  heading = "Оставьте заявку",
  description = "Ответим на все вопросы о РостПро и, если готовы, обсудим договор.",
  subject = "Новая заявка с сайта РостПро",
  submitLabel = "Записаться на консультацию",
  sendWelcome = true,
  extraField,
  fileField,
}: ContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // project_name / admin_email / form_subject are stripped out server-side
  // by app/api/contact/route.ts and everything else becomes a row in the
  // notification email.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const phoneInput = form.elements.namedItem("Телефон") as HTMLInputElement;
    const digits = phoneInput.value.replace(/\D/g, "");

    // The country/trunk code takes up one digit either way (7 or 8), so a
    // number written with it needs 11 digits total; written without any
    // prefix (just the subscriber number) it needs exactly 10.
    const phoneValid = digits.startsWith("7") || digits.startsWith("8") ? digits.length === 11 : digits.length === 10;
    if (!phoneValid) {
      setPhoneError(true);
      phoneInput.focus();
      return;
    }
    setPhoneError(false);
    setLoading(true);

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
      <h3 className="text-xl font-bold text-[var(--text-primary)]">{heading}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{description}</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="hidden" name="project_name" value={siteConfig.name} />
        <input type="hidden" name="admin_email" value={siteConfig.email} />
        <input type="hidden" name="form_subject" value={subject} />
        {!sendWelcome && <input type="hidden" name="skip_welcome" value="1" />}

        <input required name="Имя" type="text" placeholder="Введите имя" className={inputClass} />
        <div>
          <input
            required
            name="Телефон"
            type="tel"
            inputMode="tel"
            placeholder="Введите телефон"
            minLength={10}
            maxLength={18}
            onChange={() => phoneError && setPhoneError(false)}
            className={inputClass}
          />
          {phoneError && (
            <p className="mt-2 text-xs text-[var(--color-brand-orange)]">
              Проверьте номер телефона: 11 цифр с 8 или +7, либо 10 цифр без кода страны.
            </p>
          )}
        </div>
        <input required name="Почта" type="email" placeholder="Введите почту" className={inputClass} />
        {extraField && (
          <input name={extraField.name} type="text" placeholder={extraField.placeholder} className={inputClass} />
        )}
        {fileField && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))}
            />
            <input type="hidden" name={fileField.name} value={fileNames.join(", ")} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-2xl glass-soft px-4 py-3.5 text-left text-sm text-[var(--color-brand-blue)] underline decoration-dotted underline-offset-4 transition-colors hover:text-[var(--color-brand-blue)]/80"
            >
              {fileNames.length ? `Прикреплено: ${fileNames.join(", ")}` : fileField.label}
            </button>
          </div>
        )}
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
          {loading ? "Отправляем…" : submitLabel}
        </Button>
      </form>
    </GlassCard>
  );
}
