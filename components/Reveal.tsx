"use client";

import { useEffect } from "react";

/**
 * 화면에 들어온 .reveal 요소를 서서히 띄웁니다.
 * 화면을 그리지 않고 관찰만 하므로 페이지 어디에 두어도 됩니다.
 */
export default function Reveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    items.forEach((el) => {
      // 같은 줄에 나란한 것들은 살짝씩 늦게
      const siblings = Array.from(
        el.parentElement?.querySelectorAll<HTMLElement>(":scope > .reveal") ?? [],
      );
      const i = siblings.indexOf(el);
      if (siblings.length > 1 && i > -1) {
        el.style.transitionDelay = `${(i % 4) * 70}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
