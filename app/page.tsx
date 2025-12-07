"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { token, admin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (token && admin) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [token, admin, loading, router]);

  return null;
}
