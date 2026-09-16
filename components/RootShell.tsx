import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { paths, site, t, type Lang } from "@/data/site";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const sharedViewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const KEYWORDS: Record<Lang, string[]> = {
  ko: [
    "프로젝트 스튜디오",
    "AI 콘텐츠",
    "유튜브 AI 채널",
    "모바일 서비스",
    "플랫폼 서비스",
    "스튜디오 조스",
  ],
  en: [
    "project studio",
    "AI content",
    "YouTube AI channel",
    "mobile service",
    "platform service",
    "Studio JOS",
  ],
};

export function metadataFor(lang: Lang): Metadata {
  const d = t[lang];
  const title = `${d.name} — ${d.metaTitle}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${d.name}` },
    description: d.description,
    keywords: KEYWORDS[lang],
    alternates: {
      canonical: paths[lang],
      languages: { ko: paths.ko, en: paths.en },
    },
    openGraph: {
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      url: site.url + (paths[lang] === "/" ? "" : paths[lang]),
      siteName: d.name,
      title,
      description: d.description,
      // 미리보기 이미지는 각 언어의 opengraph-image.tsx 가 자동으로 만듭니다.
    },
    twitter: { card: "summary_large_image", title, description: d.description },
    robots: { index: true, follow: true },
  };
}

/** 두 언어 페이지가 공유하는 <html> 껍데기 */
export default function RootShell({
  lang,
  children,
}: Readonly<{ lang: Lang; children: React.ReactNode }>) {
  return (
    <html lang={lang} className={poppins.variable}>
      {/* App Router 에서는 레이아웃이 <head> 를 직접 그립니다.
          아래 규칙은 Pages Router 의 next/head 를 쓰라고 안내하므로 여기서는 끕니다. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* 한글 서체 — 쓰는 글자만 내려받는 다이내믹 서브셋 */}
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* JS 가 꺼져 있으면 등장 애니메이션을 걷어내고 내용을 그대로 보여줍니다 */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
