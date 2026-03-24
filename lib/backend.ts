import "server-only";

import { cookies } from "next/headers";

const DEFAULT_BACKEND_API_BASE_URL = "http://localhost:5050/api/v1";

export const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  DEFAULT_BACKEND_API_BASE_URL;

export function buildBackendUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(normalizedPath, `${BACKEND_API_BASE_URL}/`).toString();
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();

  return cookieStore.get("auth_token")?.value ?? null;
}
