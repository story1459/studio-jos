"use client";

import { useEffect, useState } from "react";
import { SymbolMark } from "./Logo";

/**
 * 조스가 불쑥 나타나 화면을 가로질러 헤엄치고 사라집니다.
 *
 * 배경에 깔린 장식이 아니라 콘텐츠 앞을 지나갑니다(네비보다는 아래).
 * 나타나는 시점·위치·크기·속도·방향이 매번 다릅니다.
 * 클릭은 가로채지 않고, 움직임 줄이기를 켠 사용자에게는 나오지 않습니다.
 */

type Shark = {
  id: number;
  /** 화면 세로 위치 (%) */
  top: number;
  /** 크기 (px) */
  w: number;
  /** 가로지르는 데 걸리는 시간 (초) */
  dur: number;
  /** 1 = 왼쪽에서 오른쪽, -1 = 오른쪽에서 왼쪽 */
  dir: 1 | -1;
  /** 가장 진할 때의 투명도 */
  o: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** 다음 등장까지의 간격 (초) */
const GAP = [4, 10] as const;
/** 첫 등장까지 (초) */
const FIRST = [1.5, 4] as const;

export default function SwimmingLogo() {
  const [sharks, setSharks] = useState<Shark[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seq = 0;
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

    const spawn = () => {
      if (!alive) return;

      // 다른 탭을 보고 있는 동안에는 쌓아두지 않습니다
      if (!document.hidden) {
        const vw = window.innerWidth;
        const shark: Shark = {
          id: seq++,
          top: rand(10, 78),
          // 작고 귀여운 크기로
          w: Math.round(Math.min(Math.max(vw * rand(0.07, 0.12), 56), 140)),
          dur: rand(4.5, 7.5),
          dir: Math.random() < 0.5 ? 1 : -1,
          o: rand(0.6, 0.9),
        };

        setSharks((prev) => [...prev, shark]);
        // 다 지나가면 지웁니다
        later(
          () => setSharks((prev) => prev.filter((s) => s.id !== shark.id)),
          shark.dur * 1000 + 250,
        );
      }

      later(spawn, rand(...GAP) * 1000);
    };

    later(spawn, rand(...FIRST) * 1000);

    return () => {
      alive = false;
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };
  }, []);

  return (
    <div className="sharks" aria-hidden="true">
      {sharks.map((s) => (
        <div
          key={s.id}
          className={`shark${s.dir === -1 ? " shark--rev" : ""}`}
          style={
            {
              "--top": `${s.top}%`,
              "--w": `${s.w}px`,
              "--dur": `${s.dur}s`,
              "--o": s.o,
              "--dir": s.dir,
            } as React.CSSProperties
          }
        >
          <div className="shark__bob">
            <SymbolMark id={`shark-${s.id}`} className="shark__mark" />
          </div>
        </div>
      ))}
    </div>
  );
}
