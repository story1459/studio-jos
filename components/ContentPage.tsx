"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { t, type Lang } from "@/data/site";
import {
  fetchPageHeader,
  fetchVideos,
  youtubeEmbed,
  youtubeThumb,
  youtubeWatch,
  type VideoKind,
  type VideoRow,
} from "@/lib/content";

/**
 * 영상(16:9) · 쇼츠(9:16) 콘텐츠 페이지.
 *
 * 제목은 이 페이지로 연결된 서비스 카드에 적힌 내용을 그대로 씁니다.
 * 썸네일을 누르면 팝업 창이 열리고 그 안에서 재생됩니다.
 */
export default function ContentPage({ lang, kind }: { lang: Lang; kind: VideoKind }) {
  const d = t[lang];
  const short = kind === "short";

  const [rows, setRows] = useState<VideoRow[] | null>(null);
  const [header, setHeader] = useState<{ title: string; lead: string; kind: string } | null>(
    null,
  );
  const [open, setOpen] = useState<VideoRow | null>(null);

  useEffect(() => {
    let alive = true;
    fetchVideos(kind).then((v) => {
      if (alive) setRows(v);
    });
    return () => {
      alive = false;
    };
  }, [kind]);

  useEffect(() => {
    let alive = true;
    fetchPageHeader(short ? "shorts" : "videos", lang).then((h) => {
      if (alive) setHeader(h);
    });
    return () => {
      alive = false;
    };
  }, [short, lang]);

  /* 팝업: ESC 로 닫기 + 뒤 화면 스크롤 잠그기 */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(null), []);

  /** 카드에 적힌 제목이 있으면 그걸, 없으면 기본 제목 */
  const heading = header?.title || (short ? d.content.shortsHeading : d.content.videosHeading);
  const lead = header?.lead || (short ? d.content.shortsLead : d.content.videosLead);

  const titleOf = (v: VideoRow) => (lang === "ko" ? v.title_ko : v.title_en);
  const descOf = (v: VideoRow) => (lang === "ko" ? v.desc_ko : v.desc_en);

  return (
    <>
      <a className="skip" href="#main">
        {d.skip}
      </a>

      <Nav lang={lang} />

      <main id="main" className="section vidpage">
        <div className="wrap">
          {/* 홈 맨 위가 아니라 OUR SERVICES 영역으로 돌아갑니다 */}
          <Link className="vidpage__back" href={lang === "ko" ? "/ko#works" : "/#works"}>
            {d.content.back}
          </Link>

          <h1 className={`display${header ? " display--plain" : ""}`}>{heading}</h1>
          <p className="section__lead">{lead}</p>

          {rows === null && <p className="vidpage__note">{d.content.loading}</p>}
          {rows !== null && rows.length === 0 && (
            <p className="vidpage__note">{d.content.empty}</p>
          )}

          {rows !== null && rows.length > 0 && (
            <ul className={`vids${short ? " vids--short" : ""}`}>
              {rows.map((v) => (
                <li className="vid" key={v.id}>
                  <button
                    type="button"
                    className={`vid__frame vid__cover${short ? " vid__frame--short" : ""}`}
                    onClick={() => setOpen(v)}
                    aria-label={titleOf(v) || d.content.watchOnYouTube}
                  >
                    <Image
                      src={youtubeThumb(v.youtube_id)}
                      alt=""
                      fill
                      sizes={
                        short
                          ? "(max-width: 760px) 45vw, 240px"
                          : "(max-width: 760px) 92vw, 380px"
                      }
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                    <span className="vid__play" aria-hidden="true" />
                  </button>

                  {titleOf(v) && <h2 className="vid__title">{titleOf(v)}</h2>}
                  {descOf(v) && <p className="vid__desc">{descOf(v)}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* 재생 팝업 */}
      {open && (
        <div
          className="vmodal"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className={`vmodal__box${short ? " vmodal__box--short" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={titleOf(open) || d.content.watchOnYouTube}
          >
            <button type="button" className="vmodal__close" aria-label="닫기" onClick={close}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className={`vmodal__frame${short ? " vmodal__frame--short" : ""}`}>
              <iframe
                className="vid__player"
                src={`${youtubeEmbed(open.youtube_id)}&autoplay=1`}
                title={titleOf(open) || open.youtube_id}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="vmodal__meta">
              {titleOf(open) && <h2 className="vmodal__title">{titleOf(open)}</h2>}
              {descOf(open) && <p className="vmodal__desc">{descOf(open)}</p>}
              <a
                className="vid__link"
                href={youtubeWatch(open.youtube_id)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {d.content.watchOnYouTube}
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </>
  );
}
