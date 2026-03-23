import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const backendResponse = await fetch(`${BACKEND_API_BASE_URL}/reviews`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const payload = await backendResponse.json();

    return NextResponse.json(payload, {
      status: backendResponse.status,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to reach the review service." },
      { status: 500 },
    );
  }
}
