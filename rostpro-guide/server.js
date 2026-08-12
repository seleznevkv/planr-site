import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])
}

// Untrusted input can end up in email headers (from/subject) — strip CR/LF
// so a submitted value can't inject extra headers.
function sanitizeHeaderValue(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

function notificationHtml(rows) {
  return `<table style="width:100%;border-collapse:collapse;">${rows
    .map(
      ([key, value], i) =>
        `<tr style="background-color:${i % 2 ? '#f8f8f8' : 'transparent'};">` +
        `<td style="padding:10px;border:#e9e9e9 1px solid;"><b>${escapeHtml(key)}</b></td>` +
        `<td style="padding:10px;border:#e9e9e9 1px solid;">${escapeHtml(value)}</td>` +
        `</tr>`,
    )
    .join('')}</table>`
}

// Same welcome copy as planr-site's lib/emailTemplates.ts — product-level,
// not specific to how the lead found us.
function welcomeEmail(name) {
  const safeName = escapeHtml(name)
  const html = `
<div style="font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
  <p style="font-size: 16px; line-height: 1.6;">${safeName}, добрый день!</p>

  <p style="font-size: 15px; line-height: 1.6;">
    Спасибо за интерес к нашему сервису РостПро.<br>
    Мы получили вашу заявку и открыли для вас тестовый доступ, чтобы вы могли оценить все возможности платформы наглядно.
  </p>

  <p style="font-size: 16px; font-weight: 700; margin-top: 24px;">🏁 Быстрый старт</p>
  <ul style="font-size: 15px; line-height: 1.6; padding-left: 20px; margin: 0;">
    <li>Ваша демо-версия: <a href="https://demo.rostpro.tech/" style="color: #3A9CD7;">РостПро</a> — здесь вы можете протестировать интерфейс и основные функции.</li>
    <li>Документация и руководства: <a href="https://docs.rostpro.tech/" style="color: #3A9CD7;">https://docs.rostpro.tech/</a> — подробное описание всех модулей и настроек.</li>
  </ul>

  <p style="font-size: 16px; font-weight: 700; margin-top: 24px;">💡 С чего начать изучение?</p>
  <ol style="font-size: 15px; line-height: 1.6; padding-left: 20px; margin: 0;">
    <li>Откройте демо-версию сайта.</li>
    <li>Ознакомьтесь с функционалом, попробуйте самостоятельно протестировать настройки из Документации и руководства.</li>
  </ol>

  <p style="font-size: 15px; line-height: 1.6; margin-top: 24px;">
    Если в процессе изучения у вас возникнут вопросы или вы захотите обсудить полноценное внедрение под ваши задачи —
    просто ответьте на это письмо.
  </p>
</div>
`
  return { subject: 'Ответ на заявку на демонстрацию в РостПро', html }
}

const app = express()
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const body = req.body || {}
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const context = typeof body.context === 'string' ? body.context.trim() : ''
  const consent = Boolean(body.consent)

  if (!consent || !name || !phone || !email) {
    res.status(400).json({ error: 'Заполните обязательные поля формы.' })
    return
  }

  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_EMAIL_TO || 'office@rostpro.com'

  if (!host || !user || !pass) {
    console.error('[/api/contact] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS env vars.')
    res.status(500).json({ error: 'Форма временно недоступна. Попробуйте позже.' })
    return
  }

  const port = Number(process.env.SMTP_PORT || 465)
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465
  const from = process.env.SMTP_FROM || user
  const projectName = 'РостПро'

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } })

  const rows = [
    ['Имя', sanitizeHeaderValue(name)],
    ['Телефон', sanitizeHeaderValue(phone)],
    ['Почта', sanitizeHeaderValue(email)],
  ]
  if (context) rows.push(['Контекст', sanitizeHeaderValue(context)])

  const subject = context
    ? `Новая заявка с гайда РостПро — ${sanitizeHeaderValue(context)}`
    : 'Новая заявка с гайда РостПро'

  try {
    await transporter.sendMail({
      from: `${projectName} <${from}>`,
      to,
      subject,
      html: notificationHtml(rows),
    })

    // Welcome email to the applicant — best-effort, doesn't fail the request.
    if (EMAIL_RE.test(email)) {
      try {
        const { subject: welcomeSubject, html: welcomeHtml } = welcomeEmail(sanitizeHeaderValue(name))
        await transporter.sendMail({
          from: `${projectName} <${from}>`,
          to: email,
          subject: welcomeSubject,
          html: welcomeHtml,
        })
      } catch (err) {
        console.error('[/api/contact] failed to send welcome email to applicant:', err)
      }
    }
  } catch (err) {
    console.error('[/api/contact] failed to send:', err)
    res.status(502).json({ error: 'Не удалось отправить заявку. Попробуйте ещё раз.' })
    return
  }

  res.status(200).json({ ok: true })
})

app.use(express.static(path.join(__dirname, 'dist')))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 80
app.listen(port, () => {
  console.log(`rostpro-guide listening on :${port}`)
})
