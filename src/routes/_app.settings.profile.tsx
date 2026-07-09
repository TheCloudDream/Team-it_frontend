import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, User as UserIcon } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/team-it/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUsers } from "@/services/user.service";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_app/settings/profile")({
  head: () => ({ meta: [{ title: "Profile Settings — Team-it" }] }),
  component: ProfileSettingsPage,
});

function ProfileSettingsPage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we pull the first user from our mock service as the "logged-in" session
    getUsers()
      .then((users) => {
        if (users.length > 0) {
          setProfile(users[0]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for backend save operation
    alert("Profile configurations saved locally!");
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="text-sm text-muted-foreground">Loading profile profile...</div>
      </PageContainer>
    );
  }

  if (!profile) {
    return (
      <PageContainer>
        <div className="text-sm text-destructive">User profile session not found.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-[600px]">
      <PageHeader
        title="Profile Settings"
        description="Manage your public-facing information and account properties."
      />

      <form onSubmit={handleSave} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)]">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <UserIcon className="size-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{profile.firstName} {profile.lastName}</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{profile.role}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="teamId">Assigned Team ID</Label>
          <Input
            id="teamId"
            value={profile.teamId || "Unassigned"}
            disabled
            className="bg-muted cursor-not-allowed"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm">
            <Save className="mr-1.5 size-4" /> Save Changes
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
