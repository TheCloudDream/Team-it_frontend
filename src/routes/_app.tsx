import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/team-it/AppShell";
import { getCurrentUser } from "@/services/auth.service";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location, context }) => {
    // ensureQueryData both (a) checks whether we have a session and
    // (b) seeds the "currentUser" cache that app-context.tsx reads from,
    // so AppShell doesn't issue a second, redundant /users/me call.
    //
    // If there's no access token yet, the request goes out without one,
    // the API returns 401, and the api-client.ts response interceptor
    // transparently tries /auth/refresh using the refresh cookie before
    // giving up — so a hard page refresh with a valid cookie still works.
    try {
      await context.queryClient.ensureQueryData({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        staleTime: Infinity,
      });
    } catch {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
