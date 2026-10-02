import type { Metadata } from "next";
import RootShell, { sharedViewport } from "@/components/RootShell";
import "./admin.css";

export const metadata: Metadata = {
  title: "관리자 | 스튜디오 조스",
  // 관리자 화면은 검색엔진에 올리지 않습니다
  robots: { index: false, follow: false },
};

export const viewport = sharedViewport;

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="ko">{children}</RootShell>;
}
