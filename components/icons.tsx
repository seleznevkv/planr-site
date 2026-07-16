import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconTasks(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <path d="M8 2v4M16 2v4M3 10h18" />
      <path d="m8 15 2.2 2L16 12" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconBudget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h14a4 4 0 0 1 4 4v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      <path d="M3 7a2 2 0 0 1 2-2h10" />
      <circle cx="15" cy="13" r="1.8" />
    </svg>
  );
}

export function IconTeam(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6.1" />
      <path d="M18.6 13.4a6.2 6.2 0 0 1 3.6 5.6" />
    </svg>
  );
}

export function IconReports(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

export function IconIntegrations(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
      <rect x="8" y="8" width="8" height="8" rx="2" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 6v6c0 4.6 3.2 8.3 8 9 4.8-.7 8-4.4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.7 3.86a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function IconTrendUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function IconPuzzle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h4a1 1 0 0 1 1 1v2.2a1.8 1.8 0 1 0 0 3.6V12a1 1 0 0 1-1 1h-2.2a1.8 1.8 0 1 1-3.6 0H5a1 1 0 0 1-1-1V9.8a1.8 1.8 0 1 0 0-3.6V4a1 1 0 0 1 1-1h4Z" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.6 21 3 14.4 3 6a2 2 0 0 1 1-2Z" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="10" height="18" rx="1" />
      <path d="M14 8h6v13h-6M7 7h.01M10.5 7h.01M7 11h.01M10.5 11h.01M7 15h.01M10.5 15h.01" />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2.5 12.5h19" />
    </svg>
  );
}

export function IconMonitor(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function IconNetwork(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2.3" />
      <circle cx="5" cy="19" r="2.3" />
      <circle cx="19" cy="19" r="2.3" />
      <path d="M12 7.3v4.2M12 11.5 6.6 17M12 11.5 17.4 17" />
    </svg>
  );
}

export function IconPalette(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 8 0 1 0 0 16c1.1 0 1.7-.9 1.2-1.8-.3-.6-.1-1.3.5-1.5.6-.2 1.3 0 1.9 0A3.4 3.4 0 0 0 19 12.4 9 8 0 0 0 12 3Z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMegaphone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l1 5h2l-1-5h2l7 4V6l-7 4H5a2 2 0 0 0-2 1Z" />
    </svg>
  );
}

export function IconScale(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18M7 21h10M5 7l-3 6a3 3 0 0 0 6 0Zm14 0-3 6a3 3 0 0 0 6 0ZM5 7h14M12 3l7 4M12 3 5 7" />
    </svg>
  );
}

export function IconCrane(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V9l10-6v6M4 9h14M14 9v5M14 12h6M20 12v3a2 2 0 0 1-2 2h-1" />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M16 13.5h3" />
    </svg>
  );
}

export function IconDocument(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v14H7Z" />
      <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" />
    </svg>
  );
}

export function IconCloud(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18h11a4 4 0 0 0 .5-8 6 6 0 0 0-11.6-1.5A4.5 4.5 0 0 0 7 18Z" />
    </svg>
  );
}

export function IconHeadset(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

export function IconCursorClick(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 4 3.2 15.5L11 14l5.5-1.8L6 4Z" />
      <path d="M17.5 17.5 21 21M15 3v2M20 8h2M4.2 4.2l1.4 1.4" />
    </svg>
  );
}

export function IconPieChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2v10l7.4 5.6A10 10 0 1 1 12 2Z" />
      <path d="M21.5 12A9.5 9.5 0 0 0 12 2.5V12Z" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function IconApple(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M16.365 1.43c.145 1.01-.276 2-.86 2.72-.6.74-1.58 1.31-2.55 1.23-.13-.98.32-2 .87-2.65.62-.74 1.68-1.28 2.54-1.3ZM20.6 17.24c-.42.98-.93 1.9-1.55 2.76-.85 1.17-1.55 1.98-2.53 2-1 .02-1.32-.63-2.47-.63-1.15 0-1.5.61-2.45.65-.95.04-1.68-.86-2.54-2.02-1.55-2.1-2.74-5.93-1.15-8.53.79-1.3 2.2-2.12 3.73-2.14 1 .0 1.94.66 2.55.66.6 0 1.75-.82 2.95-.7.5.02 1.92.2 2.83 1.53-.07.05-1.69.98-1.67 2.93.02 2.33 2.05 3.11 2.3 3.19Z" />
    </svg>
  );
}

export function IconServer(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

export function IconTelegram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m21 4-3 16-7.5-5L7 18l1-5.5L20 4Z" />
      <path d="m10.5 12.5 9-7.5" />
    </svg>
  );
}

export function IconAndroid(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M7.5 6.6 5.9 3.9a.6.6 0 1 1 1-.6l1.6 2.77a8.1 8.1 0 0 1 7 0L17.1 3.3a.6.6 0 1 1 1 .6l-1.6 2.7A7.3 7.3 0 0 1 20 12.5H4a7.3 7.3 0 0 1 3.5-5.9Z" />
      <rect x="4" y="13.2" width="16" height="6.5" rx="1.6" />
      <rect x="1.6" y="13.5" width="2.4" height="6" rx="1.2" />
      <rect x="20" y="13.5" width="2.4" height="6" rx="1.2" />
      <rect x="7.5" y="19.7" width="2.4" height="3.6" rx="1.2" />
      <rect x="14.1" y="19.7" width="2.4" height="3.6" rx="1.2" />
      <circle cx="9" cy="10.3" r="0.9" fill="var(--bg-1, #fff)" />
      <circle cx="15" cy="10.3" r="0.9" fill="var(--bg-1, #fff)" />
    </svg>
  );
}
