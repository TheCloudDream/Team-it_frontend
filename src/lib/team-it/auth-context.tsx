import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as apiLogout, restoreSession, isAuthenticated as checkAuth } from "@/services/auth.service"; // Adjusted to match your auth.service.ts
import type { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Silent session restoration on app initialization or refresh
  useEffect(() => {
    async function initAuth() {
      try {
        const profile = await restoreSession();
        if (profile) {
          setUser(profile);
        }
      } catch (error) {
        console.error("Session auto-restoration failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    initAuth();
  }, []);

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        setIsLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
