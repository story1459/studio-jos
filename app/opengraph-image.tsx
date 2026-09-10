import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// 카카오톡·슬랙·X 에 링크를 붙였을 때 뜨는 미리보기 이미지를 자동으로 만듭니다.
export const alt = `${site.name} — 콘텐츠부터 플랫폼까지 직접 만듭니다`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0f",
          backgroundImage:
            "radial-gradient(900px 600px at 85% 0%, rgba(47,155,245,.42), transparent 60%), radial-gradient(700px 500px at 0% 90%, rgba(124,92,255,.32), transparent 62%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, opacity: 0.75 }}>
          {site.nameEn}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          <span>콘텐츠부터 플랫폼까지</span>
          <span>직접 만듭니다</span>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#9a9aa9" }}>
          유튜브 AI 콘텐츠 · 모바일 서비스 · 플랫폼
        </div>
      </div>
    ),
    size,
  );
}
