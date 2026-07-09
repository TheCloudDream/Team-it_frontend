export type Role = "admin" | "manager" | "member";

export type TaskStatus = "todo" | "in_progress" | "blocked" | "review" | "done";
export type Priority = "low" | "medium" | "high" | "urgent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  team: string;
  status: "active" | "inactive" | "invited";
  initials: string;
  color: string;
  hoursThisWeek: number;
  capacity: number;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  managerCount: number;
  completed: number;
  active: number;
  color: string;
}

export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  team: string;
  milestone: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  blockedReason?: string;
  timeBlocked?: string;
  comments: number;
  createdAt: string;
}

export interface Milestone {
  id: string;
  name: string;
  team: string;
  deadline: string;
  progress: number;
  taskCount: number;
  completedCount: number;
}

export interface Notification {
  id: string;
  type: "assigned" | "deadline" | "approved" | "revision" | "blocker_resolved";
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  kind: "merge" | "block" | "review" | "assign" | "comment";
}

const palette = [
  "oklch(0.68 0.16 265)",
  "oklch(0.68 0.15 150)",
  "oklch(0.72 0.14 45)",
  "oklch(0.68 0.18 22)",
  "oklch(0.66 0.13 200)",
  "oklch(0.7 0.15 320)",
];

export const users: User[] = [
  { id: "u1", name: "Sarah Jenkins", email: "sarah@team-it.co", role: "admin", team: "Leadership", status: "active", initials: "SJ", color: palette[0], hoursThisWeek: 32, capacity: 40 },
  { id: "u2", name: "Marcus Kane", email: "marcus@team-it.co", role: "manager", team: "Engineering", status: "active", initials: "MK", color: palette[1], hoursThisWeek: 36, capacity: 40 },
  { id: "u3", name: "Elena Rossi", email: "elena@team-it.co", role: "manager", team: "Design", status: "active", initials: "ER", color: palette[2], hoursThisWeek: 40, capacity: 40 },
  { id: "u4", name: "Priya Anand", email: "priya@team-it.co", role: "member", team: "Engineering", status: "active", initials: "PA", color: palette[3], hoursThisWeek: 28, capacity: 40 },
  { id: "u5", name: "Leo Martin", email: "leo@team-it.co", role: "member", team: "Engineering", status: "active", initials: "LM", color: palette[4], hoursThisWeek: 34, capacity: 40 },
  { id: "u6", name: "Yuki Tanaka", email: "yuki@team-it.co", role: "member", team: "Design", status: "active", initials: "YT", color: palette[5], hoursThisWeek: 30, capacity: 40 },
  { id: "u7", name: "Amara Okafor", email: "amara@team-it.co", role: "member", team: "Design", status: "active", initials: "AO", color: palette[0], hoursThisWeek: 42, capacity: 40 },
  { id: "u8", name: "Diego Silva", email: "diego@team-it.co", role: "member", team: "Engineering", status: "invited", initials: "DS", color: palette[2], hoursThisWeek: 0, capacity: 40 },
  { id: "u9", name: "Nora Kim", email: "nora@team-it.co", role: "member", team: "Marketing", status: "active", initials: "NK", color: palette[3], hoursThisWeek: 22, capacity: 40 },
  { id: "u10", name: "Tom Weaver", email: "tom@team-it.co", role: "manager", team: "Marketing", status: "active", initials: "TW", color: palette[4], hoursThisWeek: 38, capacity: 40 },
  { id: "u11", name: "Ivy Chen", email: "ivy@team-it.co", role: "member", team: "Marketing", status: "inactive", initials: "IC", color: palette[5], hoursThisWeek: 0, capacity: 40 },
  { id: "u12", name: "Karl Bauer", email: "karl@team-it.co", role: "member", team: "Engineering", status: "active", initials: "KB", color: palette[1], hoursThisWeek: 36, capacity: 40 },
];

export const teams: Team[] = [
  { id: "t1", name: "Engineering", description: "Product engineering, platform, and infrastructure", memberCount: 5, managerCount: 1, completed: 128, active: 24, color: "oklch(0.68 0.16 265)" },
  { id: "t2", name: "Design", description: "Product design and brand", memberCount: 3, managerCount: 1, completed: 84, active: 12, color: "oklch(0.72 0.14 45)" },
  { id: "t3", name: "Marketing", description: "Growth, content, and lifecycle", memberCount: 3, managerCount: 1, completed: 56, active: 9, color: "oklch(0.68 0.18 22)" },
  { id: "t4", name: "Operations", description: "Finance, HR, and internal ops", memberCount: 4, managerCount: 1, completed: 42, active: 6, color: "oklch(0.66 0.13 200)" },
];

