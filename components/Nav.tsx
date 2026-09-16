"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LANGS, paths, t, type Lang } from "@/data/site";
import { Wordmark } from "./Logo";

export default function Nav({ lang }: { lang: Lang }) {
  const d = t[lang];
  const items = [
    { href: "#works", label: d.nav.works },
    { href: "#make", label: d.nav.make },
    { href: "#join", label: d.nav.join },
    { href: "#team", label: d.nav.team },
    { href: "#contact", label: d.nav.contact },
  ];

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
        for (const item of items) {
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
    // items 는 매 렌더 새로 만들어지지만 내용은 lang 에만 의존합니다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

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
        <a className="logo" href="#top" aria-label={`${d.name} — home`}>
          <Wordmark id="nav" className="logo__mark" title={d.name} />
        </a>

        <nav
          id="navLinks"
          aria-label={d.nav.works}
          className={`nav__links${open ? " is-open" : ""}`}
        >
          {items.map((item) => (
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

        {/* 언어 전환 */}
        <div className="langs" role="group" aria-label={d.langSwitchLabel}>
          {LANGS.map((l) => (
            <Link
              key={l}
              href={paths[l]}
              hrefLang={l}
              className={`langs__btn${l === lang ? " is-on" : ""}`}
              aria-current={l === lang ? "true" : undefined}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        <a className="btn btn--primary nav__cta" href="#contact">
          {d.nav.contact}
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? d.menuClose : d.menuOpen}
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
