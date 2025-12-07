"use client";

import { MenuBrand } from "../blocks/MenuBrand";
import { SidebarItem } from "../units/SidebarItem";

type Props = {
  currentPath: string;
  userName: string;
  onLogout: () => void;
};

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    match: (path: string) => path === "/dashboard",
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    match: (path: string) => path.startsWith("/dashboard/categories"),
  },
  {
    label: "Products",
    href: "/dashboard/products",
    match: (path: string) => path.startsWith("/dashboard/products"),
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    match: (path: string) => path === "/dashboard/transactions",
  },
  {
    label: "Transaction History",
    href: "/dashboard/transactions/history",
    match: (path: string) => path.startsWith("/dashboard/transactions/history"),
  },
];

export function DashboardSidebarTemplate({
  currentPath,
  userName,
  onLogout,
}: Props) {
  return (
    <aside className="flex h-screen w-60 flex-col bg-[#333333] text-[#F0F0F0]">
      <MenuBrand userName={userName} />

      {/* Garis pembatas 1px */}
      <div className="mt-3 h-px w-full bg-[#666666]" />

      <nav className="mt-1 flex-1">
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li key={item.href}>
              <SidebarItem
                label={item.label}
                href={item.href}
                isActive={item.match(currentPath)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Tombol logout di bawah kiri (opsional, mengikuti desain power icon) */}
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-3 text-xs text-[#F0F0F0] hover:bg-[#666666]"
      >
        <span className="text-lg">⏻</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}
