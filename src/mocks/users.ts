import { UserRole, User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "u1",
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah@teamit.com",
    role: UserRole.ADMIN,
    active: true,
  },

  {
    id: "u2",
    firstName: "Marcus",
    lastName: "Kane",
    email: "marcus@teamit.com",
    role: UserRole.MANAGER,
    teamId: "t1",
    active: true,
  },

  {
    id: "u3",
    firstName: "Priya",
    lastName: "Anand",
    email: "priya@teamit.com",
    role: UserRole.MEMBER,
    teamId: "t1",
    active: true,
  },
];
