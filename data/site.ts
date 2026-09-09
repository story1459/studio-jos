/**
 * 사이트에 들어가는 내용은 전부 여기 있습니다.
 * 화면을 고칠 일이 아니라면 이 파일만 수정하면 됩니다.
 */

export const site = {
  name: "스튜디오 조스",
  nameEn: "STUDIO JOS",
  tagline: "디지털 프로덕트 스튜디오",
  description:
    "스튜디오 조스는 기획·디자인·개발·운영을 한 팀에서 끝내는 제작 스튜디오입니다.",
  url: "https://studiojos.kr",
  email: "hello@studiojos.kr",
  phone: "02-1234-5678",
  phoneHref: "tel:0212345678",
  address: "서울특별시 어딘가 12길 34, 5층",
  bizNumber: "000-00-00000",
} as const;

export const nav = [
  { href: "#works", label: "Works" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  titleLines: ["아이디어를", "제품으로", "만듭니다"],
  /** titleLines 중 그라디언트를 입힐 단어 */
  accentWord: "제품",
  description:
    "스튜디오 조스는 기획·디자인·개발·운영을 한 팀에서 끝내는 제작 스튜디오입니다. 웹 서비스, 모바일 앱, 브랜드 사이트를 빠르게 세상에 내보내고 숫자가 나올 때까지 함께 다듬습니다.",
  stats: [
    { value: "48", unit: "+", label: "완료 프로젝트" },
    { value: "6", unit: "주", label: "평균 첫 출시" },
    { value: "9", unit: "년", label: "팀 평균 경력" },
  ],
} as const;

export type Service = {
  no: string;
  title: string;
  body: string;
  tags: string[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "웹 서비스 개발",
    body: "SaaS·플랫폼·대시보드. 화면 설계부터 백엔드, 배포와 모니터링까지 한 번에 세팅합니다.",
    tags: ["Next.js", "Node", "PostgreSQL"],
  },
  {
    no: "02",
    title: "모바일 앱",
    body: "iOS·Android 동시 출시. 스토어 심사와 운영 지표 세팅까지 챙깁니다.",
    tags: ["React Native", "Firebase"],
  },
  {
    no: "03",
    title: "브랜드 사이트",
    body: "브랜드의 온도를 그대로 옮긴 사이트. 빠르고, 가볍고, 직접 고칠 수 있게 만듭니다.",
    tags: ["디자인", "모션", "CMS"],
  },
  {
    no: "04",
    title: "AI 프로덕트",
    body: "LLM을 붙이는 게 목적이 아니라, 실제로 일이 줄어드는 흐름을 설계합니다.",
    tags: ["RAG", "Agent", "Automation"],
  },
];

export type Work = {
  kind: string;
  title: string;
  meta: string;
  /** public/works/ 아래 이미지 경로. 없으면 아래 두 색으로 그라디언트가 깔립니다. */
  image?: string;
  colors: [string, string];
  href?: string;
};

export const works: Work[] = [
  {
    kind: "웹 서비스",
    title: "달리 — 커머스 대시보드",
    meta: "2026 · 12주",
    colors: ["#ff9a3c", "#ff5f6d"],
  },
  {
    kind: "모바일 앱",
    title: "핀 — 자산 관리 앱",
    meta: "2025 · 16주",
    colors: ["#8fd4ff", "#3f7dff"],
  },
  {
    kind: "AI 프로덕트",
    title: "노트봇 — 문서 검색 어시스턴트",
    meta: "2025 · 8주",
    colors: ["#e3b8ff", "#8f6bff"],
  },
  {
    kind: "브랜드 사이트",
    title: "온도 — 리브랜딩 사이트",
    meta: "2025 · 5주",
    colors: ["#a7f3c5", "#22b07d"],
  },
  {
    kind: "플랫폼",
    title: "모아 — 소상공인 예약",
    meta: "2024 · 20주",
    colors: ["#ffd76e", "#f4813f"],
  },
  {
    kind: "내부 도구",
    title: "랩스 — 운영 자동화",
    meta: "2024 · 6주",
    colors: ["#9fe8ff", "#5a67d8"],
  },
];

export type Member = {
  name: string;
  role: string;
  /** public/team/ 아래 정사각형 이미지. 없으면 그라디언트. */
  image?: string;
  colors: [string, string];
};

export const team: Member[] = [
  { name: "김조스", role: "Founder · Product", colors: ["#ffb3c7", "#ff6f91"] },
  { name: "이하늘", role: "Lead Engineer", colors: ["#b7a5ff", "#5b4bd6"] },
  { name: "박서린", role: "Product Designer", colors: ["#8ef0c8", "#1e9e74"] },
  { name: "정우빈", role: "Frontend Engineer", colors: ["#ffd9a0", "#e2643f"] },
];

export const cta = {
  titleLines: ["지금", "프로젝트를", "시작하세요"],
  description:
    "첫 미팅에서 범위·일정·비용의 대략을 바로 드립니다. 계약 전 단계까지 비용은 없습니다.",
  button: "문의 남기기",
} as const;

export const socials = [
  { label: "인스타그램", href: "https://instagram.com/", icon: "instagram" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "깃허브", href: "https://github.com/", icon: "github" },
  { label: "브런치", href: "https://brunch.co.kr/", icon: "brunch" },
] as const;
