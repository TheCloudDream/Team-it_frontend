import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, Clock, RotateCcw, ShieldCheck, UserPlus } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { Button } from "@/components/ui/button";
import { notifications, type Notification } from "@/lib/team-it/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Team-it" }] }),
  component: NotificationsPage,
});

const iconFor: Record<Notification["type"], React.ComponentType<{ className?: string }>> = {
  assigned: UserPlus,
  deadline: Clock,
  approved: CheckCircle2,
  revision: RotateCcw,
  blocker_resolved: ShieldCheck,
};

const toneFor: Record<Notification["type"], string> = {
  assigned: "bg-info/10 text-info",
  deadline: "bg-warning/15 text-warning-foreground dark:text-warning",
  approved: "bg-success/10 text-success",
  revision: "bg-destructive/10 text-destructive",
  blocker_resolved: "bg-primary-soft text-primary",
};

function NotificationsPage() {
  return (
    <PageContainer className="max-w-[900px]">
      <PageHeader
        title="Notifications"
        description="All the things happening across your work."
        actions={<Button variant="outline" size="sm">Mark all as read</Button>}
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)]">
        {notifications.map((n) => {
          const Icon = iconFor[n.type] ?? Bell;
          return (
            <div
              key={n.id}
              className={cn(
                "flex items-start gap-4 border-b border-border p-4 last:border-0 transition-colors hover:bg-muted/30",
                n.unread && "bg-primary-soft/40",
              )}
            >
              <div className={cn("grid size-9 shrink-0 place-items-center rounded-full", toneFor[n.type])}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">{n.title}</div>
                  {n.unread && <span className="size-2 rounded-full bg-primary" />}
                </div>
                <div className="text-sm text-muted-foreground">{n.body}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">{n.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
