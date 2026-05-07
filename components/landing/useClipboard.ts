"use client";

import { useCallback } from "react";

export function useClipboard() {
  return useCallback(async (text: string) => {
    if (!text) return { ok: false as const };
    try {
      await navigator.clipboard.writeText(text);
      return { ok: true as const };
    } catch {
      return { ok: false as const };
    }
  }, []);
}

