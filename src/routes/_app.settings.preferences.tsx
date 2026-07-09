import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { Panel } from "@/components/team-it/Page";
import { useApp } from "@/lib/team-it/app-context";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings/preferences")({
  head: () => ({ meta: [{ title: "Preferences — Settings" }] }),
  component: PreferencesPage,
});

function PreferencesPage() {
  const { theme, toggleTheme } = useApp();
  return (
    <div className="space-y-6">
      <Panel title="Theme">
        <div className="grid gap-3 md:grid-cols-2">
          <button
            onClick={() => theme === "dark" && toggleTheme()}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
              theme === "light" ? "border-primary bg-primary-soft" : "border-border",
            )}
          >
            <Sun className="size-5" />
            <div>
              <div className="font-semibold text-sm">Light mode</div>
              <div className="text-xs text-muted-foreground">Clean, professional light UI.</div>
            </div>
          </button>
          <button
            onClick={() => theme === "light" && toggleTheme()}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
              theme === "dark" ? "border-primary bg-primary-soft" : "border-border",
            )}
          >
            <Moon className="size-5" />
            <div>
              <div className="font-semibold text-sm">Dark mode</div>
              <div className="text-xs text-muted-foreground">Easier on the eyes in low light.</div>
            </div>
          </button>
        </div>
      </Panel>

      <Panel title="Notifications">
        <div className="divide-y divide-border">
          {[
            { label: "Task assignments", desc: "When someone assigns you a task" },
            { label: "Deadline reminders", desc: "24 hours before a task is due" },
            { label: "Approvals & revisions", desc: "When your work is reviewed" },
            { label: "Blocker resolutions", desc: "When a blocker is resolved" },
            { label: "Weekly digest", desc: "Every Monday morning" },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <div className="text-sm font-medium">{pref.label}</div>
                <div className="text-xs text-muted-foreground">{pref.desc}</div>
              </div>
              <Switch defaultChecked={i !== 4} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
