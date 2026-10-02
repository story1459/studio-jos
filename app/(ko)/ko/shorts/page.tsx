import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { t } from "@/data/site";

export const metadata: Metadata = {
  // 레이아웃이 "%s | 스튜디오 조스" 를 붙이므로 여기서는 제목만
  title: t.ko.content.shortsHeading,
  description: t.ko.content.shortsLead,
};

export default function ShortsKo() {
  return <ContentPage lang="ko" kind="short" />;
}
