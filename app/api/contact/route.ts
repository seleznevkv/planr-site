import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/smtp";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

// Fields carried as hidden inputs by ContactForm for routing purposes only —
// they describe the email, they aren't part of the applicant's message.
const META_FIELDS = new Set(["project_name", "admin_email", "form_subject", "consent"]);

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const projectName = String(form.get("project_name") ?? siteConfig.name);
  const formSubject = String(form.get("form_subject") ?? `Новая заявка с сайта ${siteConfig.name}`);

  const rows: { key: string; value: string }[] = [];
  for (const [key, value] of form.entries()) {
    if (META_FIELDS.has(key) || typeof value !== "string" || value.trim() === "") continue;
    rows.push({ key, value: value.trim() });
  }

  if (rows.length === 0 || form.get("consent") == null) {
    return NextResponse.json({ error: "Заполните обязательные поля формы." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL_TO || siteConfig.email;

  if (!host || !user || !pass) {
    console.error("[/api/contact] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS env vars.");
    return NextResponse.json({ error: "Форма временно недоступна. Попробуйте позже." }, { status: 500 });
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const from = process.env.SMTP_FROM || user;

  const html = `<table style="width: 100%; border-collapse: collapse;">${rows
    .map(
      (r, i) =>
        `<tr style="background-color: ${i % 2 ? "#f8f8f8" : "transparent"};">` +
        `<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>${escapeHtml(r.key)}</b></td>` +
        `<td style="padding: 10px; border: #e9e9e9 1px solid;">${escapeHtml(r.value)}</td>` +
        `</tr>`
    )
    .join("")}</table>`;

  try {
    await sendMail({
      host,
      port,
      secure,
      user,
      pass,
      from: `${projectName} <${from}>`,
      to,
      subject: formSubject,
      html,
    });
  } catch (err) {
    console.error("[/api/contact] failed to send:", err);
    return NextResponse.json({ error: "Не удалось отправить заявку. Попробуйте ещё раз." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
