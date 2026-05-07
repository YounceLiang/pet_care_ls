"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type ToastItem = {
  id: string;
  message: string;
};

type ToastContextValue = {
  pushToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function createId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const timerRef = useRef<number | null>(null);

  const pushToast = useCallback((message: string) => {
    setToast({ id: createId(), message });
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast ? (
          <div className="panel flex items-center gap-3 px-4 py-3 shadow-card">
            <span className="text-sm text-text">{toast.message}</span>
            <button
              type="button"
              className="btn px-3 py-2 text-xs"
              onClick={() => {
                if (timerRef.current) window.clearTimeout(timerRef.current);
                setToast(null);
              }}
            >
              知道了
            </button>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider />");
  return ctx;
}

