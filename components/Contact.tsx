"use client";

import { useState } from "react";
import { site, socials, t, type Lang } from "@/data/site";

const ICONS: Record<string, React.ReactNode> = {
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
    </>
  ),
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
};

export default function Contact({ lang }: { lang: Lang }) {
  const d = t[lang];
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(true);
      setMsg(d.contact.invalid);
      return;
    }

    setError(false);
    setMsg(d.contact.opening);

    // 아직 백엔드가 없어 메일 앱으로 넘깁니다.
    // 폼 전송 API 를 붙이면 이 부분을 fetch("/api/contact", …) 로 바꾸세요.
    const subject = encodeURIComponent(d.contact.mailSubject);
    const body = encodeURIComponent(d.contact.mailBody.replace("{email}", value));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setEmail("");
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact reveal">
          <h2 className="contact__title">
            {d.contact.titleTop}
            <br />
            <span>{d.contact.titleBottom}</span>
          </h2>

          <form className="contact__form" onSubmit={onSubmit} noValidate>
            <label className="sr-only" htmlFor="email">
              {d.contact.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={d.contact.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn--primary" type="submit">
              {d.contact.submit}
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
            {d.contact.direct} &nbsp;·&nbsp;
            <a href={`mailto:${site.email}`}>{site.email}</a> &nbsp;·&nbsp;
            <a href={site.phoneHref}>{site.phone}</a>
          </p>

          <p className="contact__label">{d.contact.socialLabel}</p>
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
