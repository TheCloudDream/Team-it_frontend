import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Team-it" },
      { name: "description", content: "Sign in to your Team-it workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sarah@team-it.co");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="grid min-h-screen w-full bg-background lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col justify-between p-8 md:p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            T
          </div>
          <span className="font-semibold tracking-tight">Team-it</span>
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your Team-it workspace to continue.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Remember me for 30 days
            </label>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/accept-invitation" className="font-semibold text-primary hover:underline">
              Accept an invitation
            </Link>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">© 2026 Team-it, Inc.</div>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.8 0.2 265 / 0.6), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.7 0.2 200 / 0.5), transparent 40%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-70">
            Team-it · Workspace
          </div>
          <blockquote className="max-w-md">
            <p className="text-2xl font-medium leading-tight">
              "Team-it replaced three tools for us. Our engineering managers finally have a single
              place to run standups, review work, and see who's actually blocked."
            </p>
            <footer className="mt-6 text-sm opacity-80">
              — Head of Engineering, Northwind Systems
            </footer>
          </blockquote>
          <div className="grid grid-cols-3 gap-4 text-sm opacity-80">
            <div>
              <div className="text-2xl font-semibold">128</div>
              <div className="text-xs uppercase tracking-wide">Tasks / week</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">42%</div>
              <div className="text-xs uppercase tracking-wide">Faster reviews</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">1,204</div>
              <div className="text-xs uppercase tracking-wide">Active users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
