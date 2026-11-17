import { ImageResponse } from "next/og";
import { PROJECTS } from "@/lib/data";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  const title = project?.name ?? "Studi Kasus Proyek";
  const category = project?.category ?? "Software Engineering";
  const description =
    project?.description ?? "Detail arsitektur sistem dan implementasi proyek.";
  const metric = project?.details.metric ?? "Studi Kasus";
  const role = project?.details.role ?? "Full Stack Developer";
  const techs = project?.tech.slice(0, 5) ?? ["Laravel", "Next.js", "MySQL"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          color: "#09090b",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          border: "1px solid #e4e4e7",
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
              fontSize: 20,
              fontWeight: 700,
              color: "#52525b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {category} &bull; {role}
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#ffffff",
              backgroundColor: "#09090b",
              borderRadius: 10,
              padding: "8px 18px",
            }}
          >
            {metric}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ fontSize: 24, color: "#3f3f46", lineHeight: 1.45, maxWidth: 960 }}>
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e4e4e7",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {techs.map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#18181b",
                  backgroundColor: "#f4f4f5",
                  border: "1px solid #d4d4d8",
                  borderRadius: 8,
                  padding: "8px 16px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#52525b" }}>
            Faiz Arfian Ilhami
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

