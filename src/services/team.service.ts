import { mockTeams } from "@/mocks/teams";

export async function getTeams() {
  return mockTeams;
}

export async function getTeam(id: string) {
  return mockTeams.find((team) => team.id === id);
}
