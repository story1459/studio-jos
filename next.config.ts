import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Cloudflare Pages 로 정적 배포합니다. 빌드 결과는 out/ 에 떨어집니다.
   * 이 사이트는 모든 경로가 정적으로 생성되므로 서버 런타임이 필요 없습니다.
   * 나중에 서버 기능(API 라우트·서버 액션 등)이 필요해지면
   * output 을 지우고 @opennextjs/cloudflare 로 Workers 에 올리면 됩니다.
   */
  output: "export",

  /** 정적 배포에는 Next 의 이미지 최적화 서버가 없습니다. */
  images: { unoptimized: true },

  /**
   * 보안·캐시 헤더는 public/_headers 로 옮겼습니다.
   * output: "export" 에서는 headers() 가 동작하지 않습니다.
   */
};

export default nextConfig;
