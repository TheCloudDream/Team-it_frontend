import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Archive, Edit3, MoreHorizontal, Plus, Users2 } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { Button } from "@/components/ui/button";
import { getTeams } from "@/services/team.service";
import { getUsers } from "@/services/user.service";
import type { Team } from "@/types/team";
import type { User } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/team-it/Avatar";

export const Route = createFileRoute("/_app/teams")({
  head: () => ({ meta: [{ title: "Teams — Team-it" }] }),
  component: TeamsPage,
});

function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getTeams().then(setTeams);
    getUsers().then(setUsers);
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Teams"
        description="Organize employees into teams and assign managers."
        actions={
          <Button size="sm">
            <Plus className="mr-1 size-4" /> Create team
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((t) => {
          const teamUsers = users.filter((u) => u.teamId === t.id);
          return (
            <div
              key={t.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)] transition-shadow hover:shadow-[var(--shadow-pop)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary text-white">
                    <Users2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit3 className="mr-2 size-4" /> Edit team
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Archive className="mr-2 size-4" /> Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-center">
                <div>
                  <div className="text-lg font-semibold">{t.memberCount}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Members</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {users.filter((u) => u.role === "MANAGER" && u.teamId === t.id).length}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Managers
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-primary">
                    {teamUsers.length}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Assigned
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {teamUsers.slice(0, 5).map((u) => (
                    <UserAvatar key={u.id} user={u} size="xs" />
                  ))}
                </div>
                {teamUsers.length > 5 && (
                  <span className="text-xs text-muted-foreground">+{teamUsers.length - 5} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
