const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Sent to the applicant themselves right after they submit the contact form. */
export function welcomeEmail(name: string) {
  const safeName = escapeHtml(name);

  const html = `
<div style="font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
  <p style="font-size: 16px; line-height: 1.6;">${safeName}, добрый день!</p>

  <p style="font-size: 15px; line-height: 1.6;">
    Спасибо за интерес к нашему сервису РостПро.<br>
    Мы получили вашу заявку и открыли для вас тестовый доступ, чтобы вы могли оценить все возможности платформы наглядно.
  </p>

  <p style="font-size: 16px; font-weight: 700; margin-top: 24px;">🏁 Быстрый старт</p>
  <ul style="font-size: 15px; line-height: 1.6; padding-left: 20px; margin: 0;">
    <li>Ваша демо-версия: <a href="https://demo.planr.cloud/login" style="color: #3A9CD7;">РостПро</a> — здесь вы можете протестировать интерфейс и основные функции.</li>
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
`;

  return { subject: "Ответ на заявку", html };
}
