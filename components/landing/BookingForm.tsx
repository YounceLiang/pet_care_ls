"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useClipboard } from "./useClipboard";
import { useToast } from "../ui/toast";

type FormState = {
  petType: string;
  size: string;
  service: string;
  time: string;
  contact: string;
  petName: string;
  note: string;
};

const defaultState: FormState = {
  petType: "",
  size: "",
  service: "",
  time: "",
  contact: "",
  petName: "",
  note: ""
};

export function BookingForm({ initialService }: { initialService?: string }) {
  const { pushToast } = useToast();
  const writeClipboard = useClipboard();
  const [state, setState] = useState<FormState>(defaultState);
  const firstFieldRef = useRef<HTMLSelectElement | null>(null);

  const requiredMissing = useMemo(() => {
    const required: Array<keyof FormState> = ["petType", "size", "service", "time", "contact"];
    return required.filter((k) => !String(state[k] || "").trim());
  }, [state]);

  useEffect(() => {
    if (initialService && !state.service) setState((s) => ({ ...s, service: initialService }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialService]);

  return (
    <form
      id="bookingForm"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (requiredMissing.length) {
          pushToast("请先把必填项补全");
          firstFieldRef.current?.focus();
          return;
        }

        const text =
          "【宠物洗护预约】\n" +
          `- 宠物类型：${state.petType}\n` +
          `- 体型：${state.size}\n` +
          `- 项目：${state.service}\n` +
          `- 到店时间：${state.time}\n` +
          `- 联系方式：${state.contact}\n` +
          `- 宠物昵称：${state.petName || "（未填）"}\n` +
          `- 备注：${state.note || "（未填）"}\n`;

        const res = await writeClipboard(text);
        pushToast(res.ok ? "已生成并复制预约信息，可直接粘贴到微信/短信" : "已生成预约信息（复制失败，可手动复制）");
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-muted">
          宠物类型
          <select
            ref={firstFieldRef}
            className="input"
            required
            value={state.petType}
            onChange={(e) => setState((s) => ({ ...s, petType: e.target.value }))}
          >
            <option value="">请选择</option>
            <option value="狗狗">狗狗</option>
            <option value="猫咪">猫咪</option>
            <option value="其他">其他</option>
          </select>
        </label>

        <label className="text-sm text-muted">
          体型（参考）
          <select
            className="input"
            required
            value={state.size}
            onChange={(e) => setState((s) => ({ ...s, size: e.target.value }))}
          >
            <option value="">请选择</option>
            <option value="小型（< 8kg）">小型（{"<"} 8kg）</option>
            <option value="中型（8–18kg）">中型（8–18kg）</option>
            <option value="大型（> 18kg）">大型（{">"} 18kg）</option>
          </select>
        </label>

        <label className="text-sm text-muted">
          想做的项目
          <select
            className="input"
            required
            value={state.service}
            onChange={(e) => setState((s) => ({ ...s, service: e.target.value }))}
          >
            <option value="">请选择</option>
            <option value="基础洗护">基础洗护</option>
            <option value="深度SPA">深度SPA</option>
            <option value="洗护 + 造型修剪">洗护 + 造型修剪</option>
            <option value="皮肤护理">皮肤护理</option>
            <option value="除虫除螨">除虫除螨</option>
          </select>
        </label>

        <label className="text-sm text-muted">
          期望到店时间
          <input
            className="input"
            name="time"
            type="datetime-local"
            required
            value={state.time}
            onChange={(e) => setState((s) => ({ ...s, time: e.target.value }))}
          />
        </label>

        <label className="text-sm text-muted">
          联系方式（手机/微信）
          <input
            className="input"
            type="text"
            placeholder="例如：138****0000 或微信号"
            required
            value={state.contact}
            onChange={(e) => setState((s) => ({ ...s, contact: e.target.value }))}
          />
        </label>

        <label className="text-sm text-muted">
          宠物昵称（可选）
          <input
            className="input"
            type="text"
            placeholder="例如：团子"
            value={state.petName}
            onChange={(e) => setState((s) => ({ ...s, petName: e.target.value }))}
          />
        </label>
      </div>

      <label className="mt-3 block text-sm text-muted">
        备注（可选）
        <textarea
          className="input min-h-[92px] resize-none"
          placeholder="例如：怕吹风、有皮肤红点、想按照片同款等"
          value={state.note}
          onChange={(e) => setState((s) => ({ ...s, note: e.target.value }))}
        />
      </label>

      <div className="mt-4 flex flex-col gap-2">
        <button type="submit" className="btn btn-primary w-full">
          提交预约（示例）
        </button>
        <div className="text-xs text-muted">
          这是前端演示：提交后会生成一段可复制的信息。你也可以把表单改成对接后端/表单工具。
        </div>
      </div>
    </form>
  );
}

