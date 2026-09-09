"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const rootRef = useRef<HTMLElement>(null);

  /* 스크롤 상태 + 현재 보고 있는 섹션 */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);

        // 화면 위에서 1/3 지점을 지난 마지막 섹션이 현재 섹션
        const line = window.scrollY + window.innerHeight / 3;
        let current = "";
        for (const item of nav) {
          const el = document.querySelector<HTMLElement>(item.href);
          if (el && el.offsetTop <= line) current = item.href;
        }
        setActive(current);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 바깥 클릭 · ESC 로 메뉴 닫기 */
  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={rootRef} className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav__inner">
        <a className="logo" href="#top" aria-label={`${site.name} 홈`}>
          <span className="logo__l1">STUDIO</span>
          <span className="logo__l2">JOS</span>
        </a>

        <nav
          id="navLinks"
          aria-label="주요 메뉴"
          className={`nav__links${open ? " is-open" : ""}`}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary nav__cta" href="#contact">
          문의하기
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
