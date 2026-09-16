import { SymbolMark } from "./Logo";

/**
 * 배경에서 BI 심볼이 화면을 가로질러 헤엄칩니다.
 * 나타났다 사라지기를 반복하며, 깊이가 다른 세 마리가 서로 다른 속도로 지나갑니다.
 *
 * - 콘텐츠 뒤(z-index 0)에 깔리고 클릭을 가로채지 않습니다.
 * - transform / opacity 만 움직여서 리페인트가 없습니다.
 * - 움직임을 줄이도록 설정한 사용자에게는 아예 나오지 않습니다(CSS).
 */

type Fish = {
  /** 화면 세로 위치 */
  top: string;
  /** 크기 */
  width: number;
  /** 한 번 가로지르는 데 걸리는 시간(초) */
  duration: number;
  /** 시작 시점을 어긋나게 해서 한꺼번에 나오지 않게 */
  delay: number;
  /** 가장 진할 때의 투명도 */
  opacity: number;
  /** 멀리 있는 것일수록 흐리게 */
  blur: number;
  /** 1 = 왼쪽에서 오른쪽, -1 = 오른쪽에서 왼쪽 */
  dir: 1 | -1;
};

const SCHOOL: Fish[] = [
  { top: "14%", width: 170, duration: 44, delay: -6, opacity: 0.17, blur: 1, dir: 1 },
  { top: "52%", width: 112, duration: 66, delay: -28, opacity: 0.12, blur: 2, dir: -1 },
  { top: "77%", width: 230, duration: 36, delay: -31, opacity: 0.09, blur: 3.5, dir: 1 },
];

export default function SwimmingLogo() {
  return (
    <div className="swim" aria-hidden="true">
      {SCHOOL.map((f, i) => (
        <div
          key={i}
          className={`swim__lane${f.dir === -1 ? " swim__lane--rev" : ""}`}
          style={
            {
              "--top": f.top,
              "--w": `${f.width}px`,
              "--dur": `${f.duration}s`,
              "--delay": `${f.delay}s`,
              "--o": f.opacity,
              "--blur": `${f.blur}px`,
              "--dir": f.dir,
            } as React.CSSProperties
          }
        >
          <div className="swim__bob">
            <SymbolMark id={`swim-${i}`} className="swim__mark" />
          </div>
        </div>
      ))}
    </div>
  );
}
