import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function Button({
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "rounded-md bg-black px-4 py-2 text-sm font-medium text-white " +
        "transition-colors hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 " +
        (fullWidth ? "w-full " : "") +
        className
      }
    >
      {children}
    </button>
  );
}
