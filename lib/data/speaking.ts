export type WorkExperienceItem = {
  role: string;
  organization: string;
  type: "Magang / Intern" | "Freelance" | "Full Time";
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  projectHref?: string;
  projectLabel?: string;
};

export type SpeakingEvent = {
  title: string;
  event: string;
  organizer: string;
  date: string;
  location: string;
  topics: string[];
  url: string;
  audience?: string;
};

export const WORK_EXPERIENCE: WorkExperienceItem[] = [
  {
    role: "Web Developer Intern",
    organization: "TIPD UIN Raden Mas Said Surakarta",
    type: "Magang / Intern",
    period: "Maret 2025 - April 2025",
    location: "Kartasura, Sukoharjo",
    summary:
      "Bertanggung jawab merancang dan menyelesaikan pengembangan sistem informasi Tracer Study Alumni berbasis web untuk mendata lulusan serta mempermudah pengelolaan basis data alumni oleh pihak instansi.",
    highlights: [
      "Merancang arsitektur basis data relasional profil alumni dan kuesioner tracer study di MySQL.",
      "Mengimplementasikan portal pengisian survei alumni, autentikasi multi-peran, dan dasbor rekapitulasi instansi.",
      "Mendeploy aplikasi ke lingkungan produksi dan melakukan serah terima operasional ke tim TIPD.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "REST API"],
    projectHref: "/projects/said-connect",
    projectLabel: "Lihat Studi Kasus Said Connect",
  },
  {
    role: "Freelance Full Stack & Automation Developer",
    organization: "Proyek Mandiri & Kolaborasi Klien",
    type: "Freelance",
    period: "Agustus 2023 - Sekarang",
    location: "Karanganyar / Remote",
    summary:
      "Mengembangkan aplikasi web end-to-end, sistem informasi pelayanan publik, layanan antrean digital multi-loket, chatbot RAG berbasis AI, serta skrip otomasi notifikasi dan ekstraksi data.",
    highlights: [
      "Membangun rangkaian aplikasi operasional untuk lingkungan BPS Karanganyar (Presensi Geofencing, Antrean PST, Portal KARTA AI, dan Smart Attendance Reminder).",
      "Mengintegrasikan backend Laravel dengan worker Node.js (WhatsApp Web & Telegram Bot), PostgreSQL pgvector, serta antarmuka modern Next.js & React.",
      "Menulis skrip Playwright/Python asinkron untuk ekstraksi dataset bisnis berskala besar beserta ekspor terstruktur.",
    ],
    stack: ["Laravel", "Next.js", "TypeScript", "Python", "MySQL"],
    projectHref: "/projects",
    projectLabel: "Jelajahi Semua Proyek",
  },
];

export const SPEAKING: SpeakingEvent[] = [
  {
    title: "Kepala Departemen",
    event: "Internal Pengembangan Organisasi (IPO), BEM FKI UMS",
    organizer: "BEM FKI UMS",
    date: "Januari 2025 - Desember 2025",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Manajemen Organisasi", "Kepemimpinan Internal", "Evaluasi Kader"],
    url: "https://www.instagram.com/p/DNKhaofA4Ye/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Pengurus BEM FKI UMS",
  },
  {
    title: "Penanggung Jawab Humas",
    event: "Parade Teknik Informatika (PARTI), HIMATIF UMS",
    organizer: "HIMATIF UMS",
    date: "2024",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Media Digital", "Komunikasi Publik", "Humas"],
    url: "https://www.instagram.com/p/C9cQyA_p1CL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Peserta Nasional & Lokal",
  },
  {
    title: "Anggota Departemen",
    event: "Internal Pengembangan Organisasi (IPO), BEM FKI UMS",
    organizer: "BEM FKI UMS",
    date: "Januari 2023 - Januari 2024",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Koordinasi Internal", "Media Digital", "Pengembangan SDM"],
    url: "https://www.instagram.com/p/Cwkn-VcvpZD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Pengurus BEM FKI",
  },
  {
    title: "Anggota Bidang",
    event: "Bidang Sosial Masyarakat, HIMATIF UMS",
    organizer: "HIMATIF UMS",
    date: "November 2022 - Desember 2024",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Literasi Informasi", "Pengabdian Sosial", "Program Kerja"],
    url: "https://www.instagram.com/p/C6oGVr6p6Hs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Mahasiswa & Masyarakat Umum",
  },
];
