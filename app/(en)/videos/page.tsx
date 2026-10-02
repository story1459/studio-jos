import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { t } from "@/data/site";

export const metadata: Metadata = {
  // 레이아웃이 "%s | Studio JOS" 를 붙이므로 여기서는 제목만
  title: t.en.content.videosHeading,
  description: t.en.content.videosLead,
};

export default function VideosEn() {
  return <ContentPage lang="en" kind="video" />;
}
