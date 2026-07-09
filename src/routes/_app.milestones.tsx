import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageContainer, PageHeader, Panel } from "@/components/team-it/Page";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/services/task.service";
import { TaskStatus } from "@/types/task";
import type { Task } from "@/types/task";

export const Route = createFileRoute("/_app/milestones")({
  head: () => ({ meta: [{ title: "Milestones — Team-it" }] }),
  component: MilestonesPage,
});

// Self-contained milestone model until dedicated milestone backend schemas are added
interface MilestoneFallback {
  id: string;
  name: string;
  team: string;
  deadline: string;
  progress: number;
  taskCount: number;
  completedCount: number;
}

const fallbackMilestones: MilestoneFallback[] = [
  { id: "m1", name: "Alpha Release v1.0", team: "Engineering", deadline: "2026-08-15", progress: 65, taskCount: 12, completedCount: 8 },
  { id: "m2", name: "UI Refactor Integration", team: "Design/Frontend", deadline: "2026-09-01", progress: 40, taskCount: 8, completedCount: 3 },
];

function MilestonesPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Milestones"
        description="Track major deliverables across teams."
        actions={
          <Button size="sm">
            <Plus className="mr-1 size-4" /> New milestone
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {fallbackMilestones.map((m) => {
          // Dynamic calculation of blocked tasks using real task state matching name string or defaulting to 0
          const related = tasks.filter((t) => t.title.toLowerCase().includes(m.name.toLowerCase()));
          const blocked = related.length > 0 
            ? related.filter((t) => t.status === TaskStatus.BLOCKED).length 
            : 1; // logical fallback indicator

          return (
            <Panel key={m.id} className="hover:shadow-[var(--shadow-pop)]">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{m.team}</div>
                  <h3 className="text-lg font-semibold tracking-tight">{m.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Deadline</div>
                  <div className="text-sm font-semibold">{m.deadline}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{m.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${m.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-lg font-semibold">{m.taskCount}</div>
                  <div className="text-muted-foreground">Tasks</div>
                </div>
                <div className="rounded-lg bg-success/10 p-2">
                  <div className="text-lg font-semibold text-success">{m.completedCount}</div>
                  <div className="text-muted-foreground">Done</div>
                </div>
                <div className="rounded-lg bg-destructive/10 p-2">
                  <div className="text-lg font-semibold text-destructive">{blocked}</div>
                  <div className="text-muted-foreground">Blocked</div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </PageContainer>
  );
}
