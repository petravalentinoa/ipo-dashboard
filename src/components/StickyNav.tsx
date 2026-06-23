"use client";

import { useEffect, useState } from "react";

const TABS = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "pemegang-saham", label: "Pemegang Saham" },
  { id: "manajemen", label: "Manajemen" },
  { id: "bisnis", label: "Bisnis" },
  { id: "keuangan", label: "Keuangan" },
  { id: "dana-dividen", label: "Dana & Dividen" },
];

export default function StickyNav() {
  const [active, setActive] = useState(TABS[0].id);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const ids = TABS.map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(topmost.target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setStuck(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-[49px] z-30 -mx-4 border-b border-border bg-surface/95 px-4 backdrop-blur transition-shadow duration-200 sm:-mx-0 sm:px-0 ${
        stuck ? "shadow-sm" : ""
      }`}
      aria-label="Navigasi section"
    >
      <div className="flex gap-0 overflow-x-auto scrollbar-none" role="tablist">
        {TABS.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            role="tab"
            aria-selected={active === tab.id}
            onClick={(e) => {
              e.preventDefault();
              setActive(tab.id);
              document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`shrink-0 border-b-2 px-4 py-3 text-[13px] transition-colors ${
              active === tab.id
                ? "border-primary font-medium text-primary"
                : "border-transparent text-text-secondary hover:text-primary"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
