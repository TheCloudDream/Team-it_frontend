import { mockNotifications } from "@/mocks/notifications";

export async function getNotifications() {
  return mockNotifications;
}

export async function getNotification(id: string) {
  return mockNotifications.find(
    (notification) => notification.id === id
  );
}
