import { NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

type SignupResponse = {
  success?: boolean;
  error?: string;
  data?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendResponse = await fetch(`${BACKEND_API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = (await backendResponse.json()) as SignupResponse;

    return NextResponse.json(payload, {
      status: backendResponse.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to reach the authentication service.",
      },
      { status: 500 },
    );
  }
}
