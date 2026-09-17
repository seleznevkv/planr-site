import { useId } from "react";

type AiMarkProps = {
  className?: string;
  /** Runs the shimmer highlight across the main star. Off for tiny/inline uses. */
  animated?: boolean;
};

// Faceted (straight-edge) sparkle — deliberately not the smooth concave-curve
// silhouette used by Gemini/Copilot/Claude. Reused at three scales below to
// form one compact mark, not a scattered cluster.
const STAR = "M 0,-56 L 15,-15 L 56,0 L 15,15 L 0,56 L -15,15 L -56,0 L -15,-15 Z";

/** РостПро's AI mark: a compact lockup of three faceted sparkles with a light→orange gradient. */
export default function AiMark({ className, animated = true }: AiMarkProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `aiMarkGrad${uid}`;
  const shineId = `aiMarkShine${uid}`;
  const clipId = `aiMarkClip${uid}`;

  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label="Значок ИИ РостПро">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf6ff" />
          <stop offset="100%" stopColor="#f65414" />
        </linearGradient>
        {animated && (
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        )}
        <clipPath id={clipId}>
          <path d={STAR} />
        </clipPath>
      </defs>

      <g transform="translate(175,125) scale(0.22)" opacity="0.9">
        <path d={STAR} fill={`url(#${gradId})`} />
      </g>
      <g transform="translate(110,185) scale(0.45)" opacity="0.95">
        <path d={STAR} fill={`url(#${gradId})`} />
      </g>
      <g transform="translate(150,150)">
        <path d={STAR} fill={`url(#${gradId})`} />
        {animated && (
          <g clipPath={`url(#${clipId})`}>
            <g transform="rotate(22)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="-110 0"
                  to="110 0"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <rect x="-22" y="-90" width="44" height="180" fill={`url(#${shineId})`} />
              </g>
            </g>
          </g>
        )}
      </g>
    </svg>
  );
}
