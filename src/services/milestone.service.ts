import { mockMilestones } from "@/mocks/milestones";

export async function getMilestones() {
  return mockMilestones;
}

export async function getMilestone(id: string) {
  return mockMilestones.find(
    (milestone) => milestone.id === id
  );
}
