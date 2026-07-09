import { TaskPriority, TaskStatus } from "@/types/task";

// Board column order, left to right.
export const statusOrder: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.BLOCKED,
  TaskStatus.UNDER_REVIEW,
  TaskStatus.APPROVED,
  TaskStatus.DONE,
];

export const statusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To do",
  [TaskStatus.IN_PROGRESS]: "In progress",
  [TaskStatus.BLOCKED]: "Blocked",
  [TaskStatus.UNDER_REVIEW]: "Under review",
  [TaskStatus.APPROVED]: "Approved",
  [TaskStatus.DONE]: "Done",
};

export const priorityOrder: TaskPriority[] = [
  TaskPriority.LOW,
  TaskPriority.MEDIUM,
  TaskPriority.HIGH,
  TaskPriority.CRITICAL,
];

export const priorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Low",
  [TaskPriority.MEDIUM]: "Medium",
  [TaskPriority.HIGH]: "High",
  [TaskPriority.CRITICAL]: "Critical",
};
