import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { Button } from "@/components/ui/button";
import { getNotifications } from "@/services/notification.service";
import type { Notification } from "@/types/notification";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Team-it" }] }),
  component: NotificationsPage,
});

const DefaultIcon = Bell;

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  return (
    <PageContainer className="max-w-[900px]">
      <PageHeader
        title="Notifications"
        description="All the things happening across your work."
        actions={<Button variant="outline" size="sm">Mark all as read</Button>}
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)]">
        {notifications.map((n) => {
          const Icon = DefaultIcon;
          return (
            <div
              key={n.id}
              className={cn(
                "flex items-start gap-4 border-b border-border p-4 last:border-0 transition-colors hover:bg-muted/30",
                !n.read && "bg-primary-soft/40",
              )}
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">{n.title}</div>
                  {!n.read && <span className="size-2 rounded-full bg-primary" />}
                </div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
