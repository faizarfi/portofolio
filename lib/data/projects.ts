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
  category?: "Laravel / PHP" | "React / Next.js" | "Otomasi & Tooling" | "Full Stack";
  details: ProjectDetail;
}

export const PROJECTS: Project[] = [
  {
    name: "Sistem Presensi Magang BPS (Geofencing Haversine)",
    slug: "presensi-magang",
    description:
      "Sistem informasi presensi dan verifikasi logbook magang berbasis Geofencing Haversine (radius 150m kantor BPS Karanganyar), dilengkapi RBAC multi-role, verifikasi bulk ACC, unggah berkas dispensasi terproteksi, dan ekspor matriks horizontal bulanan PDF.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Haversine Formula", "DomPDF"],
    url: "https://github.com/faizarfi/presensi-magang",
    github: "https://github.com/faizarfi/presensi-magang",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Full Stack Developer",
      metric: "Diimplementasikan di BPS",
      overview:
        "Sistem Presensi Magang BPS Karanganyar dikembangkan untuk mengotomasi pencatatan kehadiran dan jurnal harian peserta magang secara terpusat dan akurat. Sistem ini mengintegrasikan rumus Haversine untuk memvalidasi koordinat GPS peserta secara real-time agar presensi hanya dapat dilakukan di dalam radius 150 meter kantor BPS Karanganyar (-7.5978, 110.9505). Dilengkapi alur verifikasi admin (single dan bulk ACC), deteksi hari libur dan akhir pekan otomatis, pengunggahan berkas bukti surat dokter atau dispensasi ke storage terproteksi, serta ekspor rekapitulasi matriks kehadiran horizontal bulanan siap cetak dalam format PDF.",
      contributions: [
        "Mengimplementasikan algoritma rumus Haversine untuk kalkulasi jarak GPS real-time dan pembatasan radius presensi 150 meter dari kantor BPS Karanganyar.",
        "Membangun Role-Based Access Control (RBAC) memisahkan hak akses Admin BPS dan Peserta Magang dengan keamanan sesi Laravel 12.",
        "Merancang fitur single dan bulk approval (ACC massal) bagi admin untuk verifikasi status kehadiran serta jurnal logbook harian peserta.",
        "Mengembangkan generator laporan rekapitulasi kehadiran matriks horizontal bulanan menggunakan DomPDF yang siap cetak.",
        "Mengintegrasikan modul unggah berkas bukti surat sakit dan izin dispensasi dengan validasi tipe mime serta penyimpanan aman di storage disk.",
        "Menulis suite automated feature test mencakup validasi radius kantor, deteksi tanggal merah atau libur, evaluasi absensi otomatis, dan pembaruan kata sandi.",
      ],
      architecture: {
        summary:
          "Arsitektur Monolitik MVC berbasis Laravel 12 dengan Relational Database MySQL, Service Haversine Geofencing, dan Automated Feature Tests.",
        layers: [
          {
            tier: "01. Presentation Layer",
            title: "Responsive Blade Client UI",
            tech: "Blade Templates + Tailwind CSS + HTML5 Geolocation API",
            description:
              "Antarmuka presensi interaktif dengan deteksi koordinat browser real-time, status badge kehadiran dinamis, dan dashboard monitoring admin.",
          },
          {
            tier: "02. Geofencing & Security Layer",
            title: "Haversine Distance & Radius Validator",
            tech: "Laravel Service Class + Auth Guards + CSRF Shield",
            description:
              "Pemeriksaan koordinat presensi dengan toleransi radius 150m, proteksi brute-force login, dan pembatasan hak akses berbasis role.",
          },
          {
            tier: "03. Business Logic & Workflow Engine",
            title: "Admin Approval & Holiday Evaluator",
            tech: "AttendanceService + Eloquent Transaction Engine",
            description:
              "Pengecekan otomatis hari libur atau akhir pekan, penentuan status terlambat dan tepat waktu, serta workflow bulk verification admin.",
          },
          {
            tier: "04. Data & Export Layer",
            title: "Persistence & PDF Reporting Engine",
            tech: "MySQL 8.0 + Barryvdh DomPDF + Storage Disk",
            description:
              "Skema database relasional ternormalisasi untuk log absensi dan profil magang, serta render dokumen rekapitulasi matriks horizontal.",
          },
        ],
        tables: [
          {
            name: "attendances",
            description: "Penyimpanan riwayat presensi harian, koordinat jarak GPS, dan status verifikasi admin.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Auto-increment primary key" },
              { name: "user_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke tabel users.id" },
              { name: "date", type: "DATE", key: "IDX", desc: "Tanggal absensi" },
              { name: "check_in_time", type: "TIME", desc: "Waktu presensi masuk" },
              { name: "check_out_time", type: "TIME", desc: "Waktu presensi pulang" },
              { name: "status", type: "ENUM('hadir','tidak_hadir_keterangan','alpa')", desc: "Status kehadiran umum" },
              { name: "sub_status", type: "ENUM('tepat_waktu','terlambat','sakit','izin')", desc: "Rincian status presensi" },
              { name: "distance_meters", type: "DECIMAL(8,2)", desc: "Jarak koordinat ke kantor BPS dalam meter" },
              { name: "attachment_file", type: "VARCHAR(255)", desc: "Path berkas surat bukti dokter atau izin" },
              { name: "is_confirmed", type: "BOOLEAN", key: "IDX", desc: "Status verifikasi admin BPS" },
            ],
            relations: ["N:1 dengan users"],
          },
          {
            name: "intern_profiles",
            description: "Biodata peserta magang, asal perguruan tinggi, dan durasi penugasan di BPS.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key profil magang" },
              { name: "user_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke tabel users.id" },
              { name: "university_name", type: "VARCHAR(150)", desc: "Nama asal kampus atau perguruan tinggi" },
              { name: "major", type: "VARCHAR(100)", desc: "Program studi atau jurusan" },
              { name: "start_date", type: "DATE", desc: "Tanggal mulai magang" },
              { name: "end_date", type: "DATE", desc: "Tanggal selesai magang" },
              { name: "duration_months", type: "INT", desc: "Durasi magang dalam hitungan bulan" },
              { name: "phone_number", type: "VARCHAR(20)", desc: "Nomor kontak WhatsApp aktif" },
            ],
            relations: ["1:1 dengan users"],
          },
          {
            name: "settings",
            description: "Konfigurasi titik koordinat GPS kantor BPS Karanganyar dan batasan radius absensi.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key setting" },
              { name: "office_latitude", type: "DECIMAL(10,7)", desc: "Garis lintang kantor BPS (-7.5978)" },
              { name: "office_longitude", type: "DECIMAL(10,7)", desc: "Garis bujur kantor BPS (110.9505)" },
              { name: "allowed_radius_meters", type: "INT", desc: "Batas maksimal radius presensi (150m)" },
              { name: "work_start_time", type: "TIME", desc: "Batas jam masuk kantor" },
              { name: "work_end_time", type: "TIME", desc: "Batas jam pulang kantor" },
            ],
            relations: ["Konfigurasi global sistem"],
          },
        ],
        highlights: [
          "Validasi Radius Presensi 150m Kantor BPS Menggunakan Rumus Haversine Akurat",
          "Alur Verifikasi Cepat Single & Bulk Approval (ACC Massal) Bagi Administrator",
          "Pencegahan Manipulasi Jam Melalui Deteksi Hari Libur & Validasi Server-Side",
          "Ekspor Rekapitulasi Matriks Presensi Bulanan Siap Cetak ke Format Dokumen PDF",
          "Automated Feature Testing dengan Coverage Endpoint Kunci",
        ],
      },
    },
  },
  {
    name: "Sistem Antrean Digital PST BPS Karanganyar",
    slug: "antrian-pst-bps",
    description:
      "Sistem antrean terpadu Pelayanan Statistik Terpadu (PST) di jaringan LAN kantor dengan tiket mandiri paperless berbasis QR Code, layar panggil TV 16:9 berkontras tinggi, sintesis audio two-tone dan suara id-ID, serta Survei Kepuasan Masyarakat (SKM).",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Web Speech API", "QR Code"],
    url: "https://github.com/faizarfi/antrian",
    github: "https://github.com/faizarfi/antrian",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Full Stack Developer",
      metric: "Sistem PST BPS Karanganyar",
      overview:
        "Sistem Antrean Digital PST BPS Kabupaten Karanganyar dirancang untuk menggantikan pengambilan nomor antrean manual sekaligus beroperasi penuh pada jaringan LAN atau Wi-Fi internal kantor tanpa ketergantungan internet pihak ketiga. Pengunjung cukup memindai QR Code meja untuk memperoleh e-Tiket dinamis di browser smartphone, memantau giliran secara langsung, lalu mengisi Survei Kepuasan Masyarakat (SKM) setelah layanan di Loket 1 selesai. Dari meja front office, petugas mengendalikan panggilan antrean melalui pintasan papan ketik sementara layar TV ruang tunggu memutar nada lonceng two-tone dan pengumuman suara Bahasa Indonesia.",
      contributions: [
        "Merancang arsitektur antrean 1 Loket Terpadu untuk 3 kategori layanan resmi BPS (A: Perpustakaan, B: Konsultasi Statistik, C: Rekomendasi Kegiatan Statistik) dengan reset nomor harian otomatis.",
        "Mengembangkan sistem e-Tiket paperless berbasis QR Code dinamis dan halaman pelacakan real-time (/tiket/{token}) lengkap dengan formulir Survei Kepuasan Masyarakat (SKM).",
        "Membangun layar TV display 16:9 berkontras tinggi dengan sintesis audio multi-tone (659.25 Hz dan 880 Hz) serta suara pengumuman otomatis id-ID melalui Web Speech API.",
        "Menyediakan konsol operator berbasis pintasan papan ketik (Space/F2 panggil berikutnya, R panggil ulang, S lewati, Enter/C selesaikan) untuk mempercepat alur kerja petugas loket.",
        "Menambahkan modul pelaporan harian hingga tahunan dengan ekspor CSV/Excel dan dokumen PDF berformat cetak resmi, serta tampilan cetak standee QR meja (/cetak-qr).",
      ],
      architecture: {
        summary:
          "Arsitektur Multi-Device LAN Laravel dengan Engine Penomoran Harian Terindeks, Layar Display TV Audio Synthesizer, dan Pelacakan e-Tiket Tokenized.",
        layers: [
          {
            tier: "01. Multi-Device Client Interfaces",
            title: "Kiosk, Mobile e-Ticket, TV Display & Operator Console",
            tech: "Blade Templates + Tailwind CSS + Keyboard Shortcuts",
            description:
              "Empat antarmuka khusus dalam satu aplikasi: registrasi mandiri QR/kiosk, pemantauan tiket di ponsel pengunjung, layar TV ruang tunggu 16:9, dan meja petugas.",
          },
          {
            tier: "02. Audio & Announcement Synthesizer",
            title: "Two-Tone Chime & Indonesian Speech Engine",
            tech: "Web Audio API (659.25 Hz / 880 Hz) + SpeechSynthesis (id-ID)",
            description:
              "Sintesis nada lonceng panggilan dan pelafalan nomor tiket menuju loket langsung di browser TV tanpa bergantung pada file audio eksternal.",
          },
          {
            tier: "03. Queue Concurrency & Reporting",
            title: "FIFO / Category Dispatch & SKM Evaluator",
            tech: "Laravel Controllers + Database Unique Constraints + Print/Export",
            description:
              "Penjaminan nomor urut unik per layanan dan tanggal layanan melalui composite index, pencatatan call_histories, serta rekapitulasi performa pelayanan.",
          },
          {
            tier: "04. Database Persistence",
            title: "Normalized Queue & Feedback Schema",
            tech: "MySQL 8.0 / MariaDB / SQLite",
            description:
              "Penyimpanan master layanan, loket, tiket antrean dengan tracking_token unik, riwayat pemanggilan, pengumuman berjalan, dan skor SKM.",
          },
        ],
        tables: [
          {
            name: "tickets",
            description: "Menyimpan tiket antrean harian per layanan, status panggilan, token pelacakan, dan rating SKM.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Auto-increment primary key" },
              { name: "service_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke tabel services.id" },
              { name: "counter_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke tabel counters.id" },
              { name: "ticket_number", type: "VARCHAR(20)", key: "IDX", desc: "Nomor tiket (A-001, B-001, C-001)" },
              { name: "service_date", type: "DATE", key: "IDX", desc: "Tanggal operasional layanan" },
              { name: "status", type: "ENUM('waiting','called','completed','skipped')", key: "IDX", desc: "Status antrean saat ini" },
              { name: "tracking_token", type: "VARCHAR(64)", key: "IDX", desc: "Token unik halaman e-Tiket pengunjung" },
              { name: "feedback_rating", type: "TINYINT", desc: "Nilai Survei Kepuasan Masyarakat (1 sampai 4)" },
            ],
            relations: ["N:1 dengan services", "N:1 dengan counters", "1:N dengan call_histories"],
          },
          {
            name: "services",
            description: "Master kategori layanan PST (A, B, C) beserta kode huruf dan urutan tampilan.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key layanan" },
              { name: "code", type: "VARCHAR(5)", key: "IDX", desc: "Kode prefix antrean (A, B, C)" },
              { name: "name", type: "VARCHAR(255)", desc: "Nama layanan resmi PST" },
              { name: "is_active", type: "BOOLEAN", desc: "Status aktif layanan" },
            ],
            relations: ["1:N dengan tickets"],
          },
          {
            name: "call_histories",
            description: "Log audit setiap pemanggilan dan pemanggilan ulang (recall) oleh petugas loket.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key riwayat panggilan" },
              { name: "ticket_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke tickets.id" },
              { name: "user_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Petugas yang memanggil antrean" },
              { name: "call_type", type: "ENUM('call','recall')", desc: "Jenis aksi pemanggilan" },
              { name: "called_at", type: "TIMESTAMP", key: "IDX", desc: "Waktu pemanggilan tercatat" },
            ],
            relations: ["N:1 dengan tickets", "N:1 dengan users"],
          },
        ],
        highlights: [
          "Operasional Penuh di Jaringan LAN Kantor Tanpa Ketergantungan Internet Eksternal",
          "e-Tiket QR Code Paperless + Pelacakan Antrean & Survei SKM Real-Time di Smartphone",
          "Sintesis Nada Two-Tone (659.25Hz/880Hz) dan Suara Pengumuman Bahasa Indonesia",
          "Pintasan Papan Ketik Lengkap untuk Operasional Front Office Berkecepatan Tinggi",
        ],
      },
    },
  },
  {
    name: "Portal PST & KARTA AI BPS Karanganyar",
    slug: "aichatbot-bps",
    description:
      "Platform layanan statistik publik BPS Karanganyar berbasis Laravel 12 dengan asisten RAG KARTA AI (Gemini SSE streaming), sinkronisasi 464 publikasi resmi via BPS Web API, peta spasial 3D 17 kecamatan, PII redactor, dan handoff petugas live chat.",
    tech: ["Laravel", "PHP", "Gemini AI API", "MySQL", "Chart.js", "Tailwind CSS"],
    url: "https://github.com/faizarfi/aichatbotbps",
    github: "https://github.com/faizarfi/aichatbotbps",
    featured: true,
    category: "Otomasi & Tooling",
    details: {
      role: "Full Stack Developer",
      metric: "464 Publikasi & Peta 17 Kecamatan",
      overview:
        "Portal Layanan Statistik Terpadu (PST) & KARTA AI (Konsultan AI Riset & Terpadu Angka) dibangun untuk membantu masyarakat mengakses data statistik resmi Kabupaten Karanganyar tanpa harus menelusuri laporan tebal secara manual. Sistem menggabungkan mesin Retrieval-Augmented Generation (RAG) yang terhubung ke katalog 464 publikasi resmi BPS dengan streaming token Server-Sent Events (SSE), visualisasi Chart.js otomatis, peta spasial 3D 17 kecamatan, kalkulator statistik terapan, layanan aduan terenkripsi AES-256, serta fitur Human-in-the-Loop agar sesi chat dapat diambil alih petugas PST secara langsung.",
      contributions: [
        "Mengembangkan mesin RAG KARTA AI (KnowledgeSearchService & ChatService) dengan Server-Sent Events (SSE) token streaming dan dukungan fallback gateway AI.",
        "Mengintegrasikan sinkronisasi otomatis 464 publikasi resmi BPS Kabupaten Karanganyar via BPS Web API (php artisan bps:sync-publications).",
        "Membangun PersonalDataRedactor untuk menyamarkan otomatis NIK (16 digit), nomor telepon, dan email sebelum payload dikirim ke API eksternal.",
        "Merancang kanal pengaduan publik dengan enkripsi database AES-256 pada kontak pelapor, tiket pelacakan ADU-YYYY-XXXXXX, dan isolasi lampiran di direktori privat.",
        "Mengimplementasikan alur Human-in-the-Loop (takeover sesi oleh petugas PST), peta spasial 3D isometrik 17 kecamatan, serta kalkulator Slovin, proyeksi penduduk, dan inflasi.",
      ],
      architecture: {
        summary:
          "Arsitektur Clean Layered Service di atas Laravel 12 dengan Mesin RAG Publikasi BPS, PII Redactor Middleware, SSE Streaming, dan Live Agent Handoff.",
        layers: [
          {
            tier: "01. Public Portal & Interactive UI",
            title: "KARTA Chat, 3D Spatial Map & Stat Calculators",
            tech: "Blade + Tailwind CSS + Chart.js + Web Speech",
            description:
              "Antarmuka chat streaming SSE dengan render grafik Chart.js otomatis, peta 17 kecamatan Karanganyar, serta ekspor rangkuman konsultasi PDF ber-KOP resmi.",
          },
          {
            tier: "02. Security & Privacy Guard",
            title: "PII Redactor & XSS/File Isolation",
            tech: "PersonalDataRedactor + AES-256 Eloquent Cast + Security Headers",
            description:
              "Penyaringan otomatis NIK/telepon/email sebelum inferensi LLM, sanitasi Markdown ketat, dan isolasi lampiran di luar document root.",
          },
          {
            tier: "03. RAG & AI Gateway Service",
            title: "Knowledge Indexing & SSE LLM Pipeline",
            tech: "KnowledgeSearchService + AiLlmService (Gemini / OpenAI Gateway)",
            description:
              "Pencarian metadata publikasi dan basis pengetahuan statistik BPS (IPM, PDRB, Kemiskinan, Inflasi) untuk grounding jawaban AI secara faktual.",
          },
          {
            tier: "04. Data Sync & Persistence",
            title: "BPS Publication Store & Complaint Logs",
            tech: "MySQL 8.0 + BPS Web API Sync + DomPDF",
            description:
              "Penyimpanan katalog 464 publikasi, statistik per kecamatan, log percakapan, serta status aduan warga dengan jejak audit.",
          },
        ],
        tables: [
          {
            name: "publications",
            description: "Katalog publikasi resmi BPS Karanganyar yang disinkronisasi melalui BPS Web API.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key publikasi" },
              { name: "title", type: "VARCHAR(255)", key: "IDX", desc: "Judul publikasi resmi BPS" },
              { name: "release_date", type: "DATE", key: "IDX", desc: "Tanggal rilis dokumen" },
              { name: "abstract", type: "TEXT", desc: "Abstrak untuk indeks pencarian RAG" },
              { name: "pdf_url", type: "VARCHAR(500)", desc: "Tautan unduh dokumen resmi" },
            ],
            relations: ["Diindeks ke KnowledgeSearchService"],
          },
          {
            name: "conversations & messages",
            description: "Sesi percakapan publik dengan KARTA AI maupun sesi handoff petugas PST.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key sesi atau pesan" },
              { name: "conversation_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi pesan ke sesi percakapan" },
              { name: "sender_role", type: "ENUM('user','assistant','officer')", desc: "Aktor pengirim pesan" },
              { name: "message_body", type: "TEXT", desc: "Isi pertanyaan, jawaban RAG, atau catatan petugas" },
            ],
            relations: ["1:N conversations ke messages"],
          },
          {
            name: "complaints",
            description: "Kanal aspirasi dan aduan warga dengan enkripsi AES-256 pada kontak pelapor.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "Primary key aduan" },
              { name: "ticket_code", type: "VARCHAR(30)", key: "IDX", desc: "Kode pelacakan ADU-YYYY-XXXXXX" },
              { name: "reporter_contact", type: "TEXT", desc: "Kontak pelapor terenkripsi AES-256" },
              { name: "status", type: "VARCHAR(50)", key: "IDX", desc: "Status penanganan aduan" },
            ],
            relations: ["1:N ke complaint_attachments & complaint_status_logs"],
          },
        ],
        highlights: [
          "Grounding Jawaban AI pada 464 Publikasi Resmi BPS via KnowledgeSearchService",
          "Penyensoran Otomatis PII (NIK, Telepon, Email) Sebelum Request Dikirim ke LLM",
          "Human-in-the-Loop Live Handoff agar Petugas PST Dapat Mengambil Alih Sesi Chat",
          "Enkripsi AES-256 dan Isolasi Storage Privat untuk Keamanan Data Pelapor Aduan",
        ],
      },
    },
  },
  {
    name: "BPS Smart Attendance Reminder v3.0",
    slug: "pengingat-absen",
    description:
      "Sistem otomasi pengingat absensi pegawai BPS berbasis Laravel 11, Node.js headless WhatsApp agent (whatsapp-web.js + Puppeteer), dan Bot Telegram Admin dengan anti-ban jitter engine serta sinkronisasi hari libur nasional.",
    tech: ["Laravel", "PHP", "Node.js", "Puppeteer", "MySQL", "Telegram API"],
    url: "https://github.com/faizarfi/pengingat-absen",
    github: "https://github.com/faizarfi/pengingat-absen",
    featured: true,
    category: "Otomasi & Tooling",
    details: {
      role: "Backend & Automation Developer",
      metric: "Hybrid Laravel + Headless WA Agent",
      overview:
        "BPS Smart Attendance Reminder v3.0 mengotomasi pengiriman pengingat absensi masuk dan pulang pegawai BPS secara mandiri tanpa biaya gateway pihak ketiga. Backend Laravel 11 mengatur penjadwalan, sinkronisasi API hari libur nasional, manajemen template dinamis, dan outbox pengiriman, sementara service Node.js terpisah (wa-desktop-agent) menjalankan whatsapp-web.js secara headless dengan mekanisme anti-ban komprehensif dan kendali jarak jauh melalui Bot Telegram Admin.",
      contributions: [
        "Membangun arsitektur hybrid backend Laravel 11 dengan Node.js headless WhatsApp Web agent (whatsapp-web.js & Puppeteer Core) yang diautentikasi via Bearer Token.",
        "Mengembangkan anti-ban engine: human-like jitter delay (10 sampai 18 detik), simulasi mengetik, batch cooldown, daily throttling, business hours guard, dan auto-pause saat gagal beruntun.",
        "Mengintegrasikan Bot Telegram Admin interaktif (webhook & polling) untuk memicu pengiriman massal, memilih pegawai via inline keyboard, dan memantau alert koneksi terputus.",
        "Menyediakan panel Koneksi WhatsApp langsung di web dashboard (scan QR di browser, status live, putus/ganti nomor) tanpa menyentuh terminal SSH.",
        "Mengotomasi sinkronisasi API hari libur nasional dan jadwal kerja fleksibel (termasuk Ramadan), lengkap dengan suite pengujian PHPUnit.",
      ],
      architecture: {
        summary:
          "Arsitektur Hybrid Scheduler Laravel 11, REST-Bridged Node.js Headless WhatsApp Agent, dan Webhook/Polling Telegram Bot Remote Control.",
        layers: [
          {
            tier: "01. Admin Web & Bot Control",
            title: "Dashboard Manajemen & Telegram Admin Bot",
            tech: "Laravel Blade + Tailwind CSS v4 + Telegram Bot API",
            description:
              "Dashboard pemantauan live outbox, editor template variabel dinamis, scan QR WhatsApp di browser, serta kendali jarak jauh via Telegram.",
          },
          {
            tier: "02. Scheduler & Queue Core",
            title: "Holiday-Aware Scheduler & Outbox Guard",
            tech: "Laravel 11 Scheduler + Rate Limiter + Holiday API Sync",
            description:
              "Penangguhan otomatis di akhir pekan dan hari libur nasional, normalisasi nomor internasional (62), serta recovery otomatis antrean macet.",
          },
          {
            tier: "03. Headless WhatsApp Agent",
            title: "Anti-Ban Delivery & Persistent Session Runner",
            tech: "Node.js + whatsapp-web.js + Puppeteer Core + LocalAuth",
            description:
              "Eksekusi pengiriman di latar belakang dengan jeda acak manusiawi, injeksi entropi zero-width, batch cooldown, dan auto-reconnect.",
          },
          {
            tier: "04. Persistence & Audit",
            title: "Employee, Schedule & Transmission Logs",
            tech: "MySQL 8.0 / MariaDB + CSV Export + PHPUnit",
            description:
              "Penyimpanan daftar pegawai unik, konfigurasi jam kerja, status outbox riil, dan laporan CSV riwayat transmisi.",
          },
        ],
        tables: [
          {
            name: "employees",
            description: "Data master pegawai dengan nomor WhatsApp ternormalisasi dan status keaktifan pengingat.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "ID pegawai" },
              { name: "name", type: "VARCHAR(120)", desc: "Nama lengkap pegawai" },
              { name: "phone", type: "VARCHAR(20)", key: "IDX", desc: "Nomor WhatsApp unik format 62" },
              { name: "is_active", type: "BOOLEAN", desc: "Status keaktifan jadwal pengingat" },
            ],
            relations: ["1:N dengan outbox_messages"],
          },
          {
            name: "outbox_messages",
            description: "Antrean pesan terjadwal dan status keterkiriman riil dari WhatsApp Agent.",
            columns: [
              { name: "id", type: "BIGINT UNSIGNED", key: "PK", desc: "ID antrean pesan" },
              { name: "employee_id", type: "BIGINT UNSIGNED", key: "FK", desc: "Relasi ke employees.id" },
              { name: "status", type: "ENUM('pending','processing','sent','failed')", key: "IDX", desc: "Status transmisi outbox" },
              { name: "scheduled_at", type: "TIMESTAMP", key: "IDX", desc: "Waktu target pengiriman" },
              { name: "sent_at", type: "TIMESTAMP", desc: "Waktu pesan berhasil terkirim" },
            ],
            relations: ["N:1 dengan employees"],
          },
        ],
        highlights: [
          "Mode Hybrid Fleksibel: Laravel di Hosting/VPS Terhubung Aman ke WA Agent via Bearer Token",
          "Anti-Ban Engine dengan Jitter Delay, Batch Cooldown, dan Auto-Pause Kegagalan Beruntun",
          "Scan QR & Kontrol Putus/Ganti Nomor WhatsApp Langsung dari Web Dashboard",
          "Terintegrasi Bot Telegram Admin dan Sinkronisasi Otomatis Hari Libur Nasional Indonesia",
        ],
      },
    },
  },
  {
    name: "Said Connect: Tracer Study Alumni",
    slug: "said-connect",
    description:
      "Sistem informasi pelacakan dan survei karier alumni UIN Raden Mas Said Surakarta untuk mendata lulusan, keselarasan studi, masa tunggu kerja, dan statistik dunia kerja secara terpusat.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
    url: "https://saidconnect.pribumics.my.id/",
    github: "https://github.com/faizarfi/tracer-alumni",
    image: "/projects/saidconnect.png",
    featured: true,
    category: "Laravel / PHP",
    details: {
      role: "Full Stack Developer",
      metric: "Demo Langsung Tersedia",
      overview:
        "Said Connect dibangun untuk mengatasi kendala pengumpulan data alumni yang sebelumnya tersebar dan manual. Alumni UIN Raden Mas Said Surakarta dapat mengisi kuesioner pelacakan karier secara mandiri, sementara pihak universitas memperoleh dashboard visual mengenai sebaran profesi, masa tunggu kerja, dan relevansi kurikulum perkuliahan.",
      contributions: [
        "Merancang struktur basis data relasional MySQL untuk menampung respons survei dan profil alumni secara terstruktur.",
        "Mengembangkan formulir tracer study dinamis dengan validasi input ketat agar data valid dan tidak duplikat.",
        "Membangun dashboard admin untuk rekapitulasi pekerjaan, keselarasan bidang studi, dan sebaran domisili alumni.",
        "Menerapkan sistem autentikasi multi-peran (admin kampus dan akun alumni) dengan perlindungan keamanan standar Laravel.",
        "Mendesain antarmuka responsif agar alumni nyaman mengisi survei langsung melalui perangkat seluler maupun desktop.",
      ],
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
            description: "Pengolahan agregasi data tracer, perhitungan persentase keselarasan studi, serta ekspor rekapitulasi laporan.",
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
              { name: "email", type: "VARCHAR(255)", key: "IDX", desc: "Unique email alumni atau admin" },
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
              { name: "no_telepon", type: "VARCHAR(20)", desc: "Nomor kontak telepon aktif" },
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
              { name: "nama_instansi", type: "VARCHAR(150)", desc: "Nama perusahaan atau kantor tempat kerja" },
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
    name: "Google Maps Enterprise Scraper",
    slug: "gmaps-scraper",
    description:
      "Platform web scraping dan business intelligence berbasis Django dan Playwright untuk ekstraksi data bisnis dari Google Maps secara massal dengan deduplikasi branch-aware dan ekspor multi-sheet Excel.",
    tech: ["Python", "Django", "Playwright", "Pandas", "OpenPyXL", "Docker"],
    url: "https://github.com/faizarfi/scraping",
    github: "https://github.com/faizarfi/scraping",
    featured: true,
    category: "Otomasi & Tooling",
    details: {
      role: "Full Stack Developer",
      metric: "Web Dashboard + Headless CLI",
      overview:
        "Platform scraping yang dirancang untuk mengumpulkan, memvalidasi, dan menstrukturkan data bisnis dari Google Maps dalam skala besar. Sistem ini menangani tantangan infinite-scroll rendering, virtualisasi DOM dinamis, serta ambiguitas multi-cabang bisnis, dengan antarmuka ganda berupa dashboard web telemetri real-time dan CLI headless untuk otomasi server.",
      contributions: [
        "Membangun engine scraping headless Playwright dengan simulasi trajectory mouse-wheel untuk mengekstrak daftar entitas dari DOM dinamis Google Maps.",
        "Mengembangkan algoritma deduplikasi Branch-Aware menggunakan compound identity hashing (nama + koordinat geografis) agar cabang bisnis berbeda tidak terhapus.",
        "Merancang generator workbook Excel multi-sheet otomatis dengan Master Sheet, sub-sheet per kategori, dan tab agregasi via OpenPyXL dan Pandas.",
        "Mengimplementasikan Graceful Interruption dengan thread-safe signal flags untuk terminasi browser bersih tanpa mengorbankan data yang sudah terkumpul.",
        "Menyiapkan containerisasi Docker untuk deployment dan eksekusi terisolasi pada server.",
      ],
      architecture: {
        summary: "Arsitektur Multi-Layer Scraping Platform dengan Headless Browser Automation, Smart Deduplication Engine, dan Multi-Format Export Pipeline.",
        layers: [
          {
            tier: "01. Client Interface Layer",
            title: "Web Dashboard & CLI Client",
            tech: "Django Templates + Management Commands",
            description: "Dashboard web dengan pemantauan progres asinkron dan antarmuka CLI (cli_scraper.py) untuk operasi headless server.",
          },
          {
            tier: "02. Scraping Orchestration Layer",
            title: "Async Playwright Worker Engine",
            tech: "Playwright (Headless Chromium) + Threading",
            description: "Worker thread yang mengontrol browser headless, melakukan scrolling daftar hasil, dan mengekstrak atribut tempat usaha.",
          },
          {
            tier: "03. Data Processing Layer",
            title: "Deduplication & Validation Pipeline",
            tech: "Pandas + Compound Identity Hashing",
            description: "Engine deduplikasi berbasis koordinat geografis dan normalisasi nama tempat usaha serta metadata lokasi.",
          },
          {
            tier: "04. Export & Persistence Layer",
            title: "Multi-Format Export Engine",
            tech: "OpenPyXL + CSV (UTF-8 BOM) + SQLite/PostgreSQL",
            description: "Generator workbook Excel multi-sheet dengan auto-adjusted columns, clickable map links, dan ekspor CSV.",
          },
        ],
        tables: [
          {
            name: "scraped_businesses",
            description: "Tabel utama penyimpanan data bisnis hasil ekstraksi Google Maps.",
            columns: [
              { name: "id", type: "BIGINT", key: "PK", desc: "Primary key record bisnis" },
              { name: "place_name", type: "VARCHAR(255)", key: "IDX", desc: "Nama resmi tempat usaha" },
              { name: "category", type: "VARCHAR(100)", key: "IDX", desc: "Klasifikasi kategori bisnis" },
              { name: "latitude", type: "DECIMAL(10,8)", desc: "Koordinat lintang geografis" },
              { name: "longitude", type: "DECIMAL(11,8)", desc: "Koordinat bujur geografis" },
              { name: "rating", type: "DECIMAL(2,1)", desc: "Rating bintang Google Maps" },
              { name: "review_count", type: "INTEGER", desc: "Jumlah ulasan pengguna" },
              { name: "address", type: "TEXT", desc: "Alamat lengkap tempat usaha" },
              { name: "phone", type: "VARCHAR(20)", desc: "Nomor telepon bisnis" },
            ],
            relations: ["N:1 dengan scrape_sessions (FK: session_id)"],
          },
        ],
        highlights: [
          "Headless Browser Automation dengan Simulasi Scroll Dinamis",
          "Algoritma Deduplikasi Branch-Aware Berbasis Compound Identity Hashing",
          "Multi-Sheet Excel Workbook Generator dengan Auto-Adjusted Formatting",
          "Graceful Interruption Engine untuk Terminasi Bersih Tanpa Kehilangan Data",
        ],
      },
    },
  },
  {
    name: "Universal TV Remote Pro (PWA)",
    slug: "universal-tv-remote",
    description:
      "Aplikasi remote TV universal berbasis Next.js dan PWA dengan haptic vibration, synthesizer audio klik tombol (Web Audio API), layar OLED digital interaktif, serta adaptor multi-protokol Smart TV dan ESP32 IR Blaster.",
    tech: ["Next.js", "React", "TypeScript", "PWA", "Web Audio API", "Tailwind CSS"],
    url: "https://github.com/faizarfi/remote",
    github: "https://github.com/faizarfi/remote",
    featured: true,
    category: "React / Next.js",
    details: {
      role: "Frontend Developer",
      metric: "PWA & Multi-Protocol TV Bridge",
      overview:
        "Dibangun sebagai solusi praktis ketika remote TV fisik rusak atau hilang. Aplikasi ini memadukan antarmuka remote genggam ergonomis dengan umpan balik getaran taktil (navigator.vibrate) dan sintesis suara klik mekanikal murni menggunakan Web Audio API tanpa aset audio eksternal, dilengkapi layer protokol (tvProtocols.ts) untuk Roku HTTP ECP, Android TV, Samsung Tizen, LG webOS, hingga TV analog melalui ESP32 IR Blaster.",
      contributions: [
        "Mengembangkan antarmuka remote fisik dengan D-Pad 5-arah, rocker volume/channel, numeric keypad lipat, trackpad virtual, dan layar status OLED interaktif.",
        "Mengimplementasikan modul audioFeedback.ts menggunakan Web Audio API OscillatorNode dan hapticFeedback.ts (navigator.vibrate) tanpa aset audio eksternal.",
        "Merancang layer protokol tvProtocols.ts dan katalog tvBrands.ts untuk mendukung Roku ECP (port 8060), Android TV REST bridge, Samsung Tizen, LG webOS, dan ESP32 IR Blaster.",
        "Mengonfigurasi Progressive Web App (manifest.ts) agar aplikasi dapat dipasang langsung di home screen smartphone.",
      ],
      architecture: {
        summary: "Arsitektur PWA Mobile-First dengan Web Audio API Synthesizer, Haptic Feedback Engine, dan Multi-Protocol TV Control Bridge.",
        layers: [
          {
            tier: "01. Remote UI Layer",
            title: "Handheld Remote & Virtual TV Simulator",
            tech: "Next.js App Router + React + Tailwind CSS",
            description: "Antarmuka remote fisik dengan D-Pad 5 arah, rocker volume/channel, numeric keypad lipat, dan pratinjau layar TV 16:9.",
          },
          {
            tier: "02. Sensory Feedback Engine",
            title: "Haptic & Audio Synthesizer",
            tech: "Navigator.vibrate API + Web Audio API (OscillatorNode)",
            description: "Getaran taktil untuk penekanan tombol dan efek suara klik mekanikal serta nada power chime yang disintesis di browser.",
          },
          {
            tier: "03. TV Control Bridge",
            title: "Multi-Protocol Device Controller",
            tech: "Next.js API Route + Roku HTTP ECP + Bridge Adapters",
            description: "Adaptor protokol (tvProtocols.ts) untuk mengirim perintah ke berbagai merek Smart TV maupun modul ESP32 IR Blaster di jaringan lokal.",
          },
          {
            tier: "04. PWA Configuration",
            title: "Installable Progressive Web App",
            tech: "Web App Manifest (manifest.ts) + Local Storage",
            description: "Aplikasi dapat dipasang langsung di layar utama smartphone dan menyimpan preferensi merek TV serta alamat IP lokal.",
          },
        ],
        tables: [
          {
            name: "RemoteState (Client State)",
            description: "State reaktif yang menampung kondisi remote dan TV target di sisi klien.",
            columns: [
              { name: "power_on", type: "BOOLEAN", desc: "Status power TV aktif atau mati" },
              { name: "current_channel", type: "INTEGER", desc: "Nomor channel aktif" },
              { name: "volume_level", type: "INTEGER (0-100)", desc: "Level volume TV saat ini" },
              { name: "active_input", type: "STRING", desc: "Sumber input aktif (HDMI, AV, dll)" },
              { name: "tv_brand", type: "ENUM", desc: "Merek TV terhubung (Roku, Android TV, Tizen, webOS, IR)" },
              { name: "connection_ip", type: "STRING", desc: "Alamat IP target TV di jaringan lokal" },
            ],
            relations: ["Disimpan di React state dan disinkronkan ke localStorage"],
          },
        ],
        highlights: [
          "Audio Synthesizer & Haptic Feedback Tanpa Aset Audio Eksternal (Pure Web Audio API)",
          "Adaptor Multi-Merek TV dari Smart TV hingga TV Analog via ESP32 IR Blaster",
          "Progressive Web App (PWA) Siap Pasang di Layar Utama Smartphone",
        ],
      },
    },
  },
];
