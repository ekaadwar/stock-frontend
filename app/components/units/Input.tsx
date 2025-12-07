import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function TextInput({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-zinc-200">{label}</label>}
      <input
        {...props}
        className={
          "h-10 rounded-md border border-zinc-700 bg-white px-3 text-sm text-black outline-none " +
          "focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 " +
          className
        }
      />
    </div>
  );
}
