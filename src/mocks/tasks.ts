import { TaskPriority, TaskStatus } from "@/types/task";

export const mockTasks = [
  {
    id: "1",
    title: "Create FastAPI Auth",
    description: "Implement JWT authentication",

    assigneeId: "u1",
    teamId: "t1",

    priority: TaskPriority.HIGH,
    status: TaskStatus.IN_PROGRESS,

    estimatedHours: 8,
    actualHours: 3,

    dueDate: "2026-07-15",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
