/**
 * 사이트에 들어가는 내용은 전부 여기 있습니다.
 * 화면을 고칠 일이 아니라면 이 파일만 수정하면 됩니다.
 */

export const site = {
  name: "스튜디오 조스",
  nameEn: "STUDIO JOS",
  tagline: "프로덕트 스튜디오",
  description:
    "스튜디오 조스는 직접 서비스를 기획하고 만들어 운영하는 프로덕트 스튜디오입니다.",
  url: "https://studiojos.kr",
  email: "hello@studiojos.kr",
  phone: "02-1234-5678",
  phoneHref: "tel:0212345678",
  address: "서울특별시 어딘가 12길 34, 5층",
  bizNumber: "000-00-00000",
} as const;

export const nav = [
  { href: "#works", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#join", label: "Join" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  titleLines: ["서비스를", "직접 만들고", "운영합니다"],
  /** titleLines 중 그라디언트를 입힐 단어 */
  accentWord: "직접",
  description:
    "스튜디오 조스는 우리가 필요하다고 느낀 문제를 골라 직접 만듭니다. 빠르게 내보내고, 숫자가 붙을 때까지 붙잡고 키웁니다. 만들고 끝내지 않고 계속 굴립니다.",
  stats: [
    { value: "6", unit: "개", label: "운영 중인 서비스" },
    { value: "12", unit: "만", label: "누적 사용자" },
    { value: "9", unit: "년", label: "팀 평균 경력" },
  ],
} as const;

export type Step = {
  no: string;
  title: string;
  body: string;
  tags: string[];
};

/** HOW WE BUILD — 서비스를 만드는 방식 */
export const process: Step[] = [
  {
    no: "01",
    title: "문제부터 고릅니다",
    body: "직접 겪은 불편, 주변이 반복해서 말하는 문제에서 시작합니다. 시장 크기보다 우리가 오래 붙어 있을 수 있는 주제인지를 먼저 봅니다.",
    tags: ["리서치", "사용자 인터뷰", "가설"],
  },
  {
    no: "02",
    title: "4주 안에 내보냅니다",
    body: "완성도보다 반응이 먼저입니다. 쓸 만한 최소한만 만들어 실제 사용자 앞에 올리고 거기서부터 고칩니다.",
    tags: ["프로토타입", "베타", "출시"],
  },
  {
    no: "03",
    title: "숫자로 판단합니다",
    body: "감이 아니라 지표로 다음 할 일을 정합니다. 재방문이 나오지 않으면 기능을 더하지 않고 접습니다.",
    tags: ["리텐션", "실험", "데이터"],
  },
  {
    no: "04",
    title: "오래 굴립니다",
    body: "만든 사람이 운영까지 맡습니다. 고객 응대와 개선을 같은 팀이 계속 이어갑니다.",
    tags: ["운영", "고객 응대", "개선"],
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

/** OUR SERVICES — 우리가 만들어 운영 중인 서비스 */
export const works: Work[] = [
  {
    kind: "커머스",
    title: "달리 — 셀러 정산 자동화",
    meta: "운영 중 · 셀러 1,200팀",
    colors: ["#ff9a3c", "#ff5f6d"],
  },
  {
    kind: "금융",
    title: "핀 — 자산 기록 앱",
    meta: "운영 중 · MAU 3.4만",
    colors: ["#8fd4ff", "#3f7dff"],
  },
  {
    kind: "AI",
    title: "노트봇 — 문서 검색 어시스턴트",
    meta: "베타 운영 중",
    colors: ["#e3b8ff", "#8f6bff"],
  },
  {
    kind: "로컬",
    title: "온도 — 동네 취향 지도",
    meta: "운영 중 · MAU 8천",
    colors: ["#a7f3c5", "#22b07d"],
  },
  {
    kind: "예약",
    title: "모아 — 소상공인 예약",
    meta: "운영 중 · 매장 480곳",
    colors: ["#ffd76e", "#f4813f"],
  },
  {
    kind: "사내 도구",
    title: "랩스 — 운영 자동화",
    meta: "사내 사용",
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
  titleLines: ["같이 만들", "사람을", "찾습니다"],
  description:
    "기획자·디자이너·개발자를 상시로 보고 있습니다. 이력서보다, 만들고 싶은 게 무엇인지를 먼저 들려주세요.",
  button: "합류 문의하기",
} as const;

export const socials = [
  { label: "인스타그램", href: "https://instagram.com/", icon: "instagram" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "깃허브", href: "https://github.com/", icon: "github" },
  { label: "브런치", href: "https://brunch.co.kr/", icon: "brunch" },
] as const;
