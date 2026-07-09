import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { UserAvatar } from "@/components/team-it/Avatar";
import { Button } from "@/components/ui/button";
import { users } from "@/lib/team-it/data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_app/users")({
  head: () => ({ meta: [{ title: "User directory — Team-it" }] }),
  component: UsersPage,
});

const statusClass = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  invited: "bg-warning/15 text-warning-foreground dark:text-warning",
};

function UsersPage() {
  const [q, setQ] = useState("");
  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <PageContainer>
      <PageHeader
        title="User directory"
        description="Manage employees, roles, and invitations."
        actions={
          <Button size="sm">
            <Plus className="mr-1 size-4" /> Invite user
          </Button>
        }
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or email…"
            className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-ring"
          />
        </div>
        <Button variant="outline" size="sm">Team</Button>
        <Button variant="outline" size="sm">Role</Button>
        <Button variant="outline" size="sm">Status</Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elegant)]">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="py-3 pl-5 text-left font-medium">Employee</th>
              <th className="py-3 text-left font-medium">Team</th>
              <th className="py-3 text-left font-medium">Role</th>
              <th className="py-3 text-left font-medium">Status</th>
              <th className="py-3 pr-5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-muted/30">
                <td className="py-3 pl-5">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={u} size="md" />
                    <div className="min-w-0">
                      <div className="font-medium">{u.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3">{u.team}</td>
                <td className="py-3 capitalize">{u.role}</td>
                <td className="py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      statusClass[u.status],
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {u.status}
                  </span>
                </td>
                <td className="py-3 pr-5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuItem>Reset password</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
