import { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Task Assigned",
    message: "You have been assigned a new task.",
    read: false,
    createdAt: new Date().toISOString(),
  },

  {
    id: "n2",
    title: "Task Approved",
    message: "Your task was approved by the manager.",
    read: true,
    createdAt: new Date().toISOString(),
  },
];
