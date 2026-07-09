import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth.service";
import type { User } from "@/types/user";

type Theme = "light" | "dark";

interface AppContextValue {
  user: User | undefined;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// SSR-safe default — reading localStorage during render would produce a
// different value on server vs. client and cause its own hydration mismatch,
// so we always render "light" first and correct it in an effect.
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("team-it-theme") as Theme | null) ?? "light";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // routes/_app.tsx already resolved this query in beforeLoad before this
  // component ever mounts, so this reads straight from the TanStack Query
  // cache — no duplicate network request on every page.
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("team-it-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return <AppContext.Provider value={{ user, theme, toggleTheme }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
