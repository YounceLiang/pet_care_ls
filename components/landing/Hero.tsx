"use client";

import React from "react";

export function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="pt-10">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">
              <b className="text-text">不凑合的洗护</b>
              <span className="text-muted">从毛发到皮肤，一次到位</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              让洗护变成
              <br />
              宠物的「舒适时刻」
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted">
              透明操作、分区护理、按毛量计价更公平；支持基础洗护、深度SPA、修剪造型、皮肤护理与除虫除螨。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary" onClick={onOpenBooking}>
                立即预约
              </button>
              <a className="btn" href="#pricing">
                查看套餐
              </a>
              <a className="btn" href="#contact">
                到店路线
              </a>
            </div>

          </div>

          <aside className="card" aria-label="门店信息卡片">
            <div className="flex flex-wrap gap-2">
              <span className="chip">市中心 · 近地铁</span>
              <span className="chip">用品消毒可视</span>
              <span className="chip">当天可约提醒</span>
            </div>

            <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />

            <p className="text-sm font-semibold">到店前小贴士</p>
            <p className="mt-1 text-sm text-muted">
              建议提前 2 小时不喂正餐；如近期有皮肤红点/抓挠，请备注我们会优先安排皮肤护理流程。
            </p>

            <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />

            <p className="text-sm font-semibold">营业时间</p>
            <div className="mt-2 grid gap-2 text-sm text-muted" aria-label="营业时间列表">
              <div className="flex items-center justify-between gap-4">
                <b className="text-text">周一至周五</b>
                <span>10:00 – 20:30</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <b className="text-text">周六至周日</b>
                <span>09:30 – 21:00</span>
              </div>
            </div>

            <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />

            <button type="button" className="btn w-full" onClick={onOpenBooking}>
              选时间 · 填信息 · 完成预约
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
