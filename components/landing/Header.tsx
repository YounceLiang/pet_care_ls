"use client";

import React from "react";

const links: Array<{ id: string; label: string }> = [
  { id: "services", label: "服务" },
  { id: "pricing", label: "套餐" },
  { id: "gallery", label: "环境" },
  { id: "reviews", label: "评价" },
  { id: "faq", label: "常见问题" },
  { id: "contact", label: "联系" }
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export function Header({
  activeSectionId,
  onMenu,
  onOpenBooking
}: {
  activeSectionId: string;
  onMenu: () => void;
  onOpenBooking: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/55 backdrop-blur-md">
      <div className="container">
        <nav className="flex h-[74px] items-center justify-between gap-3" aria-label="主导航">
          <a
            className="flex min-w-[190px] items-center gap-2"
            href="#top"
            aria-label="回到顶部"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-[14px] border border-white/15 bg-gradient-to-br from-brand/90 to-brand-2/90 shadow-[0_14px_40px_rgba(124,92,255,0.22)]">
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-white/95" aria-hidden="true">
                <path d="M12 13c2.7 0 4.6 1.7 5.4 3.4.6 1.2-.2 2.6-1.6 2.9-1.4.3-2.6.7-3.8.7-1.2 0-2.4-.4-3.8-.7-1.4-.3-2.2-1.7-1.6-2.9C7.4 14.7 9.3 13 12 13Zm-5.2-1.6c-1.1 0-2-.9-2-2.3 0-1.5.9-2.8 2.1-2.8 1.1 0 2 .9 2 2.3 0 1.5-.9 2.8-2.1 2.8Zm10.4 0c-1.2 0-2.1-1.3-2.1-2.8 0-1.4.9-2.3 2-2.3 1.2 0 2.1 1.3 2.1 2.8 0 1.4-.9 2.3-2 2.3ZM9.1 6.5c-1 0-1.8-1-1.8-2.2C7.3 3 8.1 2 9.1 2c1 0 1.8 1 1.8 2.2 0 1.3-.8 2.3-1.8 2.3Zm5.8 0c-1 0-1.8-1-1.8-2.3C13.1 3 13.9 2 14.9 2c1 0 1.8 1 1.8 2.3 0 1.2-.8 2.2-1.8 2.2Z" />
              </svg>
            </span>
            <span className="grid leading-tight">
              <strong className="text-sm tracking-wide">沐爪宠物洗护</strong>
              <span className="text-xs text-muted">温和洗护 · 安心可见</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-2 md:flex">
            {links.map((l) => {
              const isActive = l.id === activeSectionId;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={[
                    "rounded-full px-3 py-2 text-xs tracking-wide transition",
                    isActive ? "border border-brand/30 bg-brand/20 text-text" : "text-muted hover:bg-white/10 hover:text-text"
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.id);
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="flex min-w-[230px] items-center justify-end gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted lg:inline-flex">
              今日可约
            </span>
            <button type="button" className="btn px-3 py-2" onClick={onMenu} aria-expanded="false">
              菜单
            </button>
            <button type="button" className="btn btn-primary" onClick={onOpenBooking}>
              在线预约
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

