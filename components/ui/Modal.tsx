"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { SITE } from "@/lib/constants";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  description?: string;
}

export function Modal({ open, onClose, title, children, description }: ModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#0A2540]/40 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div
        className={`relative z-10 w-full max-w-lg rounded-[2rem] border border-[#0070F3]/10 bg-white p-8 shadow-[0_24px_60px_rgba(0,112,243,0.15)] ${SITE.transition}`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold text-[#0A2540]">
              {title}
            </h2>
            {description ? (
              <p id="modal-description" className="mt-2 text-sm text-[#0A2540]/70">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#0A2540]/60 hover:bg-[#F0FCFF] hover:text-[#0070F3]"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
