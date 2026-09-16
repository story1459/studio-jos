import { areas, t, type Lang } from "@/data/site";

export default function Areas({ lang }: { lang: Lang }) {
  const d = t[lang];

  return (
    <section className="section" id="make">
      <div className="wrap">
        <h2 className="display reveal">{d.areas.heading}</h2>
        <p className="section__lead reveal">{d.areas.lead}</p>

        <div className="svc">
          {areas.map((a) => {
            const c = a[lang];
            return (
              <article className="svc__item reveal" key={a.no}>
                <span className="svc__num">{a.no}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <ul className="tags">
                  {c.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
