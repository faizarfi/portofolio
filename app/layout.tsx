import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { PageLoader, CommandPalette } from "@/components/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://faizarfian.id"),
  title: {
    default: "Faiz Arfian Ilhami — Full Stack Web Developer & IT Helper",
    template: "%s | Faiz Arfian Ilhami",
  },
  description:
    "Portofolio Faiz Arfian Ilhami — Full Stack Web Developer & IT Helper di Surakarta. Mengembangkan sistem informasi berbasis Laravel, React, Next.js, PHP, dan solusi teknologi informasi yang andal.",
  keywords: [
    "Faiz Arfian Ilhami",
    "Full Stack Web Developer",
    "Web Developer Surakarta",
    "Laravel Developer",
    "Next.js Developer",
    "React Developer",
    "PHP Developer",
    "IT Helper",
    "IT Support Surakarta",
    "Jasa Pembuatan Website",
  ],
  icons: {
    icon: "/iconweb.png",
    apple: "/iconweb.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Faiz Arfian Ilhami | Full Stack Web Developer & IT Helper",
    description:
      "Full Stack Web Developer dan IT Helper di Surakarta. Membangun aplikasi web modern dengan Laravel, React, Next.js, PHP, dan solusi digital yang terstruktur.",
    url: "https://faizarfian.id",
    siteName: "faizarfian.id",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/foto.jpeg",
        width: 512,
        height: 512,
        alt: "Faiz Arfian Ilhami — Full Stack Web Developer & IT Helper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faiz Arfian Ilhami | Full Stack Web Developer & IT Helper",
    description:
      "Full Stack Web Developer dan IT Helper di Surakarta. Membangun aplikasi web modern dengan Laravel, React, Next.js, PHP, dan solusi digital terstruktur.",
  },
  verification: {
    google: [
      "vZvOJFKUyjkf51wp4QB-PVebBu8QDUxgB7HHfB-g_zs",
      "cyGmm4ksQoNsW11MjtcGW5m1VRPtT1doIuQAoQV2mzA",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faiz Arfian Ilhami",
    url: "https://faizarfian.id",
    image: "https://faizarfian.id/foto.jpeg",
    jobTitle: "Full Stack Web Developer & IT Helper",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Muhammadiyah Surakarta",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surakarta",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    sameAs: [
      "https://github.com/faizarfi",
      "https://www.linkedin.com/in/faizarfianilhami",
      "https://www.instagram.com/caitlyn_faiz/",
      "https://www.tiktok.com/@caitlyn.faiz",
    ],
    knowsAbout: [
      "Full Stack Web Development",
      "Laravel Framework",
      "React",
      "Next.js",
      "PHP",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "IT Support & Troubleshooting",
    ],
  };

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#f8fafc] text-slate-800 selection:bg-blue-500/20 selection:text-blue-900">
        <PageLoader />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
