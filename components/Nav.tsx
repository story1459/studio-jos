"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGS, t, type Lang } from "@/data/site";
import { Wordmark } from "./Logo";

/** "/ko/shorts" → "/shorts" 처럼 언어 부분을 떼어냅니다 */
function stripLang(path: string): string {
  if (path === "/ko") return "/";
  if (path.startsWith("/ko/")) return path.slice(3);
  return path || "/";
}

/** 지금 보고 있는 페이지의 다른 언어 주소 */
function toLangPath(path: string, lang: Lang): string {
  const base = stripLang(path);
  if (lang === "en") return base;
  return base === "/" ? "/ko" : `/ko${base}`;
}

/** 언어를 바꿔도 보던 위치를 유지하기 위해 잠시 저장해 둡니다 */
const SCROLL_KEY = "jos:lang-scroll";

export default function Nav({ lang }: { lang: Lang }) {
  const d = t[lang];
  const items = [
    { hash: "#works", label: d.nav.works },
    { hash: "#make", label: d.nav.make },
    { hash: "#join", label: d.nav.join },
    { hash: "#team", label: d.nav.team },
    { hash: "#contact", label: d.nav.contact },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const rootRef = useRef<HTMLElement>(null);
  const pathname = usePathname() || "/";

  /**
   * 메뉴는 홈의 각 구역을 가리킵니다.
   * 콘텐츠 페이지처럼 그 구역이 없는 곳에서는 홈 주소를 앞에 붙여야
   * 눌렀을 때 홈으로 이동하며 해당 구역으로 내려갑니다.
   */
  const homePath = lang === "ko" ? "/ko" : "/";
  const onHome = stripLang(pathname) === "/";
  const sectionHref = (hash: string) => (onHome ? hash : `${homePath}${hash}`);

  /* 언어를 바꿔 들어왔으면 보던 위치로 되돌립니다 */
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved) sessionStorage.removeItem(SCROLL_KEY);
    } catch {
      // 저장소를 못 쓰는 환경이면 그냥 넘어갑니다
    }
    if (!saved) return;

    const y = Number(saved);
    if (!Number.isFinite(y) || y <= 0) return;
    // 화면이 다 그려진 뒤에 옮겨야 제자리에 섭니다
    requestAnimationFrame(() => window.scrollTo(0, y));
  }, []);

  /* 스크롤 상태 + 현재 보고 있는 섹션 */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);

        // 화면 위에서 1/3 지점을 지난 마지막 구역이 현재 구역 (홈에서만)
        const line = window.scrollY + window.innerHeight / 3;
        let current = "";
        for (const item of items) {
          const el = document.querySelector<HTMLElement>(item.hash);
          if (el && el.offsetTop <= line) current = item.hash;
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
        <a
          className="logo"
          href={onHome ? "#top" : homePath}
          aria-label={`${d.name} — home`}
        >
          <Wordmark id="nav" className="logo__mark" title={d.name} />
        </a>

        <nav
          id="navLinks"
          aria-label={d.nav.works}
          className={`nav__links${open ? " is-open" : ""}`}
        >
          {items.map((item) => (
            <a
              key={item.hash}
              href={sectionHref(item.hash)}
              className={active === item.hash ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}

          {/* 좁은 화면에서는 로그인 버튼이 이 메뉴 안으로 들어옵니다 */}
          <Link
            className="nav__menu-login"
            href="/admin"
            onClick={() => setOpen(false)}
          >
            {d.nav.login}
          </Link>
        </nav>

        {/* 언어 전환 */}
        <div className="langs" role="group" aria-label={d.langSwitchLabel}>
          {LANGS.map((l) => (
            <Link
              key={l}
              href={toLangPath(pathname, l)}
              hrefLang={l}
              className={`langs__btn${l === lang ? " is-on" : ""}`}
              aria-current={l === lang ? "true" : undefined}
              onClick={() => {
                try {
                  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
                } catch {
                  // 저장소를 못 쓰면 위치 유지만 생략됩니다
                }
              }}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>

        <Link className="btn btn--primary nav__cta" href="/admin">
          {d.nav.login}
        </Link>

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
