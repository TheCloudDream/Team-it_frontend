import { createFileRoute } from "@tanstack/react-router";
import { Laptop, LogOut, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Panel } from "@/components/team-it/Page";

export const Route = createFileRoute("/_app/settings/security")({
  head: () => ({ meta: [{ title: "Security — Settings" }] }),
  component: () => (
    <div className="space-y-6">
      <Panel title="Change password">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5 md:col-span-2">
            <Label>Current password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-1.5">
            <Label>New password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-1.5">
            <Label>Confirm new password</Label>
            <Input type="password" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Update password</Button>
        </div>
      </Panel>

      <Panel title="Active sessions">
        <div className="divide-y divide-border">
          {[
            { icon: Laptop, name: "MacBook Pro · Chrome", loc: "San Francisco, CA · Now", current: true },
            { icon: Smartphone, name: "iPhone 15 · Safari", loc: "San Francisco, CA · 2h ago", current: false },
            { icon: Laptop, name: "Windows · Firefox", loc: "New York, NY · Yesterday", current: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <div className="grid size-9 place-items-center rounded-md bg-muted">
                <s.icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">
                  {s.name}
                  {s.current && (
                    <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{s.loc}</div>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="text-destructive">
                  <LogOut className="mr-1 size-4" /> Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  ),
});
