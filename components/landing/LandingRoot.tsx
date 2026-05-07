"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useToast } from "../ui/toast";
import { BookingModal } from "./BookingModal";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Sections } from "./Sections";
import { Footer } from "./Footer";
import { useActiveSection } from "./useActiveSection";

export function LandingRoot() {
  const { pushToast } = useToast();
  const sectionIds = useMemo(() => ["services", "pricing", "gallery", "reviews", "faq", "contact"], []);
  const activeId = useActiveSection(sectionIds);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openBooking = useCallback((plan?: string) => {
    if (plan) setSelectedService(plan);
    setModalOpen(true);
  }, []);

  const jumpToForm = useCallback(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    document.getElementById("contact")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => {
      const el = document.querySelector<HTMLSelectElement | HTMLInputElement>("#bookingForm select, #bookingForm input");
      el?.focus();
    }, 350);
  }, []);

  return (
    <>
      <a
        className="absolute left-[-999px] top-3 z-[9999] rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md focus:left-3"
        href="#main"
      >
        跳到主要内容
      </a>

      <Header
        activeSectionId={activeId}
        onMenu={() => pushToast("菜单：服务/套餐/环境/评价/问题/联系（向下滚动或用页脚链接）")}
        onOpenBooking={() => openBooking()}
      />

      <main id="main">
        <div id="top" className="sr-only" aria-hidden="true" />
        <Hero onOpenBooking={() => openBooking()} />
        <Sections onOpenBooking={openBooking} initialService={selectedService} />
      </main>

      <Footer />

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} onJumpToForm={jumpToForm} />
    </>
  );
}

