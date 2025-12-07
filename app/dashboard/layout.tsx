"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { DashboardSidebarTemplate } from "@/app/components/templates/DashboardSidebarTemplate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/login");
    }
  }, [admin, loading, router]);

  if (loading) return null;
  if (!admin) return null;

  const userName =
    `${admin.firstName ?? ""} ${admin.lastName ?? ""}`.trim() || admin.email;

  return (
    <div className="flex min-h-screen bg-black">
      <DashboardSidebarTemplate
        currentPath={pathname}
        userName={userName}
        onLogout={logout}
      />
      <main className="flex-1 p-6 text-white">{children}</main>
    </div>
  );
}
