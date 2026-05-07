import React from "react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 py-10">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[14px] border border-white/15 bg-gradient-to-br from-brand/90 to-brand-2/90">
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-white/95" aria-hidden="true">
                <path d="M12 13c2.7 0 4.6 1.7 5.4 3.4.6 1.2-.2 2.6-1.6 2.9-1.4.3-2.6.7-3.8.7-1.2 0-2.4-.4-3.8-.7-1.4-.3-2.2-1.7-1.6-2.9C7.4 14.7 9.3 13 12 13Z" />
              </svg>
            </span>
            <span className="grid leading-tight">
              <strong className="text-sm tracking-wide">沐爪宠物洗护</strong>
              <span className="text-xs text-muted">© {year} Muchao Grooming</span>
            </span>
          </div>

          <small className="text-sm text-muted">
            <a className="hover:text-text" href="#top">
              回到顶部
            </a>{" "}
            ·{" "}
            <a className="hover:text-text" href="#services">
              服务
            </a>{" "}
            ·{" "}
            <a className="hover:text-text" href="#pricing">
              套餐
            </a>{" "}
            ·{" "}
            <a className="hover:text-text" href="#contact">
              联系
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
}

