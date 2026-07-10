import { api } from "./api-client";
import { getAccessToken, setAccessToken } from "@/lib/team-it/token-store";
import type { User, UserCreate } from "@/types/user";

// Matches the exact snake_case structure returned by your FastAPI backend
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

/**
 * Log in an existing user.
 * Your FastAPI backend takes a strict JSON schema (UserLogin) containing 
 * raw 'email' and 'password' properties, NOT url-encoded OAuth2 form fields.
 */
export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<TokenResponse>("/auth/login", {
    email,
    password,
  });
  
  // Use snake_case access_token matching your backend's return statement
  setAccessToken(data.access_token);
  return getCurrentUser();
}

/**
 * Register a new user account.
 * Hits the POST /auth/register route from your backend router.
 */
export async function register(payload: UserCreate): Promise<User> {
  // Your backend outputs a validated UserOut object upon successful registration
  const { data } = await api.post<User>("/auth/register", payload);
  
  // If your business flow logs them in immediately, you can trigger a login here.
  // Otherwise, return the registered user profile.
  return data;
}

/**
 * Log out the current user session.
 * Clears the server-side HTTP-Only refresh cookie and deletes the local storage memory state.
 */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } finally {
    // Always clear the local token, even if the network call fails —
    // an offline sign-out should still log the user out of this tab.
    setAccessToken(null);
  }
}

/**
 * Called once on app boot to re-establish a session from the refresh
 * cookie, since the access token itself only lives in memory.
 */
export async function restoreSession(): Promise<User | null> {
  try {
    const { data } = await api.post<TokenResponse>("/auth/refresh");
    setAccessToken(data.access_token);
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
  const { data } = await api.post<TokenResponse>("/auth/accept-invitation", params);
  setAccessToken(data.access_token);
  return getCurrentUser();
}
