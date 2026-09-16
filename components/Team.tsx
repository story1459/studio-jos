import Image from "next/image";
import { t, team, type Lang } from "@/data/site";

export default function Team({ lang }: { lang: Lang }) {
  const d = t[lang];

  return (
    <section className="section" id="team">
      <div className="wrap">
        <h2 className="display reveal">{d.team.heading}</h2>
        <p className="section__lead reveal">{d.team.lead}</p>

        <ul className="team">
          {team.map((m) => {
            const c = m[lang];
            return (
              <li className="member reveal" key={c.name}>
                <div
                  className="member__ph"
                  style={
                    { "--c1": m.colors[0], "--c2": m.colors[1] } as React.CSSProperties
                  }
                >
                  {m.image && (
                    <Image
                      src={m.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 760px) 50vw, 280px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <h3>{c.name}</h3>
                <p>{c.role}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
