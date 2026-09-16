import { t, type Lang } from "@/data/site";
import { SymbolMark } from "./Logo";

export default function CtaBand({ lang }: { lang: Lang }) {
  const d = t[lang];

  return (
    <section className="section" id="join">
      <div className="wrap">
        <div className="cta reveal">
          <div className="cta__copy">
            <h2 className="cta__title">
              {d.cta.titleLines.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="cta__desc">{d.cta.description}</p>
            <a className="btn btn--dark btn--lg" href="#contact">
              {d.cta.button}
            </a>
          </div>

          <div className="cta__art">
            <span className="ring ring--1" aria-hidden="true" />
            <span className="ring ring--2" aria-hidden="true" />
            <span className="ring ring--3" aria-hidden="true" />
            <SymbolMark id="cta" className="cta__symbol" title={d.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
