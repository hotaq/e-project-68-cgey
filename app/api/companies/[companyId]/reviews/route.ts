import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

type RouteContext = {
  params: Promise<{
    companyId: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    const { companyId } = await context.params;

    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/companies/${companyId}/reviews`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const payload = await backendResponse.json();

    return NextResponse.json(payload, {
      status: backendResponse.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to reach the review service.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Please sign in before leaving a review." },
      { status: 401 },
    );
  }

  try {
    const { companyId } = await context.params;
    const body = await request.json();

    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/companies/${companyId}/reviews`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const payload = await backendResponse.json();

    return NextResponse.json(payload, {
      status: backendResponse.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to reach the review service.",
      },
      { status: 500 },
    );
  }
}
