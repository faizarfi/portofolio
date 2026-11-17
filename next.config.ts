import type { NextConfig } from "next";

const isNetlifyOrProd =
  Boolean(process.env.NETLIFY) ||
  Boolean(process.env.VERCEL) ||
  process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  distDir: isNetlifyOrProd ? ".next" : ".next_dev",
  allowedDevOrigins: [
    "192.168.56.1",
    "192.168.1.122",
    "192.168.56.*",
    "192.168.1.*",
    "*.local",
    "localhost",
    "127.0.0.1",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
