import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  children: ReactNode;
};

export function Modal({ open, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {children}
    </div>
  );
}
