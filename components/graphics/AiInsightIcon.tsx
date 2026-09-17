import { useId } from "react";

type AiInsightIconProps = {
  className?: string;
};

const NODES = [
  { x: 100, y: 30, begin: 0.0 },
  { x: 160.6, y: 65, begin: 0.4 },
  { x: 160.6, y: 135, begin: 0.8 },
  { x: 100, y: 170, begin: 1.2 },
  { x: 39.4, y: 135, begin: 1.6 },
  { x: 39.4, y: 65, begin: 2.0 },
];

const SPARK = "M0 -24C4 -7.2 7.2 -4 24 0C7.2 4 4 7.2 0 24C-4 7.2 -7.2 4 -24 0C-7.2 -4 -4 -7.2 0 -24Z";

/**
 * "Озарение" — hexagonal network; a pulse travels from the center to each
 * node in turn, and the node blooms into a spark on arrival. Supplied
 * directly by the founder (04-insight.svg).
 */
export default function AiInsightIcon({ className }: AiInsightIconProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const coreId = `aiInsightCore${uid}`;
  const sparkId = `aiInsightSpark${uid}`;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      <defs>
        <radialGradient id={coreId} cx=".35" cy=".35" r=".8">
          <stop offset="0" stopColor="#8FD3FF" />
          <stop offset="1" stopColor="#3A9CD7" />
        </radialGradient>
        <linearGradient id={sparkId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBBA0E" />
          <stop offset="1" stopColor="#F65414" />
        </linearGradient>
      </defs>

      <g stroke="#3A9CD7" strokeOpacity=".4" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M100 100L100 30M100 100L160.6 65M100 100L160.6 135M100 100L100 170M100 100L39.4 135M100 100L39.4 65" />
        <path d="M100 30 160.6 65 160.6 135 100 170 39.4 135 39.4 65Z" />
      </g>

      <g fill="#F65414">
        {NODES.map((n) => (
          <circle key={`dot-${n.begin}`} r="6" opacity="0">
            <animateMotion
              path={`M100 100L${n.x} ${n.y}`}
              dur="2.4s"
              begin={`${n.begin}s`}
              repeatCount="indefinite"
              keyPoints="0;1;1"
              keyTimes="0;0.3;1"
              calcMode="linear"
            />
            <animate
              attributeName="opacity"
              values="1;1;0;0"
              keyTimes="0;0.28;0.3;1"
              dur="2.4s"
              begin={`${n.begin}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {NODES.map((n) => (
        <g key={`node-${n.begin}`} transform={`translate(${n.x} ${n.y})`}>
          <circle r="12" fill="#3A9CD7">
            <animate
              attributeName="r"
              values="12;12;4;12;12"
              keyTimes="0;.28;.34;.5;1"
              dur="2.4s"
              begin={`${n.begin}s`}
              repeatCount="indefinite"
            />
          </circle>
          <path d={SPARK} fill={`url(#${sparkId})`} transform="scale(0)">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;0;1;0;0"
              keyTimes="0;.28;.34;.5;1"
              dur="2.4s"
              begin={`${n.begin}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      ))}

      <circle cx="100" cy="100" r="20" fill={`url(#${coreId})`}>
        <animate attributeName="r" values="20;23;20" dur=".8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