export const milestones: Milestone[] = [
  { id: "m1", name: "Q4 Platform Rebuild", team: "Engineering", deadline: "2026-12-20", progress: 68, taskCount: 24, completedCount: 16 },
  { id: "m2", name: "Design System v3", team: "Design", deadline: "2026-11-30", progress: 82, taskCount: 18, completedCount: 15 },
  { id: "m3", name: "Enterprise Launch", team: "Marketing", deadline: "2026-12-05", progress: 45, taskCount: 12, completedCount: 5 },
  { id: "m4", name: "SOC 2 Type II", team: "Operations", deadline: "2027-01-15", progress: 30, taskCount: 20, completedCount: 6 },
];

export const tasks: Task[] = [
  { id: "tk1", code: "ENG-412", title: "Refactor auth middleware for multi-tenant support", description: "Migrate our current single-tenant auth flow to support workspace-scoped sessions. Includes JWT claim restructuring and RLS updates.", status: "todo", priority: "high", assigneeId: "u4", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-18", estimatedHours: 12, actualHours: 0, comments: 3, createdAt: "2026-07-01" },
  { id: "tk2", code: "ENG-413", title: "Database migration script v2.4", description: "Write forward and rollback migrations for the new workspace_members table.", status: "todo", priority: "medium", assigneeId: "u5", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-20", estimatedHours: 6, actualHours: 0, comments: 1, createdAt: "2026-07-02" },
  { id: "tk3", code: "ENG-414", title: "Implement real-time collaboration engine", description: "WebSocket-based presence and cursor sync for the task board.", status: "in_progress", priority: "urgent", assigneeId: "u12", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-15", estimatedHours: 24, actualHours: 14, comments: 8, createdAt: "2026-06-20" },
  { id: "tk4", code: "ENG-415", title: "Optimize task list rendering for 10k+ items", description: "Virtualize the task list and add server-side pagination.", status: "in_progress", priority: "medium", assigneeId: "u4", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-22", estimatedHours: 10, actualHours: 4, comments: 2, createdAt: "2026-07-03" },
  { id: "tk5", code: "ENG-416", title: "Stripe API secret key mismatch", description: "Production webhook signatures fail intermittently.", status: "blocked", priority: "urgent", assigneeId: "u5", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-12", estimatedHours: 4, actualHours: 2, blockedReason: "Waiting on DevOps to rotate credentials", timeBlocked: "2d 4h", comments: 5, createdAt: "2026-07-05" },
  { id: "tk6", code: "DES-92", title: "Design system documentation for components", description: "Complete Storybook coverage for the 40 components shipped in v3.", status: "in_progress", priority: "medium", assigneeId: "u6", team: "Design", milestone: "Design System v3", dueDate: "2026-07-25", estimatedHours: 16, actualHours: 6, comments: 4, createdAt: "2026-07-01" },
  { id: "tk7", code: "DES-93", title: "Refine Q3 Brand Guidelines", description: "Update typography scale and color tokens.", status: "todo", priority: "high", assigneeId: "u7", team: "Design", milestone: "Design System v3", dueDate: "2026-07-19", estimatedHours: 8, actualHours: 0, comments: 2, createdAt: "2026-07-04" },
  { id: "tk8", code: "DES-94", title: "Hero component optimization", description: "Reduce LCP by 40% on marketing pages.", status: "review", priority: "high", assigneeId: "u6", team: "Design", milestone: "Design System v3", dueDate: "2026-07-14", estimatedHours: 8, actualHours: 8, comments: 6, createdAt: "2026-06-28" },
  { id: "tk9", code: "MKT-31", title: "Enterprise landing page copy", description: "Draft and iterate on the /enterprise page copy.", status: "todo", priority: "medium", assigneeId: "u9", team: "Marketing", milestone: "Enterprise Launch", dueDate: "2026-07-21", estimatedHours: 6, actualHours: 0, comments: 1, createdAt: "2026-07-05" },
  { id: "tk10", code: "MKT-32", title: "Customer story: Northwind", description: "Interview, draft, and publish.", status: "in_progress", priority: "low", assigneeId: "u9", team: "Marketing", milestone: "Enterprise Launch", dueDate: "2026-07-28", estimatedHours: 8, actualHours: 3, comments: 2, createdAt: "2026-07-02" },
  { id: "tk11", code: "MKT-33", title: "Launch webinar landing", description: "Design + build webinar registration page.", status: "blocked", priority: "medium", assigneeId: "u11", team: "Marketing", milestone: "Enterprise Launch", dueDate: "2026-07-20", estimatedHours: 6, actualHours: 1, blockedReason: "Awaiting speaker confirmation", timeBlocked: "1d 8h", comments: 3, createdAt: "2026-07-04" },
  { id: "tk12", code: "ENG-417", title: "Security patch for WebSocket layer", description: "CVE-2026-1123 remediation.", status: "done", priority: "urgent", assigneeId: "u12", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-08", estimatedHours: 4, actualHours: 5, comments: 4, createdAt: "2026-07-01" },
  { id: "tk13", code: "ENG-418", title: "Billing dashboard alpha", description: "Ship internal alpha of the new billing dashboard.", status: "review", priority: "medium", assigneeId: "u4", team: "Engineering", milestone: "Q4 Platform Rebuild", dueDate: "2026-07-14", estimatedHours: 12, actualHours: 13, comments: 7, createdAt: "2026-06-25" },
  { id: "tk14", code: "DES-95", title: "Onboarding empty states", description: "Illustrate and ship 12 empty state variants.", status: "done", priority: "low", assigneeId: "u7", team: "Design", milestone: "Design System v3", dueDate: "2026-07-05", estimatedHours: 10, actualHours: 9, comments: 3, createdAt: "2026-06-20" },
  { id: "tk15", code: "OPS-08", title: "SOC 2 evidence — access reviews", description: "Compile Q2 access review evidence.", status: "in_progress", priority: "high", assigneeId: "u1", team: "Operations", milestone: "SOC 2 Type II", dueDate: "2026-07-16", estimatedHours: 6, actualHours: 2, comments: 1, createdAt: "2026-07-01" },
];

export const notifications: Notification[] = [
  { id: "n1", type: "assigned", title: "New task assigned", body: "Marcus Kane assigned you ENG-412 · Refactor auth middleware", time: "12m ago", unread: true },
  { id: "n2", type: "deadline", title: "Deadline approaching", body: "ENG-414 is due in 2 days", time: "1h ago", unread: true },
  { id: "n3", type: "approved", title: "Task approved", body: "Elena Rossi approved DES-95 · Onboarding empty states", time: "3h ago", unread: true },
  { id: "n4", type: "revision", title: "Revision requested", body: "Marcus Kane requested changes on ENG-418", time: "Yesterday", unread: false },
  { id: "n5", type: "blocker_resolved", title: "Blocker resolved", body: "DevOps rotated credentials — ENG-416 is unblocked", time: "Yesterday", unread: false },
  { id: "n6", type: "assigned", title: "New task assigned", body: "Sarah Jenkins added you to OPS-08 · SOC 2 evidence", time: "2 days ago", unread: false },
];

export const activity: ActivityItem[] = [
  { id: "a1", actor: "Leo Martin", action: "merged", target: "feat/auth-v2", time: "2h ago", kind: "merge" },
  { id: "a2", actor: "Priya Anand", action: "flagged as blocked", target: "ENG-416", time: "5h ago", kind: "block" },
  { id: "a3", actor: "Elena Rossi", action: "approved", target: "DES-95", time: "6h ago", kind: "review" },
  { id: "a4", actor: "Marcus Kane", action: "assigned", target: "ENG-412 to Priya", time: "Yesterday", kind: "assign" },
  { id: "a5", actor: "Yuki Tanaka", action: "commented on", target: "DES-92", time: "Yesterday", kind: "comment" },
  { id: "a6", actor: "Karl Bauer", action: "moved", target: "ENG-414 → In Progress", time: "2 days ago", kind: "assign" },
];

export const burndown = [
  { day: "Mon", ideal: 100, actual: 100 },
  { day: "Tue", ideal: 88, actual: 92 },
  { day: "Wed", ideal: 76, actual: 82 },
  { day: "Thu", ideal: 64, actual: 68 },
  { day: "Fri", ideal: 52, actual: 55 },
  { day: "Sat", ideal: 40, actual: 42 },
  { day: "Sun", ideal: 28, actual: 30 },
  { day: "Mon", ideal: 16, actual: 22 },
  { day: "Tue", ideal: 4, actual: 12 },
];

export const productivityTrend = [
  { month: "Feb", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 74 },
  { month: "May", score: 82 },
  { month: "Jun", score: 85 },
  { month: "Jul", score: 88 },
];

export const teamComparison = [
  { team: "Engineering", completed: 128, pending: 24 },
  { team: "Design", completed: 84, pending: 12 },
  { team: "Marketing", completed: 56, pending: 9 },
  { team: "Operations", completed: 42, pending: 6 },
];

export const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  blocked: "Blocked",
  review: "Under Review",
  done: "Done",
};

export const statusOrder: TaskStatus[] = ["todo", "in_progress", "blocked", "review", "done"];

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export function getUser(id: string) {
  return users.find((u) => u.id === id);
}
