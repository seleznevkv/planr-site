import { useId } from "react";

type AiPulseIconProps = {
  className?: string;
};

/**
 * "Три луча" — center node with three spokes; each outer node cycles through
 * a sparkle blossom in turn, staggered 0.6s apart. Supplied directly by the
 * founder (01-three.svg) — used inline before button labels, not the
 * AiMark logo mark used elsewhere.
 */
export default function AiPulseIcon({ className }: AiPulseIconProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `aiPulseGrad${uid}`;
  const spark =
    "M0 -28C4.6 -8.4 8.4 -4.6 28 0C8.4 4.6 4.6 8.4 0 28C-4.6 8.4 -8.4 4.6 -28 0C-8.4 -4.6 -4.6 -8.4 0 -28Z";

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBBA0E" />
          <stop offset="1" stopColor="#F65414" />
        </linearGradient>
      </defs>
      <g transform="translate(0 16)">
        <path
          d="M100 100L100 34M100 100L157.2 133M100 100L42.8 133"
          fill="none"
          stroke="#3A9CD7"
          strokeOpacity=".45"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[
          { x: 100, y: 34, begin: "0s" },
          { x: 157.2, y: 133, begin: "0.6s" },
          { x: 42.8, y: 133, begin: "1.2s" },
        ].map((n) => (
          <g key={n.begin} transform={`translate(${n.x} ${n.y})`}>
            <circle r="11" fill="#3A9CD7">
              <animate
                attributeName="r"
                values="11;11;0;11;11"
                keyTimes="0;.001;.06;.22;1"
                dur="1.8s"
                begin={n.begin}
                repeatCount="indefinite"
              />
            </circle>
            <path d={spark} fill={`url(#${gradId})`} transform="scale(0)">
              <animateTransform
                attributeName="transform"
                type="scale"
                values="0;0;1;0;0"
                keyTimes="0;.001;.06;.22;1"
                dur="1.8s"
                begin={n.begin}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
        <circle cx="100" cy="100" r="15" fill="#3A9CD7" />
      </g>
    </svg>
  );
}
