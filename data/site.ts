/**
 * 사이트에 들어가는 내용은 전부 여기 있습니다.
 * 화면을 고칠 일이 아니라면 이 파일만 수정하면 됩니다.
 */

export const site = {
  name: "스튜디오 조스",
  nameEn: "STUDIO JOS",
  tagline: "프로젝트 스튜디오",
  description:
    "스튜디오 조스는 유튜브 AI 콘텐츠부터 모바일 서비스, 플랫폼까지 다양한 서비스를 직접 만들고 운영하는 프로젝트 스튜디오입니다.",
  url: "https://studiojos.kr",
  email: "hello@studiojos.kr",
  phone: "02-1234-5678",
  phoneHref: "tel:0212345678",
  address: "서울특별시 어딘가 12길 34, 5층",
  bizNumber: "000-00-00000",
} as const;

export const nav = [
  { href: "#works", label: "Services" },
  { href: "#make", label: "What we make" },
  { href: "#join", label: "Join" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  titleLines: ["콘텐츠부터", "플랫폼까지", "직접 만듭니다"],
  /** titleLines 중 그라디언트를 입힐 단어 */
  accentWord: "플랫폼까지",
  description:
    "스튜디오 조스는 다양한 서비스를 만드는 프로젝트 스튜디오입니다. AI로 만드는 유튜브 콘텐츠부터 모바일 앱, 플랫폼 서비스까지 — 아이디어를 직접 만들어 세상에 내놓고, 끝까지 서비스합니다.",
  stats: [
    { value: "12", unit: "개", label: "만들어 운영 중인 서비스" },
    { value: "30", unit: "만", label: "누적 구독자 · 사용자" },
    { value: "4", unit: "개", label: "사업 영역" },
  ],
} as const;

export type Area = {
  no: string;
  title: string;
  body: string;
  tags: string[];
};

/** WHAT WE MAKE — 만드는 영역. 콘텐츠에서 플랫폼 순으로 */
export const areas: Area[] = [
  {
    no: "01",
    title: "AI 영상 콘텐츠",
    body: "AI로 기획하고 제작하는 유튜브 채널을 직접 운영합니다. 주제 발굴부터 편집, 업로드, 채널 성장까지 한 팀이 맡습니다.",
    tags: ["유튜브", "숏폼", "생성형 AI"],
  },
  {
    no: "02",
    title: "AI 서비스",
    body: "콘텐츠를 만들며 직접 쓰던 도구를 서비스로 꺼냅니다. 실제로 일이 줄어드는 AI 도구를 만듭니다.",
    tags: ["LLM", "자동화", "에이전트"],
  },
  {
    no: "03",
    title: "모바일 서비스",
    body: "매일 손이 가는 앱을 만듭니다. iOS·Android 에 직접 출시하고, 리뷰를 읽으며 계속 고칩니다.",
    tags: ["iOS", "Android", "앱스토어"],
  },
  {
    no: "04",
    title: "플랫폼 서비스",
    body: "사람과 사람, 가게와 손님을 잇는 플랫폼을 만듭니다. 양쪽 모두 남는 구조를 설계하고 직접 운영합니다.",
    tags: ["예약", "커뮤니티", "마켓플레이스"],
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

/** OUR SERVICES — 우리가 만들어 운영 중인 것들. 콘텐츠 → 모바일 → 플랫폼 순 */
export const works: Work[] = [
  {
    kind: "유튜브 · AI 콘텐츠",
    title: "조스 AI — 1분 지식 숏폼",
    meta: "운영 중 · 구독자 8.2만",
    colors: ["#ff6b6b", "#c0265a"],
  },
  {
    kind: "유튜브 · AI 콘텐츠",
    title: "사운드랩 — AI 음악 채널",
    meta: "운영 중 · 구독자 3.1만",
    colors: ["#ff9a3c", "#ff5f6d"],
  },
  {
    kind: "AI 서비스",
    title: "컷봇 — 영상 자동 편집 도구",
    meta: "베타 운영 중",
    colors: ["#e3b8ff", "#8f6bff"],
  },
  {
    kind: "모바일",
    title: "핀 — 자산 기록 앱",
    meta: "운영 중 · MAU 3.4만",
    colors: ["#8fd4ff", "#3f7dff"],
  },
  {
    kind: "모바일",
    title: "온도 — 동네 취향 지도",
    meta: "운영 중 · MAU 8천",
    colors: ["#a7f3c5", "#22b07d"],
  },
  {
    kind: "플랫폼",
    title: "모아 — 소상공인 예약 플랫폼",
    meta: "운영 중 · 매장 480곳",
    colors: ["#ffd76e", "#f4813f"],
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
  { name: "김조스", role: "Founder · Producer", colors: ["#ffb3c7", "#ff6f91"] },
  { name: "박서린", role: "Content Director · AI", colors: ["#8ef0c8", "#1e9e74"] },
  { name: "이하늘", role: "Lead Engineer", colors: ["#b7a5ff", "#5b4bd6"] },
  { name: "정우빈", role: "Mobile Engineer", colors: ["#ffd9a0", "#e2643f"] },
];

export const cta = {
  titleLines: ["같이 만들", "사람을", "찾습니다"],
  description:
    "크리에이터·기획자·디자이너·개발자를 상시로 보고 있습니다. 영상이든 앱이든, 만들고 싶은 게 무엇인지를 먼저 들려주세요.",
  button: "합류 문의하기",
} as const;

export const socials = [
  { label: "유튜브", href: "https://youtube.com/", icon: "youtube" },
  { label: "인스타그램", href: "https://instagram.com/", icon: "instagram" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "깃허브", href: "https://github.com/", icon: "github" },
] as const;
