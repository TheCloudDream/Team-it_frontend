import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, RotateCcw, MessageSquare } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { UserAvatar } from "@/components/team-it/Avatar";
import { PriorityBadge } from "@/components/team-it/StatusBadge";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/services/task.service";
import { getUsers } from "@/services/user.service";
import { TaskStatus } from "@/types/task";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_app/review")({
  head: () => ({ meta: [{ title: "Task review — Team-it" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
    getUsers().then(setUsers);
  }, []);

  const reviewing = tasks.filter((t) => t.status === TaskStatus.UNDER_REVIEW);

  return (
    <PageContainer>
      <PageHeader
        title="Awaiting review"
        description="Approve, request revisions, or leave feedback."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {reviewing.map((t) => {
          const u = users.find((x) => x.id === t.assigneeId);
          return (
            <div
              key={t.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                  TASK-{t.id}
                </span>
                <PriorityBadge priority={t.priority} />
              </div>
              <Link
                to="/tasks/$id"
                params={{ id: t.id }}
                className="text-base font-semibold hover:text-primary"
              >
                {t.title}
              </Link>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                {u ? (
                  <>
                    <UserAvatar user={u} size="xs" />
                    <span className="text-xs">{u.firstName} {u.lastName}</span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">Unassigned</span>
                )}
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  {t.actualHours}h logged of {t.estimatedHours}h
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">
                  <CheckCircle2 className="mr-1 size-4" /> Approve
                </Button>
                <Button size="sm" variant="outline" defaultChecked>
                  <RotateCcw className="mr-1 size-4" /> Revise
                </Button>
                <Button size="sm" variant="ghost">
                  <MessageSquare className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
