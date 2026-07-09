import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageContainer, PageHeader, Panel, StatCard } from "@/components/team-it/Page";
import { BarChart, DonutChart, LineChart } from "@/components/team-it/Charts";
import { getUsers } from "@/services/user.service";
import type { User } from "@/types/user";
import { UserAvatar } from "@/components/team-it/Avatar";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Team-it" }] }),
  component: AnalyticsPage,
});

// Structured local layout constants for metrics
const productivityTrend = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 82 },
  { month: "May", score: 89 },
];

const teamComparison = [
  { team: "Engineering", completed: 42 },
  { team: "Product", completed: 28 },
  { team: "Design", completed: 31 },
];

function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  // Filter out admins safely and simulate contributor hierarchy sorting
  const contributors = users.filter((u) => u.role?.toLowerCase() !== "admin");

  return (
    <PageContainer>
      <PageHeader title="Analytics" description="Productivity, workload, and completion metrics across teams." />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Completion rate" value="94%" tone="success" hint="+2.4% vs last month" progress={94} />
        <StatCard label="Avg cycle time" value="2.8d" hint="↓ 0.4d improvement" />
        <StatCard label="On-time delivery" value="87%" progress={87} />
        <StatCard label="Employee NPS" value="+42" tone="info" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Productivity trend" className="lg:col-span-2">
          <LineChart
            labels={productivityTrend.map((p) => p.month)}
            series={[{ name: "Score", values: productivityTrend.map((p) => p.score), color: "var(--primary)" }]}
          />
        </Panel>
        <Panel title="Task status split">
          <DonutChart
            segments={[
              { label: "Done", value: 210, color: "var(--success)" },
              { label: "In progress", value: 42, color: "var(--primary)" },
              { label: "Blocked", value: 8, color: "var(--destructive)" },
              { label: "Review", value: 18, color: "var(--warning)" },
            ]}
          />
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Team comparison" className="lg:col-span-2">
          <BarChart
            data={teamComparison.map((t) => ({
              label: t.team,
              value: t.completed,
              color: "var(--primary)",
            }))}
          />
        </Panel>
        <Panel title="Top contributors">
          <div className="space-y-3">
            {contributors.slice(0, 5).map((u, i) => {
              // Simulated contributor stats matching previous dynamic keys tracking standard hours
              const hoursThisWeek = 30 + (i * 2); 
              return (
                <div key={u.id} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-bold text-muted-foreground">{i + 1}</span>
                  <UserAvatar user={u} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium">{u.firstName} {u.lastName}</div>
                    <div className="text-[10px] text-muted-foreground">{u.teamId ?? "Core Team"}</div>
                  </div>
                  <div className="font-mono text-xs font-semibold tabular-nums">{hoursThisWeek}h</div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}
