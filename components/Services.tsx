import { services } from "@/data/site";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <h2 className="display reveal">WHAT WE DO</h2>
        <p className="section__lead reveal">
          한 팀이 처음부터 끝까지 붙습니다. 외주를 다시 외주 주지 않습니다.
        </p>

        <div className="svc">
          {services.map((s) => (
            <article className="svc__item reveal" key={s.no}>
              <span className="svc__num">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul className="tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
