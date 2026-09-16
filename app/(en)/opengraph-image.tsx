import { ogImage, ogMeta } from "@/components/OgImage";

// output: "export" 에서는 이미지 생성 라우트를 빌드 시점에 고정해야 합니다
export const dynamic = "force-static";

export const alt = ogMeta("en").alt;
export const size = ogMeta("en").size;
export const contentType = ogMeta("en").contentType;

export default function OpengraphImage() {
  return ogImage("en");
}
