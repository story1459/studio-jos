import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { t } from "@/data/site";

export const metadata: Metadata = {
  // 레이아웃이 "%s | 스튜디오 조스" 를 붙이므로 여기서는 제목만
  title: t.ko.content.videosHeading,
  description: t.ko.content.videosLead,
};

export default function VideosKo() {
  return <ContentPage lang="ko" kind="video" />;
}
