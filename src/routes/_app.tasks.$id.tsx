import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Paperclip, Play, Send, ShieldAlert } from "lucide-react";
import { PageContainer } from "@/components/team-it/Page";
import { PriorityBadge, StatusBadge } from "@/components/team-it/StatusBadge";
import { UserAvatar } from "@/components/team-it/Avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tasks, users, statusOrder, statusLabels, priorityLabels, type TaskStatus } from "@/lib/team-it/data";

export const Route = createFileRoute("/_app/tasks/$id")({
  loader: ({ params }) => {
    const task = tasks.find((t) => t.id === params.id);
    if (!task) throw notFound();
    return { task };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.task.code} · ${loaderData.task.title}` : "Task — Team-it" }],
  }),
  component: TaskDetail,
  notFoundComponent: () => (
    <PageContainer>
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <h1 className="text-lg font-semibold">Task not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">The task you were looking for doesn't exist.</p>
        <Link to="/tasks" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          Back to all tasks
        </Link>
      </div>
    </PageContainer>
  ),
});

function TaskDetail() {
  const { task } = Route.useLoaderData();
  const assignee = users.find((u) => u.id === task.assigneeId)!;
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [comment, setComment] = useState("");

  const timeline = [
    { id: 1, actor: assignee.name, action: `moved status to ${statusLabels[status]}`, time: "1h ago" },
    { id: 2, actor: "Marcus Kane", action: "commented", time: "3h ago", comment: "Please make sure the migration is reversible." },
    { id: 3, actor: assignee.name, action: `logged 2h`, time: "Yesterday" },
    { id: 4, actor: "Marcus Kane", action: "assigned this task", time: "3 days ago" },
  ];

  return (
    <PageContainer className="max-w-[1200px]">
      <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
        <Link to="/tasks" className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Tasks
        </Link>
        <span>/</span>
        <span className="font-mono text-xs">{task.code}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{task.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={status} />
              <PriorityBadge priority={task.priority} />
              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {task.milestone}
              </span>
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Description
            </h3>
            <p className="text-sm leading-relaxed">{task.description}</p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Activity & Comments
            </h3>
            <ol className="relative space-y-4 border-l border-border pl-4">
              {timeline.map((t) => (
                <li key={t.id} className="relative">
                  <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-primary ring-4 ring-card" />
                  <div className="text-sm">
                    <span className="font-semibold">{t.actor}</span>{" "}
                    <span className="text-muted-foreground">{t.action}</span>
                    <span className="ml-2 text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                  {t.comment && (
                    <div className="mt-2 rounded-lg bg-muted/50 p-3 text-sm">{t.comment}</div>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-xl border border-border p-3">
              <Textarea
                placeholder="Add a comment…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[70px] resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
              <div className="mt-2 flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <Paperclip className="mr-1 size-4" /> Attach
                </Button>
                <Button size="sm" disabled={!comment.trim()}>
                  <Send className="mr-1 size-4" /> Comment
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Attachments
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {["spec-v2.pdf", "wireframes.fig"].map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm">
                  <div className="grid size-8 place-items-center rounded bg-muted">
                    <Paperclip className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{f}</div>
                    <div className="text-xs text-muted-foreground">Uploaded 2d ago</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
            <div className="space-y-4 text-sm">
              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm focus:border-ring"
                >
                  {statusOrder.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Assignee">
                <div className="flex items-center gap-2">
                  <UserAvatar user={assignee} size="xs" />
                  <span>{assignee.name}</span>
                </div>
              </Field>
              <Field label="Team">{task.team}</Field>
              <Field label="Milestone">{task.milestone}</Field>
              <Field label="Priority">{priorityLabels[task.priority]}</Field>
              <Field label="Due date">{task.dueDate}</Field>
              <Field label="Estimated">{task.estimatedHours}h</Field>
              <Field label="Actual">{task.actualHours}h</Field>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Actions
            </h3>
            <div className="space-y-2">
              <Button size="sm" className="w-full justify-start">
                <Play className="mr-2 size-4" /> Start timer
              </Button>
              <BlockerModal />
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function BlockerModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start">
          <ShieldAlert className="mr-2 size-4" /> Flag as blocked
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report a blocker</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-warning-foreground dark:text-warning">
            Your team manager will be notified immediately.
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reason">Reason</Label>
            <select id="reason" className="h-9 w-full rounded-md border border-border bg-surface px-2 text-sm">
              <option>Waiting on external dependency</option>
              <option>Missing information</option>
              <option>Technical issue</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" rows={4} placeholder="Describe what's blocking you…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="priority">Priority</Label>
            <Input id="priority" placeholder="Urgent" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Report blocker</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
