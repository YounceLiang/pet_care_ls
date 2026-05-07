"use client";

import React, { useEffect } from "react";

export function BookingModal({
  open,
  onClose,
  onJumpToForm
}: {
  open: boolean;
  onClose: () => void;
  onJumpToForm: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/60 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookingTitle"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="panel w-full max-w-lg p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <strong id="bookingTitle" className="text-base">
            在线预约
          </strong>
          <button type="button" className="btn px-3 py-2 text-xs" onClick={onClose} aria-label="关闭">
            关闭
          </button>
        </div>

        <p className="mt-3 text-sm text-muted">
          这是一个轻量弹窗入口：点击后会把你带到页面底部的「快速预约」表单，并自动填充套餐（如果有）。
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onJumpToForm();
            }}
          >
            去填写预约表
          </button>
          <button type="button" className="btn" onClick={onClose}>
            稍后再说
          </button>
        </div>

        <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />

        <p className="text-sm text-muted">
          想接入真实预约？把表单提交改成请求后端 API 或对接表单工具即可。
        </p>
      </div>
    </div>
  );
}

