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
  login: (token: string, admin: Admin) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedAdmin = localStorage.getItem("admin");
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = (tk: string, adm: Admin) => {
    setToken(tk);
    setAdmin(adm);
    localStorage.setItem("token", tk);
    localStorage.setItem("admin", JSON.stringify(adm));
    router.push("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
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
