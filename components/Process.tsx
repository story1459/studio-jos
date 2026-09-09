import { process } from "@/data/site";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <h2 className="display reveal">HOW WE BUILD</h2>
        <p className="section__lead reveal">
          문제를 고르는 일부터 운영까지 한 팀이 전부 맡습니다. 만든 사람이 끝까지
          책임집니다.
        </p>

        <div className="svc">
          {process.map((s) => (
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
