"use client";

import { useEffect, useRef, useState } from "react";
import { SymbolMark } from "./Logo";

/**
 * 조스가 화면 아무 데서나 통통 튀며 나타나 곡선을 그리며 헤엄치고,
 * 또 아무 데서나 통통 튀며 사라집니다. 지나가는 자리에는 물파장이 남습니다.
 *
 * - 갈퀴(지느러미)가 늘 진행 방향을 향합니다.
 * - 콘텐츠 앞(z-index 50), 네비 아래를 지나가고 클릭은 가로채지 않습니다.
 * - 움직임 줄이기를 켠 사용자에게는 나오지 않습니다.
 */

/** 원본 아트워크가 향한 방향. 픽셀로 확인한 값: 1 = 오른쪽 */
const ART_FACES = 1;

/** 다음 등장까지의 간격 (초) */
const GAP = [3.5, 9] as const;
/** 첫 등장까지 (초) */
const FIRST = [1.2, 3] as const;
/** 물파장을 남기는 간격 (ms) */
const RIPPLE_EVERY = 300;
/** 물파장이 사라지기까지 (ms) */
const RIPPLE_LIFE = 1500;

type Shark = {
  id: number;
  w: number;
  dur: number;
  /** 1 = 오른쪽을 보고 감, -1 = 왼쪽 */
  dir: 1 | -1;
  o: number;
  /** 시작 · 중간(곡선) · 끝 지점. 이미 가운데 정렬 보정이 들어간 px 값 */
  x1: number; y1: number;
  xm: number; ym: number;
  x2: number; y2: number;
};

type Ripple = { id: number; x: number; y: number; size: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function SwimmingLogo() {
  const [sharks, setSharks] = useState<Shark[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nodes = useRef(new Map<number, HTMLDivElement | null>());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seq = 0;
    let rippleSeq = 0;
    let alive = true;
    const timers = new Set<number>();

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };

    /* ── 조스 한 마리 만들기 ── */
    const spawn = () => {
      if (!alive) return;

      if (!document.hidden) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const w = Math.round(clamp(vw * rand(0.07, 0.12), 56, 140));
        const h = (w * 80) / 150; // 아트워크 비율
        const padX = w * 0.7;
        const padY = h * 0.7;

        const px = () => rand(padX, vw - padX);
        const py = () => rand(vh * 0.1 + padY, vh * 0.88 - padY);

        const x1 = px();
        const y1 = py();

        // 너무 가까이서 사라지지 않게 충분히 떨어진 끝점을 고릅니다
        let x2 = px();
        let y2 = py();
        const far = Math.min(vw, vh) * 0.3;
        for (let i = 0; i < 12 && Math.hypot(x2 - x1, y2 - y1) < far; i++) {
          x2 = px();
          y2 = py();
        }

        // 가운데를 진행 방향의 수직으로 밀어 곡선 동선을 만듭니다
        const len = Math.hypot(x2 - x1, y2 - y1) || 1;
        const nx = -(y2 - y1) / len;
        const ny = (x2 - x1) / len;
        const arc = rand(-1, 1) * len * rand(0.1, 0.26);

        const shark: Shark = {
          id: seq++,
          w,
          dur: rand(3.8, 6.4),
          // 갈퀴가 진행 방향을 향하도록
          dir: ((x2 >= x1 ? 1 : -1) * ART_FACES) as 1 | -1,
          o: rand(0.65, 0.9),
          x1: x1 - w / 2,
          y1: y1 - h / 2,
          xm: (x1 + x2) / 2 + nx * arc - w / 2,
          ym: (y1 + y2) / 2 + ny * arc - h / 2,
          x2: x2 - w / 2,
          y2: y2 - h / 2,
        };

        setSharks((prev) => [...prev, shark]);
        later(() => {
          nodes.current.delete(shark.id);
          setSharks((prev) => prev.filter((s) => s.id !== shark.id));
        }, shark.dur * 1000 + 200);
      }

      later(spawn, rand(...GAP) * 1000);
    };

    /* ── 지나간 자리에 물파장 남기기 ── */
    const rippleTimer = window.setInterval(() => {
      if (document.hidden) return;

      const born: Ripple[] = [];
      nodes.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        born.push({
          id: rippleSeq++,
          // 지느러미 아래, 물에 닿는 지점쯤
          x: r.left + r.width / 2 + rand(-r.width * 0.12, r.width * 0.12),
          y: r.top + r.height * rand(0.62, 0.88),
          size: r.width * rand(0.55, 0.95),
        });
      });

      if (!born.length) return;
      setRipples((prev) => [...prev, ...born].slice(-40));
      const ids = new Set(born.map((b) => b.id));
      later(() => setRipples((prev) => prev.filter((r) => !ids.has(r.id))), RIPPLE_LIFE);
    }, RIPPLE_EVERY);

    later(spawn, rand(...FIRST) * 1000);

    return () => {
      alive = false;
      window.clearInterval(rippleTimer);
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };
  }, []);

  return (
    <div className="sharks" aria-hidden="true">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={
            {
              "--x": `${r.x}px`,
              "--y": `${r.y}px`,
              "--s": `${r.size}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {sharks.map((s) => (
        <div
          key={s.id}
          ref={(el) => {
            nodes.current.set(s.id, el);
          }}
          className="shark"
          style={
            {
              "--w": `${s.w}px`,
              "--dur": `${s.dur}s`,
              "--o": s.o,
              "--dir": s.dir,
              "--x1": `${s.x1}px`,
              "--y1": `${s.y1}px`,
              "--xm": `${s.xm}px`,
              "--ym": `${s.ym}px`,
              "--x2": `${s.x2}px`,
              "--y2": `${s.y2}px`,
            } as React.CSSProperties
          }
        >
          <div className="shark__pop">
            <div className="shark__bob">
              <SymbolMark id={`shark-${s.id}`} className="shark__mark" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
