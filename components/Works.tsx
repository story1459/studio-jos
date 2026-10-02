"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { t, type Lang } from "@/data/site";
import { fallbackCards, fetchCards, type Card } from "@/lib/content";

export default function Works({ lang }: { lang: Lang }) {
  const d = t[lang];

  /** 처음에는 기본 카드로 그려두고, 관리자 내용이 오면 교체합니다 */
  const [cards, setCards] = useState<Card[]>(() => fallbackCards(lang));

  useEffect(() => {
    let alive = true;
    fetchCards(lang).then((rows) => {
      if (alive && rows.length) setCards(rows);
    });
    return () => {
      alive = false;
    };
  }, [lang]);

  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync, cards]);

  /** 카드 한 장 + 간격만큼 이동 */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".card");
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    const amount = (card?.getBoundingClientRect().width ?? 280) + gap;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  /**
   * 마우스로 끌어서 넘기기 (터치는 브라우저 기본 스크롤에 맡김)
   *
   * 누르자마자 포인터를 캡처하면 click 이 목록(UL)에서 발생해
   * 카드 안의 링크가 눌리지 않습니다. 그래서 실제로 끌기 시작한
   * 뒤에야 캡처합니다.
   */
  const DRAG_THRESHOLD = 6;
  const drag = useRef({
    pointerId: -1,
    active: false,
    capturing: false,
    startX: 0,
    startLeft: 0,
    moved: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      pointerId: e.pointerId,
      active: true,
      capturing: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;

    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));

    if (!drag.current.capturing) {
      // 아직은 그냥 클릭일 수 있으니 건드리지 않습니다
      if (drag.current.moved <= DRAG_THRESHOLD) return;
      drag.current.capturing = true;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    }

    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (el && drag.current.capturing) {
      try {
        el.releasePointerCapture(drag.current.pointerId);
      } catch {
        // 이미 풀렸으면 무시
      }
      el.classList.remove("is-dragging");
    }
    drag.current.active = false;
    drag.current.capturing = false;
  };

  // 끌고 난 직후의 클릭은 링크로 취급하지 않음
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="section section--works" id="works">
      <div className="wrap">
        <h2 className="display reveal">{d.works.heading}</h2>
        <p className="section__lead reveal">{d.works.lead}</p>
      </div>

      <div className="carousel">
        <div className="carousel__nav">
          <button
            type="button"
            className="cbtn"
            aria-label={d.works.next}
            onClick={() => step(1)}
            disabled={atEnd}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="cbtn"
            aria-label={d.works.prev}
            onClick={() => step(-1)}
            disabled={atStart}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        <ul
          className="track"
          ref={trackRef}
          tabIndex={0}
          aria-label={d.works.listLabel}
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
        >
          {cards.map((c) => {
            const inner = (
              <>
                <div
                  className="card__thumb"
                  style={
                    { "--c1": c.colors[0], "--c2": c.colors[1] } as React.CSSProperties
                  }
                >
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 760px) 78vw, 290px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  )}
                </div>
                <div className="card__body">
                  <span className="card__kind">{c.kind}</span>
                  <h3 className="card__title">{c.title}</h3>
                </div>
                <span className="card__pill">{c.meta}</span>
              </>
            );

            const external = c.href?.startsWith("http");

            return (
              <li className={`card${c.href ? " card--link" : ""}`} key={c.key}>
                {c.href ? (
                  external ? (
                    <a
                      className="card__hit"
                      href={c.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link className="card__hit" href={c.href}>
                      {inner}
                    </Link>
                  )
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
