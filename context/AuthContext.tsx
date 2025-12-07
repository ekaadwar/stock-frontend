"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Admin = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContextType = {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  login: (token: string, admin: Admin) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("token");
    const savedAdmin = localStorage.getItem("admin");

    if (savedToken && savedAdmin) {
      try {
        setToken(savedToken);
        setAdmin(JSON.parse(savedAdmin));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      }
    }

    setLoading(false);
  }, []);

  const login = (tk: string, adm: Admin) => {
    setToken(tk);
    setAdmin(adm);

    if (typeof window !== "undefined") {
      localStorage.setItem("token", tk);
      localStorage.setItem("admin", JSON.stringify(adm));
    }

    router.push("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
