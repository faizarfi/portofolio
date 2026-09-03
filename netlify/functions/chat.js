exports.handler = async (event) => {
  // Hanya terima method POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const turnstileToken =
      data["cf-turnstile-response"] || data.token || data.turnstileToken;

    // 1. Validasi Turnstile ke Cloudflare menggunakan ENV Netlify
    const secretKey =
      process.env.CLOUDFLARE_TURNSTILE_SECRET ||
      "0x4AAAAAAElvKhkab4YUSLjAc-EOPIozNiE";

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey,
          response: turnstileToken,
        }),
      }
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Verifikasi bot gagal, silakan coba lagi!" }),
      };
    }

    // 2. Respon pesan setelah lolos verifikasi (bisa disambungkan ke Gemini/Groq API)
    const botReply = "Halo! Ini respon dari server setelah lolos verifikasi Cloudflare Turnstile.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        reply: botReply,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: err.message || "Internal server error" }),
    };
  }
};
