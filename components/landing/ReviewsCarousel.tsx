"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Review = {
  who: string;
  pet?: string;
  tag?: string;
  text: string;
};

const reviews: Review[] = [
  { who: "团子妈", pet: "比熊", tag: "洗护 + 吹整", text: "洗得很干净，吹干也很耐心，结束后毛毛超蓬松。" },
  { who: "豆包爸", pet: "柯基", tag: "基础洗护", text: "店里很干净，流程透明，沟通很细致，推荐！" },
  { who: "奶酪铲屎官", pet: "英短", tag: "温和护理", text: "皮肤护理做得很温和，第二天抓挠明显少了。" },
  { who: "阿福麻麻", pet: "博美", tag: "修剪造型", text: "造型超合我心意，还会提醒哪里容易打结，回家好打理。" },
  { who: "可乐爸", pet: "金毛", tag: "大狗洗护", text: "大狗也不敷衍，冲洗很到位，烘干后一点异味都没有。" },
  { who: "咪咕", pet: "布偶", tag: "猫咪洗护", text: "第一次给猫洗澡很紧张，店员全程安抚，出来状态很好。" },
  { who: "麻薯妈", pet: "泰迪", tag: "皮肤护理", text: "会先询问皮肤情况再选产品，做完触感明显柔顺很多。" },
  { who: "小七", pet: "柴犬", tag: "基础洗护", text: "预约很方便，到店几乎不等，整个流程清清楚楚。" },
  { who: "椰子姐姐", pet: "猫咪", tag: "梳毛去浮毛", text: "梳毛去浮毛效果惊艳，回家掉毛少了很多。" }
];

function clampIndex(i: number, length: number) {
  if (length <= 0) return 0;
  return ((i % length) + length) % length;
}

export function ReviewsCarousel() {
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const timerRef = useRef<number | null>(null);

  const pages = useMemo(() => {
    const size = Math.max(1, perPage);
    const result: Review[][] = [];
    for (let i = 0; i < reviews.length; i += size) result.push(reviews.slice(i, i + size));
    return result;
  }, [perPage]);

  function stopAuto() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function startAuto() {
    stopAuto();
    if (reduceMotion) return;
    timerRef.current = window.setInterval(() => setPageIndex((i) => clampIndex(i + 1, pages.length)), 5200);
  }

  useEffect(() => {
    function computePerPage() {
      const w = window.innerWidth;
      const next = w < 768 ? 1 : w < 1024 ? 2 : 3;
      setPerPage(next);
    }
    computePerPage();
    window.addEventListener("resize", computePerPage, { passive: true });
    return () => window.removeEventListener("resize", computePerPage);
  }, []);

  useEffect(() => {
    setPageIndex((i) => clampIndex(i, pages.length));
    startAuto();
    function onVisibility() {
      if (document.hidden) stopAuto();
      else startAuto();
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopAuto();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length]);

  return (
    <div
      className="panel overflow-hidden"
      onPointerDown={stopAuto}
      onPointerUp={startAuto}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      aria-label="顾客评价轮播"
    >
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {pages.map((page, i) => (
            <div key={i} className="min-w-full p-4">
              <div className={["grid gap-4", perPage === 1 ? "" : perPage === 2 ? "md:grid-cols-2" : "lg:grid-cols-3"].join(" ")}>
                {page.map((r) => (
                  <div key={`${r.who}-${r.text}`} className="card">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">
                        {r.who}
                        {r.pet ? <span className="text-muted"> · {r.pet}</span> : null}
                      </div>
                      {r.tag ? (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted">
                          {r.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm text-muted">“{r.text}”</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 pb-4">
        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={[
                "h-2.5 w-2.5 rounded-full border border-white/20 transition",
                i === pageIndex ? "bg-brand/70" : "bg-white/10 hover:bg-white/20"
              ].join(" ")}
              aria-current={i === pageIndex}
              aria-label={`切换到第 ${i + 1} 组评价`}
              onClick={() => {
                stopAuto();
                setPageIndex(i);
                startAuto();
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost h-9 px-3 text-sm"
            aria-label="上一组评价"
            onClick={() => {
              stopAuto();
              setPageIndex((i) => clampIndex(i - 1, pages.length));
              startAuto();
            }}
          >
            上一组
          </button>
          <button
            type="button"
            className="btn btn-ghost h-9 px-3 text-sm"
            aria-label="下一组评价"
            onClick={() => {
              stopAuto();
              setPageIndex((i) => clampIndex(i + 1, pages.length));
              startAuto();
            }}
          >
            下一组
          </button>
        </div>
      </div>
    </div>
  );
}

