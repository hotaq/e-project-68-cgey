import { cookies } from "next/headers";

type CurrentUser = {
  _id: string;
  name: string;
  email: string;
  telephone: string;
  role: "user" | "admin";
};

type GetMeResponse = {
  success?: boolean;
  data?: CurrentUser;
};

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${BACKEND_API_BASE_URL}/getme`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as GetMeResponse;
    return payload.data ?? null;
  } catch {
    return null;
  }
}
