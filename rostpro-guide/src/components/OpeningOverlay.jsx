import { useEffect, useState } from 'react'

export default function OpeningOverlay({ rect, color, onExpanded, onFaded }) {
  const [phase, setPhase] = useState('start')

  useEffect(() => {
    const id = requestAnimationFrame(() => setPhase('expanded'))
    return () => cancelAnimationFrame(id)
  }, [])

  const style =
    phase === 'start'
      ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height, borderRadius: 16 }
      : { left: 0, top: 0, width: '100vw', height: '100vh', borderRadius: 0 }

  return (
    <div
      className={'opening-overlay' + (phase === 'fading' ? ' is-fading' : '')}
      style={{ ...style, background: color }}
      onTransitionEnd={(e) => {
        if (phase === 'expanded' && e.propertyName === 'width') {
          onExpanded()
          setPhase('fading')
        } else if (phase === 'fading' && e.propertyName === 'opacity') {
          onFaded()
        }
      }}
    />
  )
}
