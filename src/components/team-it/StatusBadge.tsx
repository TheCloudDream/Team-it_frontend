import { cn } from "@/lib/utils";
import type { Priority, TaskStatus } from "@/lib/team-it/data";
import { priorityLabels, statusLabels } from "@/lib/team-it/data";

const statusClasses: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-info/10 text-info",
  blocked: "bg-destructive/10 text-destructive",
  review: "bg-warning/15 text-warning-foreground dark:text-warning",
  done: "bg-success/10 text-success",
};

const priorityClasses: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info",
  high: "bg-warning/15 text-warning-foreground dark:text-warning",
  urgent: "bg-destructive/10 text-destructive",
};

export function StatusBadge({ status, className }: { status: TaskStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        statusClasses[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        priorityClasses[priority],
        className,
      )}
    >
      {priorityLabels[priority]}
    </span>
  );
}
