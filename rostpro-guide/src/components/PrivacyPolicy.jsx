import { createPortal } from 'react-dom'
import { privacySections, privacyMeta } from '../privacyContent'

export default function PrivacyPolicy({ open, onClose }) {
  if (!open) return null

  return createPortal(
    <div className="privacy-overlay" onClick={onClose}>
      <div className="privacy-overlay__card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="privacy-overlay__close" onClick={onClose} aria-label="Закрыть">
          ✕
        </button>
        <div className="privacy-overlay__scroll">
          <h1>Политика обработки персональных данных</h1>
          <p className="privacy-overlay__lead">
            Действует в соответствии с Федеральным законом № 152-ФЗ «О персональных данных». Редакция от июля 2026
            года.
          </p>

          {privacySections.map((s) => (
            <section key={s.title} className="privacy-overlay__section">
              <h2>{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="privacy-overlay__footer">
            <p className="privacy-overlay__footer-title">Реквизиты Оператора</p>
            <p>{privacyMeta.legalEntity.name}</p>
            <p>
              ИНН {privacyMeta.legalEntity.inn}, КПП {privacyMeta.legalEntity.kpp}, ОГРН{' '}
              {privacyMeta.legalEntity.ogrn}
            </p>
            <p>Юридический адрес: {privacyMeta.legalEntity.address}</p>
            <p>
              По вопросам обработки персональных данных:{' '}
              <a href={`mailto:${privacyMeta.siteEmail}`}>{privacyMeta.siteEmail}</a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
