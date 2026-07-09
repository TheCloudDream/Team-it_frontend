import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useApp } from "@/lib/team-it/app-context";
import { PageContainer, PageHeader, Panel, StatCard } from "@/components/team-it/Page";
import { LineChart } from "@/components/team-it/Charts";
import { UserAvatar } from "@/components/team-it/Avatar";
import { PriorityBadge, StatusBadge } from "@/components/team-it/StatusBadge";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/services/task.service";
import { getUsers } from "@/services/user.service";
import { TaskStatus } from "@/types/task";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Team-it" },
      { name: "description", content: "Your Team-it workspace overview." },
    ],
  }),
  component: Dashboard,
});

// Self-contained high-fidelity presentation constants
const localTrend = [
  { month: "Jan", score: 7.2 },
  { month: "Feb", score: 7.5 },
  { month: "Mar", score: 8.0 },
  { month: "Apr", score: 7.9 },
  { month: "May", score: 8.4 },
];

const localBurndown = [
  { day: "Day 1", ideal: 100, actual: 100 },
  { day: "Day 3", ideal: 70, actual: 75 },
  { day: "Day 5", ideal: 40, actual: 38 },
  { day: "Day 7", ideal: 10, actual: 5 },
];

const localActivity = [
  { id: "a1", actor: "Sarah Jenkins", action: "completed task", target: "API Gateway Auth", time: "10m ago" },
  { id: "a2", actor: "Alex Rivera", action: "blocked on", target: "Database Migration", time: "1h ago" },
  { id: "a3", actor: "Priya Anand", action: "started tracking time on", target: "Dashboard Charts", time: "2h ago" },
  { id: "a4", actor: "System", action: "deployed sprint artifact", target: "Staging v1.4", time: "4h ago" },
];

const localNotifications = [
  { id: "n1", unread: true, title: "Mentioned in comments", body: "Sarah tagged you in code review", time: "15m ago" },
  { id: "n2", unread: true, title: "Sprint goal adjusted", body: "Engineering sprint 42 timeline updated", time: "2h ago" },
  { id: "n3", unread: false, title: "Task assigned", body: "Fix sidebar structural overflow layout", time: "1d ago" },
];

const localMilestones = [
  { id: "m1", name: "Alpha Release v1.0", completedCount: 8, taskCount: 12, deadline: "2026-08-15", progress: 65 },
  { id: "m2", name: "UI Refactor Integration", completedCount: 3, taskCount: 8, deadline: "2026-09-01", progress: 40 },
];

const localTeams = [
  { id: "t1", name: "Engineering", completed: 42, active: 12, color: "#3b82f6" },
  { id: "t2", name: "Product/Design", completed: 28, active: 6, color: "#ec4899" },
];

function Dashboard() {
  const { role } = useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    Promise.all([getTasks(), getUsers()]).then(([fetchedTasks, fetchedUsers]) => {
      setTasks(fetchedTasks);
      setUsers(fetchedUsers);
    });
  }, []);

  if (role === "admin") return <AdminDashboard users={users} />;
  if (role === "manager") return <ManagerDashboard tasks={tasks} users={users} />;
  return <MemberDashboard tasks={tasks} users={users} />;
}

