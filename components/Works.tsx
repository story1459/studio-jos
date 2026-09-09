"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { works } from "@/data/site";

export default function Works() {
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
  }, [sync]);

  /** 카드 한 장 + 간격만큼 이동 */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".card");
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    const amount = (card?.getBoundingClientRect().width ?? 280) + gap;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  /* 마우스로 끌어서 넘기기 (터치는 브라우저 기본 스크롤에 맡김) */
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove("is-dragging");
  };

  // 끌고 난 직후의 클릭은 링크로 취급하지 않음
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="section section--works" id="works">
      <div className="wrap">
        <h2 className="display reveal">OUR WORKS</h2>
      </div>

      <div className="carousel">
        <div className="carousel__nav">
          <button
            type="button"
            className="cbtn"
            aria-label="다음 작업 보기"
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
            aria-label="이전 작업 보기"
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
          aria-label="작업 목록 (좌우로 스크롤)"
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
        >
          {works.map((w) => {
            const card = (
              <>
                <div
                  className="card__thumb"
                  style={
                    { "--c1": w.colors[0], "--c2": w.colors[1] } as React.CSSProperties
                  }
                >
                  {w.image && (
                    <Image
                      src={w.image}
                      alt={`${w.title} 화면`}
                      fill
                      sizes="(max-width: 760px) 78vw, 290px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="card__body">
                  <span className="card__kind">{w.kind}</span>
                  <h3 className="card__title">{w.title}</h3>
                </div>
                <span className="card__pill">{w.meta}</span>
              </>
            );

            return (
              <li className="card" key={w.title}>
                {w.href ? (
                  <a href={w.href} style={{ position: "absolute", inset: 0 }}>
                    {card}
                  </a>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
