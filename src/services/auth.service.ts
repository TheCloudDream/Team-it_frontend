import { api } from "./api-client";
import { getAccessToken, setAccessToken } from "@/lib/team-it/token-store";
import type { User } from "@/types/user";

interface LoginResponse {
  accessToken: string;
  tokenType: "bearer";
}

// FastAPI's OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
// with a `username` field — the backend treats email as the username.
export async function login(email: string, password: string): Promise<User> {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);

  const { data } = await api.post<LoginResponse>("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  setAccessToken(data.accessToken);
  return getCurrentUser();
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } finally {
    // Always clear the local token, even if the network call fails —
    // an offline sign-out should still log the user out of this tab.
    setAccessToken(null);
  }
}

// Called once on app boot to re-establish a session from the refresh
// cookie, since the access token itself only lives in memory.
export async function restoreSession(): Promise<User | null> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/refresh");
    setAccessToken(data.accessToken);
    return await getCurrentUser();
  } catch {
    setAccessToken(null);
    return null;
  }
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

export async function acceptInvitation(params: {
  token: string;
  firstName: string;
  lastName: string;
  password: string;
}): Promise<User> {
  const { data } = await api.post<LoginResponse>("/auth/accept-invitation", params);
  setAccessToken(data.accessToken);
  return getCurrentUser();
}
