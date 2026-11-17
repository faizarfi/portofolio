import { NextResponse } from "next/server";
import { processContactSubmission, type ContactPayload } from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const result = await processContactSubmission(body);
    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        deliveredDirectly: result.deliveredDirectly,
        channel: result.channel,
        errors: result.errors,
      },
      { status: result.status }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Format permintaan JSON tidak valid.",
      },
      { status: 400 }
    );
  }
}
