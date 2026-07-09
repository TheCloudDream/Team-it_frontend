// Access tokens live in memory only — never localStorage, to limit XSS blast
// radius. The refresh token is an HTTP-only cookie the browser sends
// automatically, so this module never touches it directly.
//
// In-memory means a hard page refresh loses the access token; callers should
// call refreshAccessToken() once on app boot to re-establish a session from
// the refresh cookie. See auth.service.ts.

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}
