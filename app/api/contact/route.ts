import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const turnstileToken = body["cf-turnstile-response"] || body.token;

    // 1. Validasi keberadaan token
    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Verifikasi bot gagal: Token Turnstile tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    const secretKey =
      process.env.CLOUDFLARE_TURNSTILE_SECRET ||
      "0x4AAAAAAElvKhkab4YUSLjAc-EOPIozNiE";

    // 2. Kirim validasi ke Cloudflare Turnstile
    const verifyResponse = await fetch(
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

    const verifyData = await verifyResponse.json();

    // 3. Jika verifikasi gagal (diduga bot), tolak request
    if (!verifyData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Verifikasi bot gagal, silakan coba lagi.",
          errors: verifyData["error-codes"],
        },
        { status: 403 }
      );
    }

    // 4. Jika lolos verifikasi
    return NextResponse.json({
      success: true,
      message: "Verifikasi berhasil! Pesan Anda aman dan dapat dikirim.",
    });
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal saat memproses verifikasi.",
      },
      { status: 500 }
    );
  }
}
