export interface ProjectDetail {
  role: string;
  overview: string;
  contributions: string[];
  contributionsCount?: number;
  year?: string;
  metric?: string;
}

export interface Project {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  url: string;
  github?: string;
  image?: string;
  featured?: boolean;
  category?: "Laravel / PHP" | "React / Next.js" | "Full Stack" | "AI & Tools";
  details: ProjectDetail;
}

export const PROJECTS: Project[] = [
  {
    name: "Said Connect — Tracer Study Alumni",
    slug: "said-connect",
    description:
      "Sistem informasi pelacakan dan survei karier alumni UIN Raden Mas Said Surakarta untuk mendata lulusan, keselarasan studi, dan statistik dunia kerja secara terpusat.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
    url: "https://saidconnect.pribumics.my.id/",
    github: "https://github.com/faizarfi/tracer-alumni",
    image: "/projects/saidconnect.png",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Full Stack Developer",
      overview:
        "Said Connect dibangun untuk mengatasi kendala pengumpulan data alumni yang sebelumnya masih tersebar dan manual. Dengan aplikasi ini, alumni kampus UIN Raden Mas Said Surakarta dapat mengisi kuesioner pelacakan karier secara mandiri, sementara pihak universitas memperoleh dashboard visual real-time mengenai sebaran profesi dan relevansi kurikulum perkuliahan.",
      contributions: [
        "Merancang struktur basis data relasional MySQL untuk menampung ratusan respons survei dan profil alumni secara terstruktur.",
        "Mengembangkan formulir tracer study dinamis dengan validasi input yang ketat agar data yang masuk valid dan tidak ganda.",
        "Membangun dashboard admin untuk rekapitulasi data pekerjaan, keselarasan bidang studi, dan sebaran domisili alumni.",
        "Menerapkan sistem autentikasi multi-peran (admin kampus dan akun alumni) dengan perlindungan keamanan standar Laravel.",
        "Mendesain antarmuka yang bersih dan responsif agar alumni nyaman mengisi survei langsung dari ponsel cerdas mereka.",
      ],
      contributionsCount: 5,
    },
  },
  {
    name: "AI Chatbot Layanan Informasi",
    slug: "aichatbot-bps",
    description:
      "Asisten virtual cerdas berbasis AI untuk mempermudah masyarakat dan instansi menemukan data statistik serta informasi layanan publik secara cepat lewat tanya jawab natural.",
    tech: ["Laravel", "PHP", "Blade", "Gemini AI API", "MySQL", "Tailwind CSS"],
    url: "https://github.com/faizarfi/aichatbotbps",
    github: "https://github.com/faizarfi/aichatbotbps",
    featured: true,
    category: "AI & Tools",
    details: {
      role: "Full Stack Developer",
      overview:
        "Proyek asisten chatbot ini dirancang untuk menjawab pertanyaan seputar indikator statistik publik tanpa pengguna harus membaca dokumen laporan tebal secara manual. Sistem mengintegrasikan API kecerdasan buatan dengan basis pengetahuan lokal agar dapat memberikan jawaban yang tepat dan relevan.",
      contributions: [
        "Mengintegrasikan Gemini AI API ke dalam backend Laravel dengan prompt engineering terarah agar respon tetap akurat dan faktual.",
        "Membuat panel manajemen riwayat percakapan dan feedback pengguna untuk evaluasi kepuasan layanan secara berkala.",
        "Mendesain antarmuka obrolan (*chat UI*) interaktif yang ringan, dilengkapi animasi indikator mengetik dan respons real-time.",
        "Menyiapkan filter keamanan input percakapan untuk mencegah eksploitasi prompt injection.",
      ],
      contributionsCount: 4,
    },
  },
  {
    name: "Sistem Pengingat & Rekap Absen",
    slug: "pengingat-absen",
    description:
      "Aplikasi otomasi jadwal dan notifikasi pengingat presensi kerja dengan fitur rekapitulasi kehadiran berkala untuk membantu kelancaran operasional tim.",
    tech: ["Laravel", "PHP", "MySQL", "Cron Jobs", "Tailwind CSS", "JavaScript"],
    url: "https://github.com/faizarfi/pengingat-absen",
    github: "https://github.com/faizarfi/pengingat-absen",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Backend & Full Stack Developer",
      overview:
        "Aplikasi ini lahir dari kebutuhan nyata untuk mengurangi keterlambatan presensi kerja dan menyederhanakan penyusunan laporan kehadiran bulanan yang memakan waktu jika dikerjakan manual.",
      contributions: [
        "Mengonfigurasi Laravel Scheduler dan Cron Jobs server untuk otomatisasi pengiriman pesan pengingat jadwal kerja tepat waktu.",
        "Menulis algoritma rekapitulasi absensi otomatis yang menghitung kehadiran, izin, dan jam lembur menjadi laporan siap pakai.",
        "Menyusun skema database log harian presensi yang efisien dan cepat saat diproses untuk periode panjang.",
      ],
      contributionsCount: 3,
    },
  },
  {
    name: "Pordes Jomblang Scoring System",
    slug: "score-pordes-jomblang",
    description:
      "Papan skor digital dan live scoring turnamen olahraga desa real-time untuk mencatat skor pertandingan, klasemen grup, dan statistik laga secara instan.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://pordesjomblang.vercel.app",
    github: "https://github.com/faizarfi/score",
    featured: true,
    category: "React / Next.js",
    details: {
      role: "Frontend Developer",
      overview:
        "Sistem live score ini dibuat dan digunakan langsung di lapangan pada ajang turnamen Pekan Olahraga Desa (Pordes). Penonton di tribun dan panitia pertandingan dapat memantau perkembangan skor secara langsung di browser tanpa perlu me-refresh halaman.",
      contributions: [
        "Membangun mesin penghitung poin dan manajemen state dinamis menggunakan React dan TypeScript.",
        "Merancang tampilan papan skor bergaya scoreboard modern dengan visibilitas tinggi saat diproyeksikan ke layar monitor besar.",
        "Menyediakan bagan fase gugur (*tournament bracket*) dan tabel klasemen otomatis yang update saat pertandingan selesai.",
        "Mengoptimalkan loading website via Vercel agar sangat ringan dibuka ratusan penonton dengan jaringan internet seluler lapangan.",
      ],
      contributionsCount: 4,
    },
  },
  {
    name: "API 9 Router Gateway",
    slug: "api9router",
    description:
      "Gateway perutean API serverless ringan untuk mengelola rute endpoint, standarisasi response JSON, dan penanganan CORS antarlayanan web.",
    tech: ["JavaScript", "Node.js", "REST API", "Vercel"],
    url: "https://api9router.vercel.app",
    github: "https://github.com/faizarfi/api9router",
    featured: true,
    category: "AI & Tools",
    details: {
      role: "Backend Developer",
      overview:
        "Micro-service utilitas yang dibuat untuk menghubungkan beberapa frontend dengan service pihak ketiga secara aman, menyediakan format respon JSON yang seragam dan menangani izin header CORS.",
      contributions: [
        "Merancang arsitektur router modular untuk mempermudah penambahan endpoint baru tanpa mengganggu service lain.",
        "Menerapkan middleware validasi parameter request dan error handling terpusat yang informatif.",
        "Men-deploy ke environment serverless Vercel Edge untuk respon berkecepatan tinggi dengan biaya infrastruktur minimal.",
      ],
      contributionsCount: 3,
    },
  },
];
