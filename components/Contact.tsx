"use client";

import { useState } from "react";
import { site, socials } from "@/data/site";

const ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
  github: (
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.6 5.4 2.9 5.4 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.3c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  brunch: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
};

export default function Contact() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(true);
      setMsg("이메일 주소를 다시 확인해 주세요.");
      return;
    }

    setError(false);
    setMsg("메일 앱을 여는 중입니다. 내용을 적어 보내주세요.");

    // 아직 백엔드가 없어 메일 앱으로 넘깁니다.
    // 폼 전송 API 를 붙이면 이 부분을 fetch("/api/contact", …) 로 바꾸세요.
    const subject = encodeURIComponent(`${site.name} 문의`);
    const body = encodeURIComponent(
      `보내는 분 이메일: ${value}\n\n어떤 용건인가요? (합류 / 제휴 / 제안 / 기타):\n\n하고 싶은 이야기:\n`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setEmail("");
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact reveal">
          <h2 className="contact__title">
            합류, 제휴, 제안 무엇이든
            <br />
            <span>한 줄만 남겨주세요</span>
          </h2>

          <form className="contact__form" onSubmit={onSubmit} noValidate>
            <label className="sr-only" htmlFor="email">
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="이메일 주소를 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn--primary" type="submit">
              보내기
            </button>
          </form>

          <p
            className={`contact__msg${error ? " is-error" : ""}`}
            role="status"
            aria-live="polite"
          >
            {msg}
          </p>

          <p className="contact__or">
            바로 연락하기 &nbsp;·&nbsp;
            <a href={`mailto:${site.email}`}>{site.email}</a> &nbsp;·&nbsp;
            <a href={site.phoneHref}>{site.phone}</a>
          </p>

          <p className="contact__label">Our social networks</p>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {ICONS[s.icon]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
