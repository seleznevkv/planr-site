/**
 * Schematic illustration for GradAnaliz: a plot next to a street, the
 * setback line from the road, and the zone where a building may legally
 * be placed. Purely illustrative (not to scale), themed with CSS vars so
 * it reads correctly in both light and dark mode.
 */
export default function PlotDiagram() {
  return (
    <figure className="w-full max-w-sm mx-auto">
      <svg
        viewBox="0 0 360 250"
        className="w-full h-auto"
        role="img"
        aria-label="Условная схема: участок у улицы, красная линия по фасаду, место допустимого размещения с отступом от боковых и задней границ"
      >
        <rect x="0" y="196" width="360" height="54" fill="var(--glass-bg-soft)" />
        <text x="150" y="230" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
          улица
        </text>

        <polygon
          points="18,58 86,58 86,186 18,186"
          fill="var(--text-tertiary)"
          fillOpacity="0.12"
          stroke="var(--text-tertiary)"
          strokeOpacity="0.3"
        />
        <polygon
          points="330,70 352,70 352,186 330,186"
          fill="var(--text-tertiary)"
          fillOpacity="0.12"
          stroke="var(--text-tertiary)"
          strokeOpacity="0.3"
        />

        <polygon
          points="126,58 290,72 300,196 120,196"
          fill="var(--color-brand-blue)"
          fillOpacity="0.22"
          stroke="var(--color-brand-blue)"
          strokeWidth="1.5"
        />
        <polygon
          points="108,38 308,56 320,196 102,196"
          fill="none"
          stroke="var(--text-primary)"
          strokeOpacity="0.75"
          strokeWidth="2"
        />

        <line x1="0" y1="196" x2="360" y2="196" stroke="var(--color-brand-orange)" strokeWidth="2.5" />
        <text x="6" y="212" fontSize="10" fontWeight="700" fill="var(--color-brand-orange)" letterSpacing="0.04em">
          КРАСНАЯ ЛИНИЯ
        </text>

        <line x1="212" y1="47" x2="210" y2="66" stroke="var(--text-tertiary)" strokeWidth="1" />
        <text x="217" y="61" fontSize="10" fill="var(--text-secondary)">
          3,0
        </text>

        {[
          [108, 38],
          [308, 56],
          [320, 196],
          [102, 196],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="var(--text-primary)" />
        ))}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-[var(--text-tertiary)]">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block w-2.5 h-2.5 rounded-sm border-2 border-[var(--text-primary)]/70" />
          участок
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block w-2.5 h-2.5 rounded-sm bg-[var(--color-brand-blue)]/25 border border-[var(--color-brand-blue)]" />
          место допустимого размещения
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block w-2.5 h-[3px] rounded-sm bg-[var(--color-brand-orange)]" />
          красная линия
        </span>
        <span>условно, без масштаба</span>
      </figcaption>
    </figure>
  );
}
