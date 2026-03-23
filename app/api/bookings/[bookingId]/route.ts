import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

type RouteContext = {
  params: Promise<{
    bookingId: string;
  }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Please sign in before deleting a booking." },
      { status: 401 },
    );
  }

  try {
    const { bookingId } = await context.params;

    const backendResponse = await fetch(`${BACKEND_API_BASE_URL}/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const payload = await backendResponse.json();

    return NextResponse.json(payload, {
      status: backendResponse.status,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to reach the booking service." },
      { status: 500 },
    );
  }
}
