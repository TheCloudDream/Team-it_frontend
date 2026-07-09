import { createFileRoute, Link, Outlet, useLocation, redirect } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Team-it" }] }),
  beforeLoad: ({ location }) => {
    if (location.pathname === "/settings") {
      throw redirect({ to: "/settings/profile" });
    }
  },
  component: SettingsLayout,
});

const tabs = [
  { to: "/settings/profile", label: "Profile" },
  { to: "/settings/security", label: "Security" },
  { to: "/settings/preferences", label: "Preferences" },
];

function SettingsLayout() {
  const location = useLocation();
  return (
    <PageContainer className="max-w-[1000px]">
      <PageHeader title="Settings" description="Manage your Team-it account." />

      <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((t) => {
          const active = location.pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors",
                active ? "bg-surface shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      <Outlet />
    </PageContainer>
  );
}
