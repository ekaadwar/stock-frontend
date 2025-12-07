import Image from "next/image";

type MenuBrandProps = {
  userName: string;
};

export function MenuBrand({ userName }: MenuBrandProps) {
  return (
    <div className="flex flex-col gap-2 px-4 pt-4 pb-3 bg-[#333333]">
      <div className="flex items-center">
        {/* Logo: simpan file di /public/stock-app-logo.png */}
        <Image
          src="/stock-app-logo.png"
          alt="Stock App"
          width={180}
          height={36}
          priority
        />
      </div>
      <p className="text-sm text-[#F0F0F0]">{userName}</p>
    </div>
  );
}
