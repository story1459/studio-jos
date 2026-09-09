import Image from "next/image";
import { team } from "@/data/site";

export default function Team() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <h2 className="display reveal">OUR TEAM</h2>
        <p className="section__lead reveal">
          네 명이 여섯 개의 서비스를 만들고 운영합니다. 기획자와 개발자가 따로
          있지 않습니다.
        </p>

        <ul className="team">
          {team.map((m) => (
            <li className="member reveal" key={m.name}>
              <div
                className="member__ph"
                style={
                  { "--c1": m.colors[0], "--c2": m.colors[1] } as React.CSSProperties
                }
              >
                {m.image && (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 760px) 50vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
