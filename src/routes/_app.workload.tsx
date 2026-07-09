import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader, Panel } from "@/components/team-it/Page";
import { UserAvatar } from "@/components/team-it/Avatar";
import { tasks, users } from "@/lib/team-it/data";

export const Route = createFileRoute("/_app/workload")({
  head: () => ({ meta: [{ title: "Team workload — Team-it" }] }),
  component: WorkloadPage,
});

function WorkloadPage() {
  const members = users.filter((u) => u.role === "member" && u.status === "active");
  return (
    <PageContainer>
      <PageHeader
        title="Team workload"
        description="Who's carrying what — with capacity indicators."
      />

      <Panel>
        <div className="space-y-6">
          {members.map((u) => {
            const active = tasks.filter((t) => t.assigneeId === u.id && t.status !== "done");
            const pct = Math.round((u.hoursThisWeek / u.capacity) * 100);
            const tone = pct > 100 ? "danger" : pct > 85 ? "warning" : pct > 40 ? "ok" : "low";
            const barColor =
              tone === "danger"
                ? "bg-destructive"
                : tone === "warning"
                  ? "bg-warning"
                  : tone === "ok"
                    ? "bg-primary"
                    : "bg-muted-foreground/40";
            const label =
              tone === "danger" ? "Over capacity" : tone === "warning" ? "Near capacity" : tone === "ok" ? "Healthy" : "Under-utilized";
            return (
              <div key={u.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <div className="mb-3 flex items-center gap-3">
                  <UserAvatar user={u} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.team} · {active.length} active tasks</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {u.hoursThisWeek}<span className="text-muted-foreground">/{u.capacity}h</span>
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </div>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.slice(0, 4).map((t) => (
                    <span
                      key={t.id}
                      className="rounded-md border border-border bg-muted/30 px-2 py-1 text-[10px] font-medium"
                    >
                      {t.code} · {t.title.slice(0, 30)}
                      {t.title.length > 30 ? "…" : ""}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </PageContainer>
  );
}
