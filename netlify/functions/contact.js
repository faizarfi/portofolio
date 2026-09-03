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

    // 1. Validasi keberadaan token
    if (!turnstileToken) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: "Token verifikasi Turnstile tidak ditemukan.",
        }),
      };
    }

    const secretKey =
      process.env.CLOUDFLARE_TURNSTILE_SECRET ||
      "0x4AAAAAAElvKhkab4YUSLjAc-EOPIozNiE";

    // 2. Validasi Turnstile ke Cloudflare menggunakan ENV Netlify
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

    // 3. Cek hasil verifikasi
    if (!verifyData.success) {
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success: false,
          message: "Verifikasi bot gagal, silakan coba lagi.",
          errors: verifyData["error-codes"],
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        message: "Verifikasi berhasil! Pesan Anda aman dan dapat dikirim.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: err.message || "Terjadi kesalahan server.",
      }),
    };
  }
};
