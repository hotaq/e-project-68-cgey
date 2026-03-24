export const DEFAULT_BACKEND_API_BASE_URL = "http://localhost:5050/api/v1";

type BackendEnv = {
  API_BASE_URL?: string;
  NEXT_PUBLIC_API_BASE_URL?: string;
};

export function getBackendApiBaseUrl(
  env: BackendEnv = process.env,
): string {
  return (
    env.API_BASE_URL ??
    env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_BACKEND_API_BASE_URL
  );
}

export function buildBackendUrl(
  path: string,
  env: BackendEnv = process.env,
): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(
    normalizedPath,
    `${getBackendApiBaseUrl(env)}/`,
  ).toString();
}
