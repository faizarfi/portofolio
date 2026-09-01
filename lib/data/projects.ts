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
    name: "Said Connect — Alumni Tracer Study",
    slug: "said-connect",
    description:
      "Platform sistem informasi pelacakan dan pendataan alumni digital berbasis web menggunakan Laravel untuk memperkuat relasi antara kampus UIN Raden Mas Said Surakarta dan lulusan.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
    url: "https://saidconnect.pribumics.my.id/",
    github: "https://github.com/faizarfi/tracer-alumni",
    image: "/projects/saidconnect.png",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Full Stack Developer",
      overview:
        "Said Connect adalah sistem informasi yang dirancang untuk mengelola data lulusan secara terpusat dan digital. Dibangun dengan arsitektur framework Laravel yang kokoh, aplikasi ini memfasilitasi survei tracer study, pemetaan karier alumni di dunia industri, serta rekapitulasi data statistik alumni secara akurat.",
      contributions: [
        "Arsitektur Backend: Merancang struktur database relasional dan API backend menggunakan Laravel dan PHP untuk menjamin efisiensi pengolahan data alumni.",
        "Modul Tracer Study: Membangun formulir kuesioner dinamis dan sistem pelacakan karier alumni dengan validasi data yang ketat.",
        "Dashboard Statistik Real-time: Mengembangkan panel admin untuk rekapitulasi data pekerjaan, keselarasan bidang studi, dan sebaran domisili alumni.",
        "Optimasi & Keamanan: Menerapkan proteksi otentikasi peran (role-based access control), sanitasi input, dan pencegahan SQL Injection.",
        "Desain Antarmuka Responsif: Merancang dashboard modern yang responsif dan mudah diakses dari perangkat desktop maupun mobile.",
      ],
      contributionsCount: 5,
    },
  },
  {
    name: "AI Chatbot",
    slug: "aichatbot-bps",
    description:
      "Aplikasi asisten virtual berbasis kecerdasan buatan (AI) untuk mempermudah masyarakat mengakses data statistik dan layanan publik secara cepat dan akurat.",
    tech: ["Laravel", "PHP", "Blade", "Gemini AI API", "MySQL", "Tailwind CSS"],
    url: "https://github.com/faizarfi/aichatbotbps",
    github: "https://github.com/faizarfi/aichatbotbps",
    featured: true,
    category: "AI & Tools",
    details: {
      role: "Full Stack Developer",
      overview:
        "Sistem chatbot cerdas terintegrasi yang dibangun untuk membantu staf dan publik dalam menelusuri publikasi statistik, indikator layanan publik, dan data informasi secara cepat melalui interaksi percakapan natural bertenaga AI.",
      contributions: [
        "Integrasi AI API: Menghubungkan engine AI dengan basis pengetahuan statistik untuk memberikan respons kontekstual dan akurat.",
        "Sistem Manajemen Konten (CMS): Membangun panel backend Laravel untuk mengelola riwayat chat, feedback kepuasan pengguna, dan basis data pengetahuan.",
        "Antarmuka Chat Interaktif: Mendesain tampilan chat box modern yang ringan, intuitif, dan responsif dengan indikator pesan real-time.",
        "Keamanan Data & Monitoring: Mengimplementasikan sistem logging dan filter prompt untuk menjaga keandalan informasi yang disajikan.",
      ],
      contributionsCount: 4,
    },
  },
  {
    name: "Sistem Pengingat & Rekap Absen",
    slug: "pengingat-absen",
    description:
      "Sistem otomatisasi jadwal dan notifikasi presensi pegawai berbasis web dengan pelaporan rekapitulasi kehadiran berkala untuk efisiensi operasional.",
    tech: ["Laravel", "PHP", "MySQL", "Cron Jobs", "Tailwind CSS", "JavaScript"],
    url: "https://github.com/faizarfi/pengingat-absen",
    github: "https://github.com/faizarfi/pengingat-absen",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Backend & Full Stack Developer",
      overview:
        "Aplikasi otomasi manajemen kehadiran yang dirancang untuk mencegah keterlambatan presensi kerja melalui pengingat otomatis terjadwal dan penyusunan laporan absensi bulanan secara otomatis.",
      contributions: [
        "Automated Task Scheduling: Mengonfigurasi cron jobs dan Laravel Scheduler untuk pengiriman notifikasi pengingat tepat waktu.",
        "Rekapitulasi Data Kehadiran: Mengembangkan algoritma kalkulasi jam kerja, status izin, lembur, dan ekspor laporan terstruktur.",
        "Manajemen Database Teroptimasi: Mendesain skema database MySQL yang efisien untuk menampung log harian presensi.",
      ],
      contributionsCount: 3,
    },
  },
  {
    name: "Pordes Jomblang Scoring System",
    slug: "score-pordes-jomblang",
    description:
      "Aplikasi web turnamen dan live scoring real-time untuk mencatat skor pertandingan, klasemen, dan statistik olahraga secara akurat dan instan.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://pordesjomblang.vercel.app",
    github: "https://github.com/faizarfi/score",
    featured: true,
    category: "React / Next.js",
    details: {
      role: "Frontend Developer",
      overview:
        "Sistem papan skor digital yang digunakan dalam ajang kompetisi olahraga Pekan Olahraga Desa (Pordes). Menyajikan informasi live score pertandingan, bagan turnamen, dan klasemen grup secara langsung kepada penonton dan panitia.",
      contributions: [
        "Dynamic Score Engine: Membangun logika kalkulasi skor poin real-time berbasis state management React dan TypeScript.",
        "Leaderboard & Bracket Viewer: Mengembangkan visualisasi bagan eliminasi dan klasemen pertandingan dengan update instan.",
        "Optimasi Performa Web: Menerapkan Static Site Generation (SSG) dan deployment cepat via Vercel untuk latency minimal.",
      ],
      contributionsCount: 3,
    },
  },
  {
    name: "API 9 Router Gateway",
    slug: "api9router",
    description:
      "Layanan gateway routing API ringan berbasis serverless untuk manajemen endpoint data dan konektivitas antarlayanan web.",
    tech: ["JavaScript", "Node.js", "REST API", "Vercel"],
    url: "https://api9router.vercel.app",
    github: "https://github.com/faizarfi/api9router",
    featured: true,
    category: "AI & Tools",
    details: {
      role: "Backend Developer",
      overview:
        "Microservice API Router yang memfasilitasi pengalihan permintaan (request routing), penanganan CORS, dan standarisasi respon JSON untuk berbagai integrasi aplikasi web.",
      contributions: [
        "API Endpoint Routing: Merancang struktur rute yang modular dan efisien untuk mendistribusikan request ke downstream service.",
        "Middleware & Error Handling: Menerapkan penanganan kesalahan terpusat dan validasi parameter request yang aman.",
        "Serverless Deployment: Menjalankan arsitektur serverless function di Vercel untuk efisiensi latensi dan biaya hosting.",
      ],
      contributionsCount: 3,
    },
  },
];
