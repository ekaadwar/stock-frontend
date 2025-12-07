"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/login");
    }
  }, [admin, router]);

  if (loading) return null;

  if (!admin) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          padding: 16,
          borderRight: "1px solid #eee",
        }}
      >
        <h3>Stock App</h3>
        <p>
          {admin.firstName} {admin.lastName}
        </p>
        <nav style={{ marginTop: 24 }}>
          <ul
            style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}
          >
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/admins">Admins</Link>
            </li>
            <li>
              <Link href="/dashboard/categories">Categories</Link>
            </li>
            <li>
              <Link href="/dashboard/products">Products</Link>
            </li>
            <li>
              <Link href="/dashboard/transactions">Transactions</Link>
            </li>
            <li>
              <Link href="/dashboard/transactions/history">
                Transaction History
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={logout} style={{ marginTop: 24, width: "100%" }}>
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
