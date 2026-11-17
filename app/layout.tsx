import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/ui";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://faizarfianilhami.caitlyn.my.id"
  ),
  title: {
    default: "Faiz Arfian Ilhami | Software Engineer & Full Stack Web Developer",
    template: "%s | Faiz Arfian Ilhami",
  },
  description:
    "Portofolio Faiz Arfian Ilhami, Software Engineer dan Full Stack Web Developer. Berfokus pada pengembangan sistem web berbasis Laravel, React, Next.js, PHP, dan basis data terstruktur.",
  keywords: [
    "Faiz Arfian Ilhami",
    "Software Engineer",
    "Full Stack Web Developer",
    "Web Developer Indonesia",
    "Laravel Developer",
    "Next.js Developer",
    "React Developer",
    "PHP Developer",
    "Backend Developer",
    "Frontend Developer",
  ],
  icons: {
    icon: "/iconweb.png",
    apple: "/iconweb.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Faiz Arfian Ilhami | Software Engineer & Full Stack Web Developer",
    description:
      "Software Engineer dan Full Stack Web Developer Indonesia. Mengembangkan aplikasi web modern dengan Laravel, React, Next.js, TypeScript, PHP, dan MySQL.",
    url: "https://faizarfianilhami.caitlyn.my.id",
    siteName: "faizarfianilhami.caitlyn.my.id",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faiz Arfian Ilhami | Software Engineer & Full Stack Web Developer",
    description:
      "Software Engineer dan Full Stack Web Developer. Mengembangkan aplikasi web modern dengan Laravel, React, Next.js, TypeScript, dan MySQL.",
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
    url: "https://faizarfianilhami.caitlyn.my.id",
    image: "https://faizarfianilhami.caitlyn.my.id/foto.jpeg",
    jobTitle: "Software Engineer & Full Stack Web Developer",
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
      addressLocality: "Indonesia",
      addressRegion: "Indonesia",
      addressCountry: "ID",
    },
    sameAs: [
      "https://github.com/faizarfi",
      "https://www.linkedin.com/in/faizarfianilhami",
      "https://www.instagram.com/caitlyn_faiz/",
      "https://www.tiktok.com/@caitlyn.faiz",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Web Development",
      "Laravel Framework",
      "React",
      "Next.js",
      "PHP",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "RESTful API Architecture",
      "Database Design",
    ],
  };

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        id="top"
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200 selection:bg-slate-900 dark:selection:bg-white selection:text-white dark:selection:text-black"
      >
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
