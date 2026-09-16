import { ogImage, ogMeta } from "@/components/OgImage";

// output: "export" 에서는 이미지 생성 라우트를 빌드 시점에 고정해야 합니다
export const dynamic = "force-static";

export const alt = ogMeta("ko").alt;
export const size = ogMeta("ko").size;
export const contentType = ogMeta("ko").contentType;

export default function OpengraphImage() {
  return ogImage("ko");
}
