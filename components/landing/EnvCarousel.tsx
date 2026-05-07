"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

const images = [
  { src: "/assets/gallery-1.png", alt: "门店环境照片 1" },
  { src: "/assets/gallery-2.png", alt: "门店环境照片 2" },
  { src: "/assets/gallery-3.png", alt: "门店环境照片 3" }
];

export function EnvCarousel() {
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  );
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  function stopAuto() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function startAuto() {
    stopAuto();
    if (reduceMotion) return;
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 5200);
  }

  useEffect(() => {
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
  }, []);

  return (
    <div
      className="panel overflow-hidden"
      onPointerDown={stopAuto}
      onPointerUp={startAuto}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          priority={index === 0}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>

      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={[
                "h-2.5 w-2.5 rounded-full border border-white/20 transition",
                i === index ? "bg-brand/70" : "bg-white/10 hover:bg-white/20"
              ].join(" ")}
              aria-current={i === index}
              aria-label={`切换到第 ${i + 1} 张`}
              onClick={() => {
                stopAuto();
                setIndex(i);
                startAuto();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
