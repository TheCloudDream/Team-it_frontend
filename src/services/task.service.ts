import { mockTasks } from "@/mocks/tasks";

export async function getTasks() {
  return mockTasks;
}

export async function getTask(id: string) {
  return mockTasks.find((task) => task.id === id);
}
