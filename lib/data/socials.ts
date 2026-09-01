import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export const SOCIALS: { label: string; href: string; icon: IconDefinition }[] = [
  { label: "WhatsApp", href: "https://wa.me/6282327867328", icon: faWhatsapp },
  { label: "GitHub", href: "https://github.com/faizarfi", icon: faGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/faizarfianilhami", icon: faLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/caitlyn_faiz/", icon: faInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@caitlyn.faiz", icon: faTiktok },
];
