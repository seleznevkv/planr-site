import { useEffect, useRef, useState } from 'react'

function ShotFigure({ img, caption, heading, onImageClick }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className="feature-block__shot">
      <div className="browser-frame">
        <span />
        <span />
        <span />
      </div>
      {failed ? (
        <div className="shot-error">Скриншот временно не загрузился. Обновите страницу или попробуйте позже.</div>
      ) : (
        <button
          type="button"
          className="shot-zoom"
          onClick={() => onImageClick({ src: img, caption })}
          aria-label="Увеличить скриншот"
        >
          <img src={img} alt={heading || caption} loading="lazy" onError={() => setFailed(true)} />
          <span className="shot-zoom__hint">Увеличить</span>
        </button>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function StepContent({ step, onImageClick, onOpenContact }) {
  switch (step.type) {
    case 'cover':
      return (
        <div className="step-cover">
          <p className="eyebrow">{step.eyebrow}</p>
          <h1>{step.title}</h1>
          {step.subtitle && <p className="step-cover__subtitle">{step.subtitle}</p>}
        </div>
      )

    case 'pain':
      return (
        <div className="step-pain">
          {step.painLead && <p className="step-pain__lead">{step.painLead}</p>}
          {step.quote && (
            <blockquote>
              <p>«{step.quote.text}»</p>
              <cite>— {step.quote.source}</cite>
            </blockquote>
          )}
        </div>
      )

    case 'intro':
      return (
        <div className="step-intro">
          <p>{step.text}</p>
        </div>
      )

    case 'trust':
      return (
        <div className="step-trust">
          <span className="step-trust__badge">✓</span>
          <div>
            <p className="step-trust__heading">{step.heading}</p>
            <p className="step-trust__text">{step.text}</p>
          </div>
        </div>
      )

    case 'feature':
      return (
        <div className="step-feature">
          {step.heading && <h2>{step.heading}</h2>}
          <p>{step.text}</p>
          {step.img ? (
            <ShotFigure
              img={step.img}
              caption={step.caption}
              heading={step.heading}
              onImageClick={onImageClick}
            />
          ) : (
            <div className="shot-pending">
              <span>Скриншот уточняется</span>
              {step.caption && <p>{step.caption}</p>}
            </div>
          )}
        </div>
      )

    case 'objections':
      return (
        <div className="step-objections">
          <h2>Частые сомнения</h2>
          {step.items.map((o) => (
            <div className="objection" key={o.q}>
              <p className="objection__q">{o.q}</p>
              <p className="objection__a">{o.a}</p>
            </div>
          ))}
          {step.ctaLabel && (
            <div className="step-objections__cta">
              <button type="button" className="cta-button cta-button--compact" onClick={onOpenContact}>
                {step.ctaLabel}
              </button>
            </div>
          )}
        </div>
      )

    case 'notblock':
      return (
        <div className="not-block">
          <h2>{step.heading}</h2>
          <p>{step.text}</p>
        </div>
      )

    case 'outro':
      return (
        <div className="step-outro">
          <p className="step-outro__badge">✓ Вы прошли весь путь</p>
          <button type="button" className="cta-button" onClick={onOpenContact}>
            {step.ctaLabel}
          </button>
          <p className="persona__cta-note">{step.ctaNote}</p>
        </div>
      )

    case 'softoutro':
      return (
        <div className="step-outro step-outro--soft">
          <p className="step-outro__badge step-outro__badge--soft">✓ Вы дочитали до конца</p>
          <p className="soft-action">{step.text}</p>
        </div>
      )

    default:
      return null
  }
}

export default function StepGuide({ steps, color, onImageClick, onOpenContact }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const touchStartX = useRef(null)

  const goTo = (i, direction) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, i))
    if (clamped === index) return
    setDir(direction ?? (clamped > index ? 1 : -1))
    setIndex(clamped)
  }

  const next = () => goTo(index + 1, 1)
  const prev = () => goTo(index - 1, -1)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 60) {
      if (dx < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === steps.length - 1

  return (
    <div className="guide" style={{ '--role-color': color }}>
      <div className="guide__progress">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            className={
              'guide__dot' + (i === index ? ' is-active' : '') + (i < index ? ' is-done' : '')
            }
            onClick={() => goTo(i)}
            aria-label={`Шаг ${i + 1} из ${steps.length}`}
          />
        ))}
      </div>

      <div className="guide__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          key={index}
          className={'guide__step guide__step--' + step.type + (dir > 0 ? ' enter-right' : ' enter-left')}
        >
          <StepContent step={step} onImageClick={onImageClick} onOpenContact={onOpenContact} />
        </div>
      </div>

      <div className="guide__nav">
        <button type="button" className="guide__nav-btn" onClick={prev} disabled={isFirst}>
          ← Назад
        </button>
        <span className="guide__nav-count">
          {index + 1} / {steps.length}
        </span>
        {!isLast ? (
          <button type="button" className="guide__nav-btn guide__nav-btn--primary" onClick={next}>
            Далее →
          </button>
        ) : (
          <span className="guide__nav-spacer" />
        )}
      </div>
    </div>
  )
}
