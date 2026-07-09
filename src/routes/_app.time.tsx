import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pause, Play, Plus } from "lucide-react";
import { PageContainer, PageHeader, Panel, StatCard } from "@/components/team-it/Page";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/team-it/Charts";
import { tasks, users } from "@/lib/team-it/data";

export const Route = createFileRoute("/_app/time")({
  head: () => ({ meta: [{ title: "Time tracking — Team-it" }] }),
  component: TimePage,
});

function TimePage() {
  const [running, setRunning] = useState(false);
  const me = users.find((u) => u.name === "Priya Anand")!;
  const myTasks = tasks.filter((t) => t.assigneeId === me.id);

  const week = [
    { label: "Mon", value: 6.5 },
    { label: "Tue", value: 7.2 },
    { label: "Wed", value: 5.0 },
    { label: "Thu", value: 8.1 },
    { label: "Fri", value: 4.0 },
    { label: "Sat", value: 0 },
    { label: "Sun", value: 0 },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Time tracking"
        description="Log time, review your week, and see task-level totals."
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)] md:col-span-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className={`grid size-14 place-items-center rounded-full ${
              running ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            {running ? <Pause className="size-5" /> : <Play className="size-5 pl-0.5" />}
          </button>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {running ? "Timer running · ENG-414" : "Ready to start"}
            </div>
            <div className="font-mono text-3xl font-semibold tabular-nums">
              {running ? "00:42:18" : "00:00:00"}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-1 size-4" /> Manual entry
          </Button>
        </div>
        <StatCard label="This week" value="30.8h" progress={77} hint="of 40h capacity" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="This week">
          <BarChart
            data={week.map((w) => ({ label: w.label, value: w.value, color: "var(--primary)" }))}
          />
        </Panel>

        <Panel title="This month by task">
          <div className="space-y-3">
            {myTasks.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                  {t.code}
                </span>
                <span className="flex-1 truncate text-sm">{t.title}</span>
                <span className="font-mono text-sm font-semibold tabular-nums">{t.actualHours}h</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}
