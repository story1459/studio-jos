import { getSupabase } from "./supabase";
import { works as fallbackWorks, type Lang } from "@/data/site";

/**
 * 관리자에서 올린 콘텐츠를 읽어옵니다.
 *
 * 사이트가 정적이라 빌드 때 값을 박을 수 없습니다. 그래서 공개 페이지가
 * 브라우저에서 Supabase 를 직접 조회합니다. 연결이 안 되거나 테이블이
 * 비어 있으면 data/site.ts 의 기본값으로 되돌아갑니다.
 */

export type LinkType = "none" | "videos" | "shorts" | "url";
export type VideoKind = "video" | "short";

export type ServiceRow = {
  id: string;
  sort: number;
  kind_ko: string;
  kind_en: string;
  title_ko: string;
  title_en: string;
  meta_ko: string;
  meta_en: string;
  color1: string;
  color2: string;
  image_url: string | null;
  link_type: LinkType;
  link_url: string | null;
  published: boolean;
};

export type VideoRow = {
  id: string;
  sort: number;
  kind: VideoKind;
  youtube_id: string;
  youtube_url: string;
  title_ko: string;
  title_en: string;
  desc_ko: string;
  desc_en: string;
  published: boolean;
};

/** 카드·목록이 화면에서 쓰는 모양 */
export type Card = {
  key: string;
  kind: string;
  title: string;
  meta: string;
  colors: [string, string];
  image?: string;
  href?: string;
};

/* ───────────────────────── 유튜브 주소 ───────────────────────── */

/**
 * 붙여넣은 유튜브 주소에서 영상 ID 를 뽑습니다.
 * 지원: youtu.be/ID, /watch?v=ID, /shorts/ID, /embed/ID, /live/ID
 * 쇼츠 주소면 kind 를 'short' 로 돌려줍니다.
 */
export function parseYouTube(input: string): { id: string; kind: VideoKind } | null {
  const url = input.trim();
  if (!url) return null;

  // 주소가 아니라 ID 만 붙여넣은 경우
  if (/^[\w-]{11}$/.test(url)) return { id: url, kind: "video" };

  const patterns: [RegExp, VideoKind][] = [
    [/youtube\.com\/shorts\/([\w-]{11})/i, "short"],
    [/youtu\.be\/([\w-]{11})/i, "video"],
    [/youtube\.com\/watch\?[^#]*\bv=([\w-]{11})/i, "video"],
    [/youtube\.com\/embed\/([\w-]{11})/i, "video"],
    [/youtube\.com\/live\/([\w-]{11})/i, "video"],
  ];

  for (const [re, kind] of patterns) {
    const m = url.match(re);
    if (m) return { id: m[1], kind };
  }
  return null;
}

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;

/* ───────────────────────── 조회 ───────────────────────── */

/** 언어별 콘텐츠 페이지 주소 */
export function contentPath(kind: "videos" | "shorts", lang: Lang) {
  return lang === "ko" ? `/ko/${kind}` : `/${kind}`;
}

function serviceHref(row: ServiceRow, lang: Lang): string | undefined {
  if (row.link_type === "videos") return contentPath("videos", lang);
  if (row.link_type === "shorts") return contentPath("shorts", lang);
  if (row.link_type === "url") return row.link_url || undefined;
  return undefined;
}

export function serviceToCard(row: ServiceRow, lang: Lang): Card {
  return {
    key: row.id,
    kind: lang === "ko" ? row.kind_ko : row.kind_en,
    title: lang === "ko" ? row.title_ko : row.title_en,
    meta: lang === "ko" ? row.meta_ko : row.meta_en,
    colors: [row.color1, row.color2],
    image: row.image_url || undefined,
    href: serviceHref(row, lang),
  };
}

/** data/site.ts 의 기본 카드 (Supabase 를 못 읽을 때) */
export function fallbackCards(lang: Lang): Card[] {
  return fallbackWorks.map((w, i) => ({
    key: `fallback-${i}`,
    kind: w[lang].kind,
    title: w[lang].title,
    meta: w[lang].meta,
    colors: w.colors,
    image: w.image,
    href: w.link ? contentPath(w.link, lang) : w.href,
  }));
}

/** 공개 페이지용 — 게시된 카드만 */
export async function fetchCards(lang: Lang): Promise<Card[]> {
  const supabase = getSupabase();
  if (!supabase) return fallbackCards(lang);

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort", { ascending: true });

  if (error || !data || data.length === 0) return fallbackCards(lang);
  return (data as ServiceRow[]).map((r) => serviceToCard(r, lang));
}

/**
 * 콘텐츠 페이지의 제목·설명.
 * 그 페이지로 연결된 서비스 카드에 적힌 내용을 그대로 씁니다.
 * (예: /shorts → "어원탐정 — 말의 뿌리를 캐다")
 */
export async function fetchPageHeader(
  link: "videos" | "shorts",
  lang: Lang,
): Promise<{ title: string; lead: string; kind: string } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("link_type", link)
    .eq("published", true)
    .order("sort", { ascending: true })
    .limit(1);

  if (error || !data || data.length === 0) return null;

  const row = data[0] as ServiceRow;
  const title = lang === "ko" ? row.title_ko : row.title_en;
  if (!title) return null;

  return {
    title,
    lead: lang === "ko" ? row.meta_ko : row.meta_en,
    kind: lang === "ko" ? row.kind_ko : row.kind_en,
  };
}

/** 관리자용 — 숨긴 것까지 전부 */
export async function fetchAllServices(): Promise<ServiceRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort", { ascending: true });
  if (error || !data) return [];
  return data as ServiceRow[];
}

/** 공개 페이지용 영상 목록 */
export async function fetchVideos(kind: VideoKind): Promise<VideoRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("kind", kind)
    .eq("published", true)
    .order("sort", { ascending: true });
  if (error || !data) return [];
  return data as VideoRow[];
}

/* ───────────────────────── 이미지 업로드 ───────────────────────── */

/** 올릴 수 있는 최대 크기 (5MB) */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * 이미지를 Supabase Storage('media' 버킷)에 올리고 공개 주소를 돌려줍니다.
 * 로그인한 상태에서만 됩니다(정책).
 */
export async function uploadImage(
  file: File,
): Promise<{ url: string; path: string } | { error: string }> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Supabase 설정이 없습니다." };

  if (!file.type.startsWith("image/")) return { error: "이미지 파일만 올릴 수 있습니다." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "5MB 이하 이미지만 올릴 수 있습니다." };

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `services/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { cacheControl: "31536000", upsert: false });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl, path };
}

/** 관리자용 영상 목록 */
export async function fetchAllVideos(): Promise<VideoRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("kind", { ascending: true })
    .order("sort", { ascending: true });
  if (error || !data) return [];
  return data as VideoRow[];
}
