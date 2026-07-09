import axios from "axios";
import { getAccessToken, setAccessToken } from "@/lib/team-it/token-store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  // Refresh token is an HTTP-only cookie; this lets the browser send/receive it.
  withCredentials: true,
});

// Attach the current access token to every outgoing request.
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On a 401, try exactly once to refresh the access token via the refresh
// cookie, then replay the original request. If the refresh itself fails,
// clear the token and let the 401 propagate — the app-level auth guard
// (see routes/_app.tsx) will redirect to /login.
let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = api
      .post("/auth/refresh")
      .then((res) => {
        const token = res.data.accessToken as string;
        setAccessToken(token);
        return token;
      })
      .catch(() => {
        setAccessToken(null);
        return null;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const token = await refreshAccessToken();
      if (token) {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  },
);
