import { NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

type LoginResponse = {
  success?: boolean;
  error?: string;
  data?: {
    token?: string;
    user?: unknown;
  };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendResponse = await fetch(`${BACKEND_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = (await backendResponse.json()) as LoginResponse;
    const response = NextResponse.json(payload, {
      status: backendResponse.status,
    });

    if (backendResponse.ok && payload.data?.token) {
      response.cookies.set("auth_token", payload.data.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return response;
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
