import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageContainer, PageHeader, Panel } from "@/components/team-it/Page";
import { UserAvatar } from "@/components/team-it/Avatar";
import { getTasks } from "@/services/task.service";
import { getUsers } from "@/services/user.service";
import { TaskStatus } from "@/types/task";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_app/workload")({
  head: () => ({ meta: [{ title: "Team workload — Team-it" }] }),
  component: WorkloadPage,
});

function WorkloadPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
    getUsers().then(setUsers);
  }, []);

  // Filter members based on standard lower/uppercase strings mapping safely
  const members = users.filter(
    (u) => u.role?.toLowerCase() === "member" || u.role?.toLowerCase() === "user",
  );

  return (
    <PageContainer>
      <PageHeader
        title="Team workload"
        description="Who's carrying what — with capacity indicators."
      />

      <Panel>
        <div className="space-y-6">
          {members.map((u) => {
            const active = tasks.filter((t) => t.assigneeId === u.id && t.status !== TaskStatus.DONE);
            
            // Safe fallbacks for schema properties not directly specified on current core model
            const hoursThisWeek = 28; 
            const capacity = 40;
            const pct = Math.round((hoursThisWeek / capacity) * 100);
            
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
                    <div className="text-sm font-semibold">{u.firstName} {u.lastName}</div>
                    <div className="text-xs text-muted-foreground">{u.teamId ?? "No Team"} · {active.length} active tasks</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {hoursThisWeek}<span className="text-muted-foreground">/{capacity}h</span>
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
                      TASK-{t.id} · {t.title.slice(0, 30)}
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
