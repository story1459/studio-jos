import { hero, site } from "@/data/site";

/** "제품으로" 처럼 한 줄 안의 특정 단어만 그라디언트로 */
function Line({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em>{accent}</em>
      {text.slice(i + accent.length)}
    </>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow reveal">{site.tagline}</p>

          <h1 className="hero__title reveal">
            {hero.titleLines.map((line) => (
              <span key={line} style={{ display: "block" }}>
                <Line text={line} accent={hero.accentWord} />
              </span>
            ))}
          </h1>

          <p className="hero__desc reveal">{hero.description}</p>

          <div className="hero__actions reveal">
            <a className="btn btn--primary btn--lg" href="#works">
              서비스 보기
            </a>
            <a className="btn btn--ghost btn--lg" href="#join">
              합류하기
            </a>
          </div>

          <ul className="stats reveal">
            {hero.stats.map((s) => (
              <li key={s.label}>
                <strong>
                  {s.value}
                  <span>{s.unit}</span>
                </strong>
                <small>{s.label}</small>
              </li>
            ))}
          </ul>
        </div>

        {/* 실제 이미지가 생기면 이 블록을 <Image ... /> 로 바꾸면 됩니다 */}
        <div className="hero__art" aria-hidden="true">
          <div className="orb" />

          <div className="pane pane--1">
            <div className="pane__bar">
              <i />
              <i />
              <i />
            </div>
            <div className="code">
              <i style={{ width: "70%" }} />
              <i className="accent" style={{ width: "45%" }} />
              <i style={{ width: "85%" }} />
              <i style={{ width: "60%" }} />
              <i className="accent" style={{ width: "35%" }} />
              <i style={{ width: "75%" }} />
            </div>
          </div>

          <div className="pane pane--2">
            <div className="chart">
              {[34, 52, 41, 78, 63, 96].map((h, i) => (
                <i key={i} style={{ "--h": `${h}%` } as React.CSSProperties} />
              ))}
            </div>
            <span className="pane__label">Retention +38%</span>
          </div>

          <div className="pane pane--3">
            <span className="dot" />
            <span className="pane__label">Deploy passed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
