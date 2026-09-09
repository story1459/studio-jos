import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 아이디어를 제품으로`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["웹 개발", "앱 개발", "브랜드 사이트", "제작 스튜디오", "스튜디오 조스"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — 아이디어를 제품으로`,
    description: site.description,
    // 미리보기 이미지는 app/opengraph-image.tsx 가 자동으로 만듭니다.
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — 아이디어를 제품으로`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={poppins.variable}>
      <head>
        {/* 한글 서체 — 쓰는 글자만 내려받는 다이내믹 서브셋 */}
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* JS 가 꺼져 있으면 등장 애니메이션 없이 그냥 다 보이게 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
