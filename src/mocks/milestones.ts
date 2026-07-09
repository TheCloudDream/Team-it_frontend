import { Milestone } from "@/types/milestone";

export const mockMilestones: Milestone[] = [
  {
    id: "m1",
    title: "Phase 1 Beta Launch",
    description: "Complete MVP functionality",
    teamId: "t1",
    startDate: "2026-07-01",
    dueDate: "2026-08-01",
    progress: 65,
  },

  {
    id: "m2",
    title: "Authentication System",
    description: "Implement JWT and RBAC",
    teamId: "t1",
    startDate: "2026-07-10",
    dueDate: "2026-07-25",
    progress: 40,
  },
];