function AdminDashboard({ users }: { users: User[] }) {
  return (
    <PageContainer>
      <PageHeader
        title="Company overview"
        description="Health, productivity, and activity across every team."
        actions={
          <>
            <Button variant="outline" size="sm">Export report</Button>
            <Button size="sm">
              <Plus className="mr-1 size-4" /> Invite user
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total employees" value={users.length > 0 ? users.length.toString() : "1,204"} hint={<span className="text-success">+12 this week</span>} />
        <StatCard label="Active employees" value={users.length > 0 ? users.filter(u => u.status?.toLowerCase() === "active").length.toString() : "1,148"} hint={<span className="text-muted-foreground">95.3% weekly active</span>} />
        <StatCard label="Teams" value={localTeams.length} hint="4 managers assigned" />
        <StatCard label="Tasks completed" value="342" hint={<span className="text-success">+8.2% MoM</span>} />
        <StatCard label="Productivity score" value="8.4" tone="info" hint={<span className="text-info">+0.4 vs June</span>} progress={84} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Employee activity trend" action={<span className="text-xs text-muted-foreground">Last 6 months</span>} className="lg:col-span-2">
          <LineChart
            labels={localTrend.map((p) => p.month)}
            series={[{ name: "Productivity", values: localTrend.map((p) => p.score), color: "var(--primary)" }]}
          />
        </Panel>
        <Panel title="Quick actions">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Invite user", icon: Plus, to: "/users" },
              { label: "Create team", icon: Sparkles, to: "/teams" },
              { label: "View analytics", icon: TrendingUp, to: "/analytics" },
              { label: "Review blocked", icon: Flame, to: "/blocked" },
            ].map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="group flex flex-col gap-2 rounded-xl border border-border p-3 transition-colors hover:border-primary/50 hover:bg-primary-soft"
              >
                <a.icon className="size-4 text-primary" />
                <span className="text-xs font-semibold">{a.label}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Team performance" className="lg:col-span-2">
          <div className="space-y-4">
            ={localTeams.map((t) => {
              const total = t.completed + t.active;
              const pct = Math.round((t.completed / total) * 100);
              return (
                <div key={t.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ background: t.color }} />
                      <span className="font-medium">{t.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.completed} completed · {t.active} active · <span className="font-semibold text-foreground">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: t.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel title="Recent activity">
          <ActivityFeed />
        </Panel>
      </div>
    </PageContainer>
  );
}

function ManagerDashboard({ tasks, users }: { tasks: Task[]; users: User[] }) {
  const inProgress = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;
  const blocked = tasks.filter((t) => t.status === TaskStatus.BLOCKED);
  const upcoming = [...tasks]
    .filter((t) => t.status !== TaskStatus.DONE)
    .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
    .slice(0, 5);

  return (
    <PageContainer>
      <PageHeader
        title="Manager dashboard"
        description="Engineering sprint #42 · 4 days remaining"
        actions={
          <>
            <Button variant="outline" size="sm">Sprint settings</Button>
            <Button size="sm">
              <Plus className="mr-1 size-4" /> New task
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Tasks in progress" value={inProgress} hint="4 assigned this week" />
        <StatCard label="Blocked tasks" value={blocked.length} tone="danger" hint="Requires action" />
        <StatCard label="Team velocity" value="42.8" hint="points / sprint avg" />
        <StatCard label="Sprint progress" value="68%" progress={68} />
        <StatCard label="Upcoming deadlines" value="7" tone="warning" hint="Next 5 days" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Sprint burndown" className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-primary" /> Actual</div>
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-muted-foreground/40" /> Ideal</div>
          </div>
          <LineChart
            labels={localBurndown.map((b) => b.day)}
            series={[
              { name: "Ideal", values: localBurndown.map((b) => b.ideal), color: "var(--muted-foreground)", dashed: true },
              { name: "Actual", values: localBurndown.map((b) => b.actual), color: "var(--primary)" },
            ]}
          />
        </Panel>

        <Panel title="Workload distribution" action={<Link to="/workload" className="text-xs font-medium text-primary hover:underline">View all</Link>}>
          <div className="space-y-4">
            {users
              .filter((u) => u.role?.toLowerCase() === "member" || u.role?.toLowerCase() === "user")
              .slice(0, 5)
              .map((u, i) => {
                const hoursThisWeek = 32 + (i * 2);
                const capacity = 40;
                const pct = Math.round((hoursThisWeek / capacity) * 100);
                const over = pct > 100;
                return (
                  <div key={u.id}>
                    <div className="mb-1.5 flex items-center gap-2 text-xs">
                      <UserAvatar user={u} size="xs" />
                      <span className="flex-1 truncate font-medium">{u.firstName} {u.lastName}</span>
                      <span className={over ? "text-destructive font-semibold" : "text-muted-foreground"}>
                        {hoursThisWeek}/{capacity}h
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full ${over ? "bg-destructive" : pct > 85 ? "bg-warning" : "bg-primary"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Upcoming deadlines" className="lg:col-span-2" action={<Link to="/tasks" className="text-xs font-medium text-primary hover:underline">All tasks →</Link>}>
          <div className="divide-y divide-border">
            {upcoming.map((t) => {
              const assignee = users.find((u) => u.id === t.assigneeId);
              return (
                <Link
                  key={t.id}
                  to="/tasks/$id"
                  params={{ id: t.id }}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                >
                  <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                    {t.code ?? "TSK"}
                  </span>
                  <span className="flex-1 truncate text-sm font-medium">{t.title}</span>
                  <PriorityBadge priority={t.priority} />
                  <StatusBadge status={t.status} />
                  {assignee && <UserAvatar user={assignee} size="xs" />}
                  <span className="w-16 text-right text-xs text-muted-foreground">{(t.dueDate || "").slice(5)}</span>
                </Link>
              );
            })}
          </div>
        </Panel>
        <Panel title="Recent activity">
          <ActivityFeed />
        </Panel>
      </div>
    </PageContainer>
  );
}

function MemberDashboard({ tasks, users }: { tasks: Task[]; users: User[] }) {
  // Use first user record as self fallback safely
  const me = users[0] || { id: "current-user", firstName: "Priya", lastName: "Anand" };
  const fullName = `${me.firstName} ${me.lastName}`;
  const myTasks = tasks.filter((t) => t.assigneeId === me.id);
  const dueToday = myTasks.filter((t) => t.dueDate === "2026-07-18");
  const overdue = myTasks.filter((t) => t.dueDate && t.dueDate < "2026-07-09" && t.status !== TaskStatus.DONE);
  const upcoming = myTasks.filter((t) => t.status !== TaskStatus.DONE).slice(0, 5);
  const unreadCount = localNotifications.filter((n) => n.unread).length;

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome back, ${me.firstName}`}
        description="Here's your work at a glance."
        actions={<Button variant="outline" size="sm"><Clock className="mr-1 size-4" /> Start timer</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Assigned tasks" value={myTasks.length} hint="Across 2 milestones" />
        <StatCard label="Due today" value={dueToday.length} tone="warning" hint="Wrap up before EOD" />
        <StatCard label="Overdue" value={overdue.length} tone="danger" hint="Reschedule or complete" />
        <StatCard label="Hours logged this week" value="34h" progress={85} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Upcoming tasks" className="lg:col-span-2" action={<Link to="/tasks" className="text-xs font-medium text-primary hover:underline">View all →</Link>}>
          <div className="divide-y divide-border">
            {upcoming.map((t) => (
              <Link
                key={t.id}
                to="/tasks/$id"
                params={{ id: t.id }}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
              >
                <CheckCircle2 className="size-4 text-muted-foreground" />
                <span className="flex-1 truncate text-sm font-medium">{t.title}</span>
                <PriorityBadge priority={t.priority} />
                <StatusBadge status={t.status} />
                <span className="w-16 text-right text-xs text-muted-foreground">Due {(t.dueDate || "").slice(5)}</span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="Notifications" action={<Link to="/notifications" className="text-xs font-medium text-primary hover:underline">{unreadCount} unread <ArrowUpRight className="ml-0.5 inline size-3" /></Link>}>
          <div className="space-y-4">
            {localNotifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex gap-3">
                <span className={`mt-1 size-2 shrink-0 rounded-full ${n.unread ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{n.body}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Current milestones" className="lg:col-span-2">
          <div className="space-y-4">
            {localMilestones.slice(0, 3).map((m) => (
              <div key={m.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {m.completedCount}/{m.taskCount} · due {m.deadline.slice(5)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${m.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent activity">
          <ActivityFeed compact />
        </Panel>
      </div>
    </PageContainer>
  );
}

function ActivityFeed({ compact }: { compact?: boolean }) {
  const items = compact ? localActivity.slice(0, 4) : localActivity;
  return (
    <ol className="relative space-y-4 border-l border-border pl-4">
      {items.map((a) => (
        <li key={a.id} className="relative">
          <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-primary ring-4 ring-card" />
          <div className="text-xs">
            <span className="font-semibold">{a.actor}</span>{" "}
            <span className="text-muted-foreground">{a.action}</span>{" "}
            <span className="font-medium text-primary">{a.target}</span>
          </div>
          <div className="mt-0.5 text-[10px] text-muted-foreground">{a.time}</div>
        </li>
      ))}
    </ol>
  );
}
