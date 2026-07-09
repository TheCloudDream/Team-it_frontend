import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Plus } from "lucide-react";
import {
  statusOrder,
  statusLabels,
  tasks,
  users,
  type TaskStatus,
} from "@/lib/team-it/data";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { UserAvatar } from "@/components/team-it/Avatar";
import { PriorityBadge } from "@/components/team-it/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/board")({
  head: () => ({
    meta: [{ title: "Task board — Team-it" }],
  }),
  component: BoardPage,
});

const columnAccent: Record<TaskStatus, string> = {
  todo: "bg-muted-foreground/40",
  in_progress: "bg-primary",
  blocked: "bg-destructive",
  review: "bg-warning",
  done: "bg-success",
};

function BoardPage() {
  return (
    <PageContainer className="max-w-none">
      <PageHeader
        title="Engineering Sprint #42"
        description="Drag tasks between columns to update status."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="mr-1 size-4" /> Filters
            </Button>
            <Button size="sm">
              <Plus className="mr-1 size-4" /> New task
            </Button>
          </>
        }
      />

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {statusOrder.map((status) => {
          const colTasks = tasks.filter((t) => t.status === status);
          return (
            <div key={status} className="flex w-[300px] shrink-0 flex-col rounded-2xl bg-surface-muted p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", columnAccent[status])} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">{statusLabels[status]}</h3>
                  <span className="text-xs text-muted-foreground">{colTasks.length}</span>
                </div>
                <button className="rounded p-1 text-muted-foreground hover:bg-muted">
                  <Plus className="size-3.5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {colTasks.map((t) => {
                  const assignee = users.find((u) => u.id === t.assigneeId)!;
                  return (
                    <Link
                      key={t.id}
                      to="/tasks/$id"
                      params={{ id: t.id }}
                      className={cn(
                        "group cursor-grab rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-pop)]",
                        status === "blocked" && "border-l-2 border-l-destructive",
                        status === "in_progress" && "border-l-2 border-l-primary",
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">
                          {t.code}
                        </span>
                        <PriorityBadge priority={t.priority} />
                      </div>
                      <p className="mb-3 text-sm font-medium leading-snug">{t.title}</p>
                      {t.blockedReason && (
                        <p className="mb-3 rounded-md bg-destructive/10 px-2 py-1 text-[10px] text-destructive">
                          {t.blockedReason}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <UserAvatar user={assignee} size="xs" />
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{t.comments} 💬</span>
                          <span>Due {t.dueDate.slice(5)}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
