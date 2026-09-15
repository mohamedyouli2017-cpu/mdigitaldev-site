import { ImageResponse } from "next/og";

export const alt         = "MDigitalDev — Système digital pour cabinets dentaires au Maroc";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0f1724 0%, #0f1724 55%, #0a7c8c 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>
          MDigital<span style={{ color: "#0bb1c4" }}>Dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 24px",
              borderRadius: 999,
              background: "#c9a24b",
              color: "#0f1724",
              fontSize: 26,
              fontWeight: 800,
              marginBottom: 28,
            }}
          >
            Cabinets dentaires · Maroc
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
            <span>Un système digital qui aide</span>
            <span>votre cabinet <span style={{ color: "#0bb1c4", marginLeft: 16 }}>24h/24, 7j/7</span></span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
          Site web · Rendez-vous WhatsApp · Rappels automatiques · Assistant IA
        </div>
      </div>
    ),
    size,
  );
}
