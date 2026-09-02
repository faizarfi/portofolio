export interface SchemaColumn {
  name: string;
  type: string;
  key?: "PK" | "FK" | "IDX";
  desc: string;
}

export interface SchemaTable {
  name: string;
  description: string;
  columns: SchemaColumn[];
  relations?: string[];
}

export interface ArchitectureLayer {
  tier: string;
  title: string;
  tech: string;
  description: string;
}

export interface ProjectArchitecture {
  summary: string;
  layers: ArchitectureLayer[];
  tables: SchemaTable[];
  highlights: string[];
}

export interface ProjectDetail {
  role: string;
  overview: string;
  contributions: string[];
  contributionsCount?: number;
  year?: string;
  metric?: string;
  architecture?: ProjectArchitecture;
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
      architecture: {
        summary: "Arsitektur Monolitik MVC berbasis Laravel 11 dengan Relational Database MySQL 8.0 & Role-Based Access Control (RBAC).",
        layers: [
          {
            tier: "01. Presentation Layer",
            title: "Client & UI Interface",
            tech: "Blade Templates + Tailwind CSS + Vanilla JS",
            description: "Form kuesioner interaktif multi-step dengan validasi sisi klien dan dashboard analitik statistik alumni.",
          },
          {
            tier: "02. Application & Security Layer",
            title: "Middleware & Routing Controller",
            tech: "Laravel 11 Auth Guard + Form Request Validator",
            description: "Pemisahan hak akses (Admin Fakultas / Alumni), filter CSRF, rate limiter, dan sanitasi payload input.",
          },
          {
            tier: "03. Business Logic & Export Layer",
            title: "Service & Reporting Engine",
            tech: "Eloquent ORM + DomPDF / Maatwebsite Excel",
            description: "Pengolahan agregasi data tracer, perhitungan persentase keselarasan studi, serta export rekapitulasi laporan.",
          },
          {
            tier: "04. Data Persistence Layer",
            title: "Relational Database Management",
            tech: "MySQL 8.0 (InnoDB Engine, UTF8mb4)",
            description: "Skema relasional ternormalisasi dengan foreign keys cascade dan indexing pada kolom pencarian utama.",
          },
        ],
        tables: [
          {
            name: "users",
            description: "Tabel kredensial autentikasi utama dan penentuan hak akses pengguna.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Auto-increment primary key" },
              { name: "email", type: "VARCHAR(255)", key: "IDX", desc: "Unique email alumni / admin" },
              { name: "password", type: "VARCHAR(255)", desc: "Bcrypt hashed password" },
              { name: "role", type: "ENUM('admin','alumni')", desc: "Hak akses sistem" },
              { name: "created_at", type: "TIMESTAMP", desc: "Waktu pembuatan akun" },
            ],
            relations: ["1:1 ke alumni_profiles (FK: user_id)"],
          },
          {
            name: "alumni_profiles",
            description: "Informasi biodata, identitas akademik, dan kontak lulusan.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key profil" },
              { name: "user_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke tabel users.id" },
              { name: "nim", type: "VARCHAR(20)", key: "IDX", desc: "Nomor Induk Mahasiswa unik" },
              { name: "nama_lengkap", type: "VARCHAR(150)", desc: "Nama lengkap alumni" },
              { name: "program_studi_id", type: "INT UNSIGNED", key: "FK", desc: "Relasi ke master prodi" },
              { name: "tahun_lulus", type: "YEAR", key: "IDX", desc: "Tahun kelulusan wisuda" },
              { name: "no_telepon", type: "VARCHAR(20)", desc: "Nomor kontak WhatsApp aktif" },
            ],
            relations: ["1:1 dengan users", "1:N dengan tracer_responses"],
          },
          {
            name: "tracer_responses",
            description: "Penyimpanan jawaban kuesioner pelacakan karier dan data instansi kerja.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key kuesioner" },
              { name: "alumni_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke alumni_profiles.id" },
              { name: "status_pekerjaan", type: "VARCHAR(50)", desc: "Bekerja, Wirausaha, atau Studi Lanjut" },
              { name: "nama_instansi", type: "VARCHAR(150)", desc: "Nama perusahaan / kantor tempat kerja" },
              { name: "keselarasan_bidang", type: "ENUM('Sangat Selaras','Selaras','Kurang Selaras')", desc: "Kesesuaian kurikulum" },
              { name: "masa_tunggu_bulan", type: "INT", desc: "Waktu tunggu hingga memperoleh kerja pertama" },
              { name: "submitted_at", type: "TIMESTAMP", desc: "Waktu submit survei" },
            ],
            relations: ["N:1 dengan alumni_profiles"],
          },
        ],
        highlights: [
          "Autentikasi Aman Multi-Role (Admin Kampus vs Mahasiswa Alumni)",
          "Optimalisasi Relasi Query Database dengan Eager Loading (Mencegah N+1 Problem)",
          "Fitur Ekspor Laporan Agregasi Otomatis ke Format PDF & Excel",
          "Validasi Input Berlapis untuk Menjamin Integritas Data",
        ],
      },
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
      architecture: {
        summary: "Arsitektur Hybrid RAG & LLM Gateway yang menghubungkan User Chat Interface dengan API Kecerdasan Buatan dan Logging Database.",
        layers: [
          {
            tier: "01. Conversational Client UI",
            title: "Interactive Chat Interface",
            tech: "Blade Components + AJAX / Fetch API + Tailwind CSS",
            description: "Antarmuka obrolan percakapan dengan auto-scroll, indikator pengetikan cerdas, dan form pengaduan masyarakat.",
          },
          {
            tier: "02. AI Gateway & Prompt Middleware",
            title: "LLM Pipeline & Context Injector",
            tech: "Laravel HTTP Client + Gemini / LLaMA API Wrapper",
            description: "Injeksi basis pengetahuan statistik instansi, penyaringan prompt injection, dan penanganan timeout request.",
          },
          {
            tier: "03. Analytics & Logging Backend",
            title: "Session & Ticket Management",
            tech: "Laravel Controller & Eloquent Models",
            description: "Penyimpanan otomatis riwayat dialog, kategorisasi topik pertanyaan, dan pembuatan tiket layanan publik.",
          },
          {
            tier: "04. Database Persistence",
            title: "Conversation & Feedback Store",
            tech: "MySQL 8.0 / SQLite",
            description: "Penyimpanan terindeks untuk sesi percakapan, pesan tanya-jawab, dan data rekapitulasi pengaduan publik.",
          },
        ],
        tables: [
          {
            name: "conversations",
            description: "Sesi percakapan antara pengunjung publik dan asisten AI.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key session" },
              { name: "session_token", type: "VARCHAR(64)", key: "IDX", desc: "Token unik sesi obrolan" },
              { name: "user_ip", type: "VARCHAR(45)", desc: "IP address pengunjung" },
              { name: "created_at", type: "TIMESTAMP", desc: "Waktu percakapan dimulai" },
            ],
            relations: ["1:N dengan messages"],
          },
          {
            name: "messages",
            description: "Log pesan tanya jawab antara pengguna (user) dan respons bot (assistant).",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key pesan" },
              { name: "conversation_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke conversations.id" },
              { name: "sender_role", type: "ENUM('user','assistant')", desc: "Pengirim pesan" },
              { name: "message_body", type: "TEXT", desc: "Konten teks pertanyaan/jawaban" },
              { name: "tokens_used", type: "INT", desc: "Jumlah token inferensi AI" },
            ],
            relations: ["N:1 dengan conversations"],
          },
        ],
        highlights: [
          "Prompt Engineering Terstruktur untuk Akurasi Data Pelayanan Publik",
          "Mekanisme Keamanan Input dari Percobaan Eksploitasi Prompt Injection",
          "Logging Lengkap Dialog Percakapan untuk Audit & Evaluasi Kinerja Layanan",
        ],
      },
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
      architecture: {
        summary: "Arsitektur Otomasi Background Scheduler & Job Queue dengan Database Log Kehadiran.",
        layers: [
          {
            tier: "01. Dashboard Client UI",
            title: "Monitoring & Presensi View",
            tech: "Blade Templates + Tailwind CSS",
            description: "Antarmuka manajemen jadwal kerja, input status izin/cuti, dan rekapitulasi kehadiran tim.",
          },
          {
            tier: "02. Task Scheduler & Worker",
            title: "Cron Automation Engine",
            tech: "Laravel Scheduler + Background Daemon",
            description: "Pemicu otomatis pengingat presensi pada jam masuk/pulang serta pengelompokan antrean notifikasi.",
          },
          {
            tier: "03. Notification Gateway",
            title: "Dispatch Service",
            tech: "WhatsApp Gateway API / Webhook Integration",
            description: "Eksekusi pengiriman notifikasi broadcast jadwal kerja langsung ke nomor kontak karyawan.",
          },
          {
            tier: "04. Database Storage",
            title: "Attendance & Employee Schema",
            tech: "MySQL 8.0",
            description: "Penyimpanan data pegawai, jadwal shift kerja, dan riwayat presensi harian.",
          },
        ],
        tables: [
          {
            name: "employees",
            description: "Data master identitas karyawan dan nomor kontak notifikasi.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "ID karyawan" },
              { name: "nip", type: "VARCHAR(30)", key: "IDX", desc: "Nomor Induk Pegawai unik" },
              { name: "nama", type: "VARCHAR(120)", desc: "Nama lengkap pegawai" },
              { name: "no_whatsapp", type: "VARCHAR(20)", desc: "Nomor WA tujuan notifikasi" },
              { name: "status_aktif", type: "BOOLEAN", desc: "Status kerja aktif" },
            ],
            relations: ["1:N dengan attendance_logs"],
          },
          {
            name: "attendance_logs",
            description: "Catatan presensi masuk, pulang, dan perhitungan keterlambatan.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "ID log presensi" },
              { name: "employee_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke employees.id" },
              { name: "tanggal", type: "DATE", key: "IDX", desc: "Tanggal presensi" },
              { name: "jam_masuk", type: "TIME", desc: "Waktu check-in" },
              { name: "jam_pulang", type: "TIME", desc: "Waktu check-out" },
              { name: "status", type: "ENUM('Hadir','Terlambat','Izin','Sakit')", desc: "Status kehadiran" },
            ],
            relations: ["N:1 dengan employees"],
          },
        ],
        highlights: [
          "Otomasi Penuh Pengingat Jadwal melalui Laravel Scheduler & Cron Jobs",
          "Algoritma Rekapitulasi Otomatis Jam Kerja dan Perhitungan Keterlambatan",
          "Struktur Database Efisien untuk Menampung Riwayat Presensi Jangka Panjang",
        ],
      },
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
      architecture: {
        summary: "Arsitektur Single Page Application (SPA) Reaktif dengan State Management Terpusat & Sinkronisasi Skor Instan.",
        layers: [
          {
            tier: "01. Spectator & Scoreboard View",
            title: "High-Visibility Display UI",
            tech: "Next.js + React 19 + Tailwind CSS",
            description: "Papan skor kontras tinggi dengan tipografi jumbo untuk layar proyektor lapangan dan layar smartphone.",
          },
          {
            tier: "02. Match Controller & Engine",
            title: "Game Rules & State Engine",
            tech: "TypeScript State Reducer + Local Storage Sync",
            description: "Logika reli poin bulutangkis/olahraga, sistem deuce otomatis, perpindahan servis, dan riwayat set.",
          },
          {
            tier: "03. Bracket & Standings Engine",
            title: "Tournament Group Stage Calculator",
            tech: "Array Transformation Algorithms",
            description: "Kalkulasi agregat kemenangan, selisih poin, dan penentuan juara grup otomatis.",
          },
          {
            tier: "04. Edge CDN Hosting",
            title: "Global Edge Network",
            tech: "Vercel Edge Network",
            description: "Penyajian aset statis berkecepatan tinggi dengan TTFB rendah di jaringan internet lapangan.",
          },
        ],
        tables: [
          {
            name: "MatchState Schema (Client State)",
            description: "Struktur data state reaktif yang menampung jalannya pertandingan aktif.",
            columns: [
              { name: "match_id", type: "STRING", key: "PK", desc: "Pengenal unik partai tanding" },
              { name: "player_a_score", type: "INTEGER", desc: "Poin pemain/tim A" },
              { name: "player_b_score", type: "INTEGER", desc: "Poin pemain/tim B" },
              { name: "current_set", type: "INTEGER (1-3)", desc: "Babak set yang sedang berjalan" },
              { name: "is_deuce", type: "BOOLEAN", desc: "Status deuce perpanjangan poin" },
              { name: "server_pos", type: "ENUM('A_LEFT','A_RIGHT','B_LEFT','B_RIGHT')", desc: "Posisi servis" },
            ],
            relations: ["Tersimpan di memory state & disinkronkan ke local cache"],
          },
        ],
        highlights: [
          "Logika State Management Presisi untuk Penghitungan Skor & Perpindahan Servis Otomatis",
          "Desain High-Visibility Scoreboard yang Terbaca Jelas di Layar Monitor Lapangan",
          "Kinerja Ringan & Instan di Akses via Smartphone Tanpa Beban Kuota Berlebih",
        ],
      },
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
      architecture: {
        summary: "Arsitektur Serverless API Gateway berbasis Node.js dengan Standarisasi CORS & JSON Payload.",
        layers: [
          {
            tier: "01. Request Gateway & CORS Handler",
            title: "Incoming Request Interceptor",
            tech: "Node.js HTTP Router + Custom Middleware",
            description: "Validasi header origin, pre-flight OPTIONS request, dan otorisasi API key.",
          },
          {
            tier: "02. Route Dispatcher & Validator",
            title: "Endpoint Route Resolver",
            tech: "Modular Path Matcher",
            description: "Penerusan request ke downstream service yang sesuai dengan validasi payload parameter.",
          },
          {
            tier: "03. Response Transformer",
            title: "Standardized JSON Formatter",
            tech: "JSON Envelope Pattern",
            description: "Standarisasi format respon: { status, data, error, timestamp }.",
          },
        ],
        tables: [],
        highlights: [
          "Arsitektur Serverless Modular Tanpa Overhead Server Fisik",
          "Penanganan Terpusat Header CORS dan Standarisasi Struktur Response API",
          "Error Handling Komprehensif dengan Pesan Diagnostik yang Jelas",
        ],
      },
    },
  },
];

