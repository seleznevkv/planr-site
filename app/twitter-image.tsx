import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0e15 0%, #16324a 55%, #3a9cd7 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              display: "flex",
              background: "linear-gradient(135deg, #3a9cd7, #f65414)",
            }}
          />
          <div style={{ display: "flex", fontSize: 42, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
            PlanR
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 52,
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 920,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 820,
          }}
        >
          Прибыльность, ресурсы и финансы проекта — в одной системе
        </div>
      </div>
    ),
    { ...size }
  );
}
