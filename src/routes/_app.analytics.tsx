import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader, Panel, StatCard } from "@/components/team-it/Page";
import { BarChart, DonutChart, LineChart } from "@/components/team-it/Charts";
import { productivityTrend, teamComparison, teams, users } from "@/lib/team-it/data";
import { UserAvatar } from "@/components/team-it/Avatar";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Team-it" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
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
            data={teamComparison.map((t, i) => ({
              label: t.team,
              value: t.completed,
              color: teams[i]?.color ?? "var(--primary)",
            }))}
          />
        </Panel>
        <Panel title="Top contributors">
          <div className="space-y-3">
            {users
              .filter((u) => u.role !== "admin")
              .sort((a, b) => b.hoursThisWeek - a.hoursThisWeek)
              .slice(0, 5)
              .map((u, i) => (
                <div key={u.id} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-bold text-muted-foreground">{i + 1}</span>
                  <UserAvatar user={u} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium">{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.team}</div>
                  </div>
                  <div className="font-mono text-xs font-semibold tabular-nums">{u.hoursThisWeek}h</div>
                </div>
              ))}
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}
