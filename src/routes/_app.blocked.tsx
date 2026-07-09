import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, MessageSquare, RotateCcw } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { PriorityBadge } from "@/components/team-it/StatusBadge";
import { UserAvatar } from "@/components/team-it/Avatar";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/services/task.service";
import { getUsers } from "@/services/user.service";
import { TaskStatus } from "@/types/task";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_app/blocked")({
  head: () => ({ meta: [{ title: "Blocked tasks — Team-it" }] }),
  component: BlockedPage,
});

function BlockedPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
    getUsers().then(setUsers);
  }, []);

  const blocked = tasks.filter((t) => t.status === TaskStatus.BLOCKED);

  return (
    <PageContainer>
      <PageHeader
        title="Blocked tasks"
        description="Everything requiring intervention, ordered by urgency."
      />

      <div className="space-y-3">
        {blocked.map((t) => {
          const u = users.find((x) => x.id === t.assigneeId);
          return (
            <div
              key={t.id}
              className="rounded-2xl border border-destructive/20 bg-card p-5 shadow-[var(--shadow-elegant)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive">
                      <AlertTriangle className="size-3" /> Blocked
                    </span>
                    <PriorityBadge priority={t.priority} />
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                      TASK-{t.id}
                    </span>
                  </div>
                  <Link to="/tasks/$id" params={{ id: t.id }} className="text-lg font-semibold hover:text-primary">
                    {t.title}
                  </Link>
                  <div className="mt-2 rounded-lg bg-destructive/5 p-3 text-sm">
                    <span className="font-semibold">Reason: </span>
                    <span className="text-muted-foreground">Task is currently blocked.</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    {u ? (
                      <div className="flex items-center gap-2">
                        <UserAvatar user={u} size="xs" />
                        <span className="font-medium">{u.firstName} {u.lastName}</span>
                      </div>
                    ) : (
                      <span className="font-medium text-muted-foreground">Unassigned</span>
                    )}
                    <span className="text-muted-foreground">· {u?.teamId ?? "Unassigned"}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm">Resolve</Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-1 size-4" /> Comment
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="mr-1 size-4" /> Reassign
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {blocked.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <div className="text-4xl">🎉</div>
            <h3 className="mt-2 text-lg font-semibold">No blockers</h3>
            <p className="text-sm text-muted-foreground">Everything is moving smoothly.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
