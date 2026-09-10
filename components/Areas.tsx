import { areas } from "@/data/site";

export default function Areas() {
  return (
    <section className="section" id="make">
      <div className="wrap">
        <h2 className="display reveal">WHAT WE MAKE</h2>
        <p className="section__lead reveal">
          영상 한 편부터 플랫폼 하나까지. 크기는 달라도 직접 만들고 끝까지
          서비스한다는 방식은 같습니다.
        </p>

        <div className="svc">
          {areas.map((a) => (
            <article className="svc__item reveal" key={a.no}>
              <span className="svc__num">{a.no}</span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              <ul className="tags">
                {a.tags.map((t) => (
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
