import { ImageResponse } from "next/og";

export const alt = "Faiz Arfian Ilhami | Software Engineer & Full Stack Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          border: "1px solid #27272a",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#a1a1aa",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Software Engineer &amp; Full Stack Developer
          </span>
          <span
            style={{
              fontSize: 20,
              color: "#e4e4e7",
              border: "1px solid #3f3f46",
              borderRadius: 9999,
              padding: "8px 20px",
              backgroundColor: "#18181b",
            }}
          >
            faizarfianilhami.caitlyn.my.id
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Faiz Arfian Ilhami
          </div>
          <div style={{ fontSize: 28, color: "#d4d4d8", lineHeight: 1.4, maxWidth: 920 }}>
            Merancang sistem informasi institusi, aplikasi web produksi berbasis Laravel, Next.js &amp; MySQL, serta otomasi layanan.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {["Laravel 12", "Next.js 16", "TypeScript", "MySQL", "Python"].map((tech) => (
            <div
              key={tech}
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#f4f4f5",
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 10,
                padding: "10px 20px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

