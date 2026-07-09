import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  UsersRound,
  BarChart3,
  KanbanSquare,
  ListChecks,
  Flag,
  Gauge,
  ShieldAlert,
  CheckCheck,
  Timer,
  Bell,
  Settings,
  Search,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useApp } from "@/lib/team-it/app-context";
import { users, notifications } from "@/lib/team-it/data";
import type { Role } from "@/lib/team-it/data";
import { UserAvatar } from "./Avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "manager", "member"] },
      { to: "/board", label: "Task Board", icon: KanbanSquare, roles: ["manager", "member"] },
      { to: "/tasks", label: "Tasks", icon: ListChecks, roles: ["manager", "member"] },
      { to: "/milestones", label: "Milestones", icon: Flag, roles: ["manager"] },
    ],
  },
  {
    label: "Management",
    items: [
      { to: "/workload", label: "Team Workload", icon: Gauge, roles: ["manager"] },
      { to: "/blocked", label: "Blocked Tasks", icon: ShieldAlert, roles: ["manager"] },
      { to: "/review", label: "Task Review", icon: CheckCheck, roles: ["manager"] },
      { to: "/time", label: "Time Tracking", icon: Timer, roles: ["member"] },
    ],
  },
  {
    label: "Administration",
    items: [
      { to: "/users", label: "User Directory", icon: Users, roles: ["admin"] },
      { to: "/teams", label: "Teams", icon: UsersRound, roles: ["admin"] },
      { to: "/analytics", label: "Analytics", icon: BarChart3, roles: ["admin"] },
    ],
  },
];

export function AppShell({ children, title, breadcrumb }: { children: ReactNode; title?: string; breadcrumb?: string[] }) {
  const { role, setRole, theme, toggleTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = users.find((u) => u.role === role) ?? users[0];
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            T
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Team-it</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Workspace</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          {navGroups.map((group) => {
            const visible = group.items.filter((i) => i.roles.includes(role));
            if (visible.length === 0) return null;
            return (
              <div key={group.label} className="mb-6">
                <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </div>
                <div className="space-y-0.5">
                  {visible.map((item) => {
                    const active =
                      location.pathname === item.to ||
                      (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary-soft text-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent",
                        )}
                      >
                        <Icon className={cn("size-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            View as
          </div>
          <div className="flex gap-1 rounded-md bg-muted p-1">
            {(["admin", "manager", "member"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "flex-1 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors",
                  role === r ? "bg-surface text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-4">
            {breadcrumb && breadcrumb.length > 0 && (
              <nav className="hidden items-center gap-2 text-sm md:flex">
                {breadcrumb.map((b, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-muted-foreground/50">/</span>}
                    <span className={cn(i === breadcrumb.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground")}>
                      {b}
                    </span>
                  </span>
                ))}
              </nav>
            )}
            {title && !breadcrumb && <h1 className="truncate text-lg font-semibold">{title}</h1>}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tasks, people…"
                className="h-9 w-72 rounded-full border border-border bg-muted/50 pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:bg-surface"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </Button>
            <Link
              to="/notifications"
              className="relative inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            >
              <Bell className="size-4" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-surface" />
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted">
                  <UserAvatar user={currentUser} size="sm" />
                  <div className="hidden text-left md:block">
                    <div className="text-xs font-semibold leading-tight">{currentUser.name}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{role}</div>
                  </div>
                  <ChevronDown className="size-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/settings/profile" })}>
                  <Settings className="mr-2 size-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/settings/security" })}>
                  <ShieldAlert className="mr-2 size-4" /> Security
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/settings/preferences" })}>
                  <Sun className="mr-2 size-4" /> Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>
                  <LogOut className="mr-2 size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin bg-background">{children}</main>
      </div>
    </div>
  );
}
