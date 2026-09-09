import { cta } from "@/data/site";

export default function CtaBand() {
  return (
    <section className="section" id="join">
      <div className="wrap">
        <div className="cta reveal">
          <div className="cta__copy">
            <h2 className="cta__title">
              {cta.titleLines.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="cta__desc">{cta.description}</p>
            <a className="btn btn--dark btn--lg" href="#contact">
              {cta.button}
            </a>
          </div>

          <div className="cta__art" aria-hidden="true">
            <span className="ring ring--1" />
            <span className="ring ring--2" />
            <span className="ring ring--3" />
            <span className="cta__mark">JOS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
