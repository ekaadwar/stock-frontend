import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
};

export function Card({ title, className = "", children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={
        "w-full max-w-md rounded-xl bg-zinc-800/95 px-10 py-8 text-zinc-50 shadow-xl " +
        className
      }
    >
      {title && (
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}
