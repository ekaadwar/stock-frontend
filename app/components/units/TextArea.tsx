import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function TextArea({ label, className = "", ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-zinc-200">{label}</label>}
      <textarea
        {...props}
        className={
          "min-h-[120px] resize-none rounded-md border border-zinc-700 bg-white px-3 py-2 " +
          "text-sm text-black outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 " +
          className
        }
      />
    </div>
  );
}
