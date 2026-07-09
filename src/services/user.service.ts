import { mockUsers } from "@/mocks/users";

export async function getUsers() {
  return mockUsers;
}

export async function getUser(id: string) {
  return mockUsers.find((user) => user.id === id);
}
