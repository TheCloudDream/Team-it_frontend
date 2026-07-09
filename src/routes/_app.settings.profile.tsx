import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Panel } from "@/components/team-it/Page";
import { UserAvatar } from "@/components/team-it/Avatar";
import { users } from "@/lib/team-it/data";

export const Route = createFileRoute("/_app/settings/profile")({
  head: () => ({ meta: [{ title: "Profile — Settings" }] }),
  component: () => {
    const me = users[0];
    return (
      <Panel>
        <div className="mb-6 flex items-center gap-4">
          <UserAvatar user={me} size="lg" />
          <div>
            <Button variant="outline" size="sm">Upload photo</Button>
            <p className="mt-1 text-xs text-muted-foreground">JPG or PNG · Max 2MB</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input defaultValue={me.name} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" defaultValue={me.email} />
          </div>
          <div className="space-y-1.5">
            <Label>Team</Label>
            <Input defaultValue={me.team} disabled />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Input defaultValue={me.role} disabled />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </Panel>
    );
  },
});
