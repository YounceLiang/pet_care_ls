"use client";

import Image from "next/image";
import React from "react";
import { useClipboard } from "./useClipboard";
import { useToast } from "../ui/toast";
import { BookingForm } from "./BookingForm";
import { EnvCarousel } from "./EnvCarousel";

export function Sections({
  onOpenBooking,
  initialService
}: {
  onOpenBooking: (plan?: string) => void;
  initialService?: string;
}) {
  const { pushToast } = useToast();
  const writeClipboard = useClipboard();

  async function copy(text: string) {
    const res = await writeClipboard(text);
    pushToast(res.ok ? `已复制：${text}` : "复制失败：请手动选择复制");
  }

  return (
    <>
      <section id="services" className="mt-16 scroll-mt-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">服务项目</h2>
              <p className="mt-2 text-sm text-muted">
                按宠物体型与毛量评估，过程分区更卫生，用品按次消毒。
              </p>
            </div>
            <a className="btn" href="#pricing">
              套餐价格
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3" role="list" aria-label="服务卡片">
            <article className="card" role="listitem">
              <h3 className="text-base font-semibold">基础洗护</h3>
              <p className="mt-2 text-sm text-muted">梳毛开结、清洁洗护、耳道清理、指甲修剪、吹干定型。</p>
              <div className="mt-3 flex flex-wrap gap-2" aria-label="标签">
                <span className="chip">温和配方</span>
                <span className="chip">分区洗护</span>
                <span className="chip">手工吹干</span>
              </div>
            </article>

            <article className="card" role="listitem">
              <h3 className="text-base font-semibold">深度SPA</h3>
              <p className="mt-2 text-sm text-muted">
                泡泡浴/精油护理、毛孔清洁、顺毛护理与保湿，适合换毛期。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="chip">去味管理</span>
                <span className="chip">保湿修护</span>
                <span className="chip">放松舒缓</span>
              </div>
            </article>

            <article className="card" role="listitem">
              <h3 className="text-base font-semibold">洗护 + 造型修剪</h3>
              <p className="mt-2 text-sm text-muted">
                造型修剪、脚底毛、肛门腺清理等细节护理，造型更精神。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="chip">按照片沟通</span>
                <span className="chip">细节修剪</span>
                <span className="chip">干净利落</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="mt-16 scroll-mt-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">套餐价格</h2>
              <p className="mt-2 text-sm text-muted">价格为示例，可按体型、毛量与皮肤情况微调。</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => onOpenBooking()}>
              现在预约
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3" aria-label="套餐卡片">
            {[
              {
                name: "基础洗护",
                price: "¥ 129 起",
                desc: "日常清洁与基础护理，适合每月维护。",
                plan: "基础洗护"
              },
              {
                name: "深度SPA",
                price: "¥ 239 起",
                desc: "换毛期/皮肤干燥更推荐，护理更细致。",
                plan: "深度SPA"
              },
              {
                name: "洗护 + 造型修剪",
                price: "¥ 329 起",
                desc: "想要更精神的造型与细节修剪。",
                plan: "洗护 + 造型修剪"
              }
            ].map((p) => (
              <div key={p.name} className="card">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <span className="text-sm text-warn">{p.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
                <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => onOpenBooking(p.plan)}>
                  选择此套餐
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mt-16 scroll-mt-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">门店环境</h2>
              <p className="mt-2 text-sm text-muted">分区洗护与独立烘干，减少交叉影响。</p>
            </div>
          </div>

          <div className="mt-6">
            <EnvCarousel />
          </div>
        </div>
      </section>

      <section id="reviews" className="mt-16 scroll-mt-24">
        <div className="container">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">顾客评价</h2>
            <p className="mt-2 text-sm text-muted">以下为示例文案，可替换为真实平台截图/内容。</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { who: "团子妈", text: "洗得很干净，吹干也很耐心，结束后毛毛超蓬松。" },
              { who: "豆包爸", text: "店里很干净，流程透明，沟通很细致，推荐！" },
              { who: "奶酪铲屎官", text: "皮肤护理做得很温和，第二天抓挠明显少了。" }
            ].map((r) => (
              <div key={r.who} className="card">
                <p className="text-sm text-muted">“{r.text}”</p>
                <div className="mt-3 text-sm font-semibold">{r.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mt-16 scroll-mt-24">
        <div className="container">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">常见问题</h2>
            <p className="mt-2 text-sm text-muted">尽量把“担心的点”讲清楚，预约更省心。</p>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              {
                q: "多久洗一次比较合适？",
                a: "一般 2–4 周一次；换毛期/活动量大可适当加密。皮肤敏感建议先做温和护理并观察。"
              },
              {
                q: "怕吹风/怕陌生环境怎么办？",
                a: "可备注“怕吹风/敏感”，我们会分段吹干、降低风量，并用零食安抚（可自带）。"
              },
              {
                q: "皮肤护理是不是医疗？",
                a: "不等同于医疗。我们提供的是清洁与护理建议；如出现持续抓挠、破皮、渗出等情况，建议及时就诊并遵循兽医指导。"
              }
            ].map((f) => (
              <details key={f.q} className="panel p-4">
                <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mt-16 scroll-mt-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">联系与预约</h2>
              <p className="mt-2 text-sm text-muted">
                电话、微信与社媒二维码可按需替换；地址与地图已更新为门店位置。
              </p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => onOpenBooking()}>
              现在预约
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="card" aria-label="联系信息">
              <h3 className="text-base font-semibold">门店信息</h3>
              <p className="mt-2 text-sm text-muted">
                地址：上海市宜川路街道 陕西北路 1620 号
                <br />
                电话：{" "}
                <a className="text-text underline decoration-white/20 underline-offset-4" href="tel:400-000-0000">
                  400-000-0000
                </a>
                <br />
                微信：MuchaoGroom（可替换）
                <br />
                备注：靠近昌平路路口（可替换）
              </p>

              <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />
              <div className="text-sm text-muted">
                <b className="text-text">到店提示：</b>如携带幼宠/敏感宠，请提前说明；可自带常用零食做安抚奖励。
              </div>

              <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn" onClick={() => copy("400-000-0000")}>
                  复制电话
                </button>
                <button type="button" className="btn" onClick={() => copy("上海市宜川路街道 陕西北路 1620 号")}>
                  复制地址
                </button>
              </div>

              <div className="mt-4">
                <div className="panel overflow-hidden">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/assets/store-map-ai.png"
                      alt="门店位置示意图：上海市宜川路街道陕西北路1620号（靠近昌平路路口）"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 520px"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <strong className="block text-sm">地图位置</strong>
                      <div className="text-xs text-muted">上海市宜川路街道 陕西北路 1620 号（示意图）</div>
                    </div>
                    <span className="chip">已标注</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" aria-label="预约表单">
              <h3 className="text-base font-semibold">快速预约</h3>
              <p className="mt-2 text-sm text-muted">提交后会生成一段可复制的信息（前端演示）。</p>
              <div className="mt-4">
                <BookingForm initialService={initialService} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

