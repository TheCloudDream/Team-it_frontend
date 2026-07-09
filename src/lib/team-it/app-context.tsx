import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "./data";

type Theme = "light" | "dark";

interface AppContextValue {
  role: Role;
  setRole: (r: Role) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("manager");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedRole = (localStorage.getItem("team-it:role") as Role | null) ?? "manager";
    const savedTheme = (localStorage.getItem("team-it:theme") as Theme | null) ?? "light";
    setRoleState(savedRole);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("team-it:theme", theme);
  }, [theme]);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem("team-it:role", r);
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <AppContext.Provider value={{ role, setRole, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
