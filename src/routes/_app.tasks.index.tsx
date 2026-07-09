import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Filter, Plus, Search } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { PriorityBadge, StatusBadge } from "@/components/team-it/StatusBadge";
import { UserAvatar } from "@/components/team-it/Avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getTasks } from "@/services/task.service";
import { getUsers } from "@/services/user.service";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_app/tasks/")({
  head: () => ({
    meta: [{ title: "Tasks — Team-it" }],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [q, setQ] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
    getUsers().then(setUsers);
  }, []);

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q.toLowerCase()) ||
          t.id.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, tasks],
  );

  return (
    <PageContainer>
      <PageHeader
        title="All tasks"
        description="Advanced list with search, filters, and bulk actions."
        actions={
          <Button size="sm">
            <Plus className="mr-1 size-4" /> New task
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title or code…"
            className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-ring"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-1 size-4" /> Team
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="mr-1 size-4" /> Status
        </Button>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="mr-1 size-4" /> Sort
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)]">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="w-8 py-3 pl-4">
                <Checkbox />
              </th>
              <th className="py-3 text-left font-medium">Task</th>
              <th className="py-3 text-left font-medium">Status</th>
              <th className="py-3 text-left font-medium">Priority</th>
              <th className="py-3 text-left font-medium">Assignee</th>
              <th className="py-3 text-left font-medium">Milestone</th>
              <th className="py-3 pr-4 text-right font-medium">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((t) => {
              const u = users.find((x) => x.id === t.assigneeId);
              return (
                <tr key={t.id} className="transition-colors hover:bg-muted/30">
                  <td className="py-3 pl-4">
                    <Checkbox />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                        TASK-{t.id}
                      </span>
                      <Link
                        to="/tasks/$id"
                        params={{ id: t.id }}
                        className="font-medium hover:text-primary"
                      >
                        {t.title}
                      </Link>
                    </div>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="py-3">
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td className="py-3">
                    {u ? (
                      <div className="flex items-center gap-2">
                        <UserAvatar user={u} size="xs" />
                        <span className="text-xs">
                          {u.firstName} {u.lastName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">—</td>
                  <td className="py-3 pr-4 text-right text-xs text-muted-foreground">{t.dueDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
