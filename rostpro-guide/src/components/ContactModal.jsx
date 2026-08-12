import { useState } from 'react'
import { createPortal } from 'react-dom'

const CONTACT_EMAIL = 'office@rostpro.com'

export default function ContactModal({ context, onClose, onOpenPrivacy }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)

  if (!context) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const form = e.currentTarget
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      consent: form.consent.checked,
      context,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      setDone(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <div className="contact-modal" onClick={onClose}>
      <div className="contact-modal__card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="contact-modal__close" onClick={onClose} aria-label="Закрыть">
          ✕
        </button>

        {done ? (
          <div className="contact-modal__done">
            <p className="contact-modal__done-badge">✓ Заявка отправлена</p>
            <h3>Спасибо!</h3>
            <p>Мы получили заявку и скоро свяжемся с вами. Проверьте почту — туда придёт письмо с доступом к демо.</p>
          </div>
        ) : (
          <>
            <h3>Оставьте заявку</h3>
            <p className="contact-modal__subtitle">Ответим на все вопросы о РостПро и, если готовы, обсудим договор.</p>
            <form onSubmit={handleSubmit}>
              <input required name="name" type="text" placeholder="Введите имя" className="contact-modal__input" />
              <input required name="phone" type="tel" placeholder="Введите телефон" className="contact-modal__input" />
              <input required name="email" type="email" placeholder="Введите почту" className="contact-modal__input" />
              <label className="contact-modal__consent">
                <input required type="checkbox" name="consent" />
                <span>
                  Я согласен(-на) на обработку персональных данных в соответствии с{' '}
                  <button type="button" className="contact-modal__privacy-link" onClick={onOpenPrivacy}>
                    политикой конфиденциальности
                  </button>
                </span>
              </label>
              {error && (
                <p className="contact-modal__error">
                  Не удалось отправить заявку. Попробуйте ещё раз или напишите на{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}
              <button type="submit" className="cta-button contact-modal__submit" disabled={loading}>
                {loading ? 'Отправляем…' : 'Отправить заявку'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
