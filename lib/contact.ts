export interface ContactPayload {
  name?: string;
  contactInfo?: string;
  subject?: string;
  message?: string;
  "cf-turnstile-response"?: string;
  token?: string;
}

export interface ContactResult {
  status: number;
  success: boolean;
  message: string;
  deliveredDirectly?: boolean;
  channel?: "email" | "telegram";
  errors?: string[];
}

export interface ContactEnv {
  NODE_ENV?: string;
  CLOUDFLARE_TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

const CLOUDFLARE_DEV_TEST_SECRET = "1x0000000000000000000000000000000AA";

export async function processContactSubmission(
  body: ContactPayload,
  env: ContactEnv = process.env as ContactEnv,
  fetchFn: typeof fetch = fetch
): Promise<ContactResult> {
  const name = (body.name ?? "").trim();
  const contactInfo = (body.contactInfo ?? "").trim();
  const subject = (body.subject ?? "Diskusi Proyek").trim();
  const message = (body.message ?? "").trim();
  const turnstileToken = (body["cf-turnstile-response"] || body.token || "").trim();

  if (name.length < 2 || name.length > 120) {
    return {
      status: 400,
      success: false,
      message: "Nama lengkap wajib diisi (2 sampai 120 karakter).",
    };
  }

  if (message.length < 5 || message.length > 3000) {
    return {
      status: 400,
      success: false,
      message: "Detail pesan wajib diisi minimal 5 karakter (maksimal 3000 karakter).",
    };
  }

  if (!turnstileToken) {
    return {
      status: 400,
      success: false,
      message: "Verifikasi bot gagal: Token Turnstile tidak ditemukan.",
    };
  }

  const secretKey =
    env.CLOUDFLARE_TURNSTILE_SECRET ||
    (env.NODE_ENV === "development" ? CLOUDFLARE_DEV_TEST_SECRET : "");

  if (!secretKey) {
    return {
      status: 503,
      success: false,
      message: "Konfigurasi keamanan Turnstile di server belum lengkap.",
    };
  }

  try {
    const verifyResponse = await fetchFn(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: turnstileToken,
        }),
      }
    );

    const verifyData = (await verifyResponse.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    if (!verifyData.success) {
      return {
        status: 403,
        success: false,
        message: "Verifikasi bot gagal, silakan coba lagi.",
        errors: verifyData["error-codes"],
      };
    }

    // Optional direct delivery via Resend REST API (if configured in environment)
    if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL) {
      const resendRes = await fetchFn("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL || "Portofolio Faiz <onboarding@resend.dev>",
          to: [env.CONTACT_TO_EMAIL],
          subject: `[Portofolio] ${subject} - ${name}`,
          text: [
            `Nama: ${name}`,
            `Kontak: ${contactInfo || "-"}`,
            `Topik: ${subject}`,
            "",
            "Pesan:",
            message,
          ].join("\n"),
        }),
      });

      if (resendRes.ok) {
        return {
          status: 200,
          success: true,
          deliveredDirectly: true,
          channel: "email",
          message: "Pesan terverifikasi dan langsung terkirim ke inbox Faiz!",
        };
      }
    }

    // Optional direct delivery via Telegram Bot API (if configured in environment)
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      const tgText = [
        `Pesan Baru dari Portofolio`,
        `Nama: ${name}`,
        `Kontak: ${contactInfo || "-"}`,
        `Topik: ${subject}`,
        ``,
        message,
      ].join("\n");

      const tgRes = await fetchFn(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: tgText,
          }),
        }
      );

      if (tgRes.ok) {
        return {
          status: 200,
          success: true,
          deliveredDirectly: true,
          channel: "telegram",
          message: "Pesan terverifikasi dan langsung diteruskan ke Faiz!",
        };
      }
    }

    return {
      status: 200,
      success: true,
      deliveredDirectly: false,
      message: "Verifikasi berhasil! Membuka aplikasi email Anda...",
    };
  } catch (error) {
    console.error("Contact submission error:", error);
    return {
      status: 500,
      success: false,
      message: "Terjadi kesalahan internal saat memproses verifikasi.",
    };
  }
}

