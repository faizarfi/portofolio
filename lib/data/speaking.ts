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

export const SPEAKING: SpeakingEvent[] = [
  {
    title: "Kepala Departemen",
    event: "Internal Pengembangan Organisasi (IPO) — BEM FKI UMS",
    organizer: "BEM FKI UMS",
    date: "2025",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Manajemen Organisasi", "Kepemimpinan Internal", "Branding Internal"],
    url: "https://www.instagram.com/p/DNKhaofA4Ye/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Mahasiswa FKI UMS",
  },
  {
    title: "Penanggung Jawab Humas",
    event: "Parade Teknik Informatika (PARTI) — HIMATIF UMS",
    organizer: "HIMATIF UMS",
    date: "2024",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Media Digital", "Komunikasi Publik", "Humas"],
    url: "https://www.instagram.com/p/C9cQyA_p1CL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Peserta Nasional & Lokal",
  },
  {
    title: "Anggota Departemen",
    event: "Internal Pengembangan Organisasi (IPO) — BEM FKI UMS",
    organizer: "BEM FKI UMS",
    date: "2023",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Koordinasi Internal", "Media Digital", "Pengembangan SDM"],
    url: "https://www.instagram.com/p/Cwkn-VcvpZD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Pengurus BEM FKI",
  },
  {
    title: "Anggota Bidang",
    event: "Sosial Masyarakat — HIMATIF UMS",
    organizer: "HIMATIF UMS",
    date: "2022 – 2024",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Literasi Informasi", "Pengabdian Sosial", "Media"],
    url: "https://www.instagram.com/p/C6oGVr6p6Hs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    audience: "Masyarakat Umum",
  },
];
