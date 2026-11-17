# Faiz Arfian Ilhami: Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Repositori resmi website portofolio pribadi **Faiz Arfian Ilhami**, Software Engineer & Full Stack Web Developer. Dibangun menggunakan Next.js 16 (App Router), React 19, TypeScript, dan Tailwind CSS v4 dengan fokus pada performa, aksesibilitas, serta arsitektur kode modular.

---

## Gambaran Umum

Website ini dirancang untuk menampilkan rekam jejak teknis, sistem informasi yang telah diimplementasikan di lingkungan produksi, studi kasus rekayasa basis data, serta aktivitas repositori open-source secara langsung.

---

## Fitur Utama

- **Antarmuka Minimalis & Responsif**: Tata letak yang dioptimalkan untuk perangkat mobile, tablet, hingga layar desktop dengan dukungan mode gelap, terang, dan sinkronisasi sistem.
- **Katalog Proyek Pilihan & Studi Kasus**: Dokumentasi mendalam mengenai alur bisnis, arsitektur sistem, skema basis data relasional (ERD), serta kontribusi teknis pada setiap proyek unggulan.
- **Diferensiasi Tautan Repositori**: Penanganan status proyek yang transparan antara repositori kode sumber publik dan tautan demonstrasi langsung (*live demo*).
- **Integrasi Aktivitas GitHub**: Pengambilan data otomatis melalui GitHub API untuk menampilkan jumlah repositori publik, metrik kontribusi tahunan, dan distribusi bahasa pemrograman.
- **Aksesibilitas & Navigasi Keyboard**: Menggunakan native `<dialog>`, kontras warna WCAG AA, focus indicator untuk mode terang/gelap, serta Command Palette (`Ctrl+K`).
- **Optimasi Mesin Pencari (SEO)**: Mengimplementasikan Schema.org JSON-LD (Person), metadata Open Graph terstruktur, canonical URL, sitemap XML otomatis, serta file robots.txt.

---

## Komponen Teknologi

| Kategori | Teknologi / Pustaka | Keterangan |
| :--- | :--- | :--- |
| **Framework Utama** | Next.js 16 (Turbopack) | Server-Side Rendering (SSR) & Static Site Generation (SSG) |
| **Pustaka Frontend** | React 19 | Komponen reaktif berbasis server dan klien |
| **Bahasa Pemrograman** | TypeScript 5.x | Keamanan tipe data statis dan integrasi modul |
| **Sistem Styling** | Tailwind CSS v4 | Utilitas desain responsif dan kustomisasi variabel CSS |
| **Ikonografi** | FontAwesome | Ikon teknis teroptimasi format SVG |
| **Tipografi** | Geist Sans, Geist Mono, Outfit | Font modern berlisensi terbuka via `next/font` |
| **Keamanan Form** | Cloudflare Turnstile | Proteksi form kontak dari automasi bot |

---

## Struktur Direktori

```text
portofolio/
├── app/                  # Routing Next.js App Router (Halaman, API, Layout)
│   ├── api/contact/      # Endpoint verifikasi & pengiriman form kontak
│   ├── projects/         # Katalog proyek & halaman dinamis per slug
│   ├── globals.css       # Definisi token desain, utilitas Tailwind, & tema
│   ├── layout.tsx        # Shell tata letak global & metadata SEO
│   └── page.tsx          # Halaman beranda utama
├── components/           # Komponen antarmuka per bagian (Hero, About, dll.)
│   └── ui/               # Komponen antarmuka atomik (Button, Modal, Card, dll.)
├── hooks/                # Custom React hooks
├── lib/                  # Sumber data proyek, profil, dan navigasi
│   └── data/             # Data proyek, pendidikan, pengalaman, dan bahasa
└── public/               # Aset statis gambar, berkas CV PDF, dan favicon
```

---

## Panduan Menjalankan Proyek

### Prasyarat Sistem

- Node.js versi 18.18 atau lebih baru
- Manajer paket npm, pnpm, atau yarn

### Langkah Instalasi

1. Klon repositori ini ke komputer lokal:
   ```bash
   git clone https://github.com/faizarfi/portofolio.git
   cd portofolio
   ```

2. Pasang seluruh dependensi proyek:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```

4. Buka peramban dan akses alamat:
   ```text
   http://localhost:3000
   ```

### Kompilasi Produksi

Untuk memverifikasi tipe TypeScript dan menghasilkan bundel produksi teroptimasi:

```bash
npm run build
npm run start
```

---

## Profil Pengembang

- **Nama**: Faiz Arfian Ilhami
- **Pendidikan**: S1 Teknik Informatika, Universitas Muhammadiyah Surakarta (Lulus 2026, IPK 3.3)
- **Fokus Keahlian**: Software Engineering, Backend Architecture (Laravel, PHP, MySQL), Modern Frontend (React, Next.js, TypeScript)
- **Domisili**: Indonesia (Terbuka untuk posisi Full-time On-Site maupun Remote)
- **Email**: faizarfianilhami020204@gmail.com
- **GitHub**: https://github.com/faizarfi
- **LinkedIn**: https://www.linkedin.com/in/faizarfianilhami

---

## Lisensi

Proyek ini didistribusikan di bawah lisensi [MIT](LICENSE).
