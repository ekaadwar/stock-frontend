import Link from "next/link";

type SidebarItemProps = {
  label: string;
  href: string;
  isActive: boolean;
};

export function SidebarItem({ label, href, isActive }: SidebarItemProps) {
  const base = "block px-4 py-2 text-sm transition-colors";

  const stateClasses = isActive
    ? "bg-[#CCCCCC] text-[#0A0A0A]"
    : "bg-[#333333] text-[#F0F0F0] hover:bg-[#666666]";

  return (
    <Link href={href} className={`${base} ${stateClasses}`}>
      {label}
    </Link>
  );
}
