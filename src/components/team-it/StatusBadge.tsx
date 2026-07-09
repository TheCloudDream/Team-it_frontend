import { cn } from "@/lib/utils";
import { TaskPriority, TaskStatus } from "@/types/task";
import { priorityLabels, statusLabels } from "@/constants/task";

const statusClasses: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "bg-muted text-muted-foreground",
  [TaskStatus.IN_PROGRESS]: "bg-info/10 text-info",
  [TaskStatus.BLOCKED]: "bg-destructive/10 text-destructive",
  [TaskStatus.UNDER_REVIEW]: "bg-warning/15 text-warning-foreground dark:text-warning",
  [TaskStatus.APPROVED]: "bg-info/10 text-info",
  [TaskStatus.DONE]: "bg-success/10 text-success",
};

const priorityClasses: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "bg-muted text-muted-foreground",
  [TaskPriority.MEDIUM]: "bg-info/10 text-info",
  [TaskPriority.HIGH]: "bg-warning/15 text-warning-foreground dark:text-warning",
  [TaskPriority.CRITICAL]: "bg-destructive/10 text-destructive",
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

export function PriorityBadge({ priority, className }: { priority: TaskPriority; className?: string }) {
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
