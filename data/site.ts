/**
 * 사이트에 들어가는 내용은 전부 여기 있습니다.
 * 한국어(ko)와 영어(en) 두 벌이며, 화면 코드를 건드릴 일이 아니라면
 * 이 파일만 수정하면 됩니다.
 */

export type Lang = "ko" | "en";

/** 전환 버튼에 나오는 순서. 기본 언어를 앞에 둡니다. */
export const LANGS: Lang[] = ["en", "ko"];

/** 언어별 주소. 영어가 기본이라 루트를 씁니다. */
export const paths: Record<Lang, string> = { en: "/", ko: "/ko" };

/** 언어와 무관한 값 */
export const site = {
  nameEn: "STUDIO JOS",
  url: "https://studiojos.kr",
  email: "zero@studiojos.kr",
  phone: "02-1234-5678",
  phoneHref: "tel:0212345678",
} as const;

/* ───────────────────────── 문구 ───────────────────────── */

type Stat = { value: string; unit: string; label: string };

export type Dict = {
  name: string;
  tagline: string;
  description: string;
  metaTitle: string;

  skip: string;
  menuOpen: string;
  menuClose: string;
  langSwitchLabel: string;

  nav: {
    works: string;
    make: string;
    join: string;
    team: string;
    contact: string;
    /** 상단 오른쪽 버튼 — 관리자 로그인 */
    login: string;
  };

  hero: {
    titleLines: string[];
    /** titleLines 중 그라디언트를 입힐 단어 */
    accentWord: string;
    description: string;
    primary: string;
    secondary: string;
    stats: Stat[];
  };

  works: { heading: string; lead: string; prev: string; next: string; listLabel: string };
  areas: { heading: string; lead: string };

  /** 영상·쇼츠 콘텐츠 페이지 */
  content: {
    videosHeading: string;
    videosLead: string;
    shortsHeading: string;
    shortsLead: string;
    empty: string;
    loading: string;
    back: string;
    watchOnYouTube: string;
  };
  cta: { titleLines: string[]; description: string; button: string };
  team: { heading: string; lead: string };

  contact: {
    titleTop: string;
    titleBottom: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    invalid: string;
    opening: string;
    direct: string;
    socialLabel: string;
    mailSubject: string;
    /** {email} 자리에 입력한 주소가 들어갑니다 */
    mailBody: string;
  };

  footer: { address: string; biz: string; rights: string };
};

export const t: Record<Lang, Dict> = {
  ko: {
    name: "스튜디오 조스",
    tagline: "프로젝트 스튜디오",
    description:
      "스튜디오 조스는 유튜브 AI 콘텐츠부터 모바일 서비스, 플랫폼까지 다양한 서비스를 직접 만들고 운영하는 프로젝트 스튜디오입니다.",
    metaTitle: "콘텐츠부터 플랫폼까지 직접 만듭니다",

    skip: "본문 바로가기",
    menuOpen: "메뉴 열기",
    menuClose: "메뉴 닫기",
    langSwitchLabel: "언어 선택",

    nav: {
      works: "서비스",
      make: "만드는 것",
      join: "합류",
      team: "팀",
      contact: "문의",
      login: "로그인",
    },

    hero: {
      titleLines: ["콘텐츠부터", "플랫폼까지", "직접 만듭니다"],
      accentWord: "플랫폼까지",
      description:
        "스튜디오 조스는 다양한 서비스를 만드는 프로젝트 스튜디오입니다. AI로 만드는 유튜브 콘텐츠부터 모바일 앱, 플랫폼 서비스까지 — 아이디어를 직접 만들어 세상에 내놓고, 끝까지 서비스합니다.",
      primary: "서비스 보기",
      secondary: "합류하기",
      stats: [
        { value: "직접", unit: "", label: "기획부터 운영까지 한 팀이" },
        { value: "오래", unit: "", label: "만들고 끝내지 않습니다" },
        { value: "넓게", unit: "", label: "영상부터 플랫폼까지" },
      ],
    },

    works: {
      heading: "OUR SERVICES",
      lead: "유튜브 채널부터 앱, 플랫폼까지. 지금 우리가 만들어 직접 운영하고 있는 것들입니다.",
      prev: "이전 서비스 보기",
      next: "다음 서비스 보기",
      listLabel: "서비스 목록 (좌우로 스크롤)",
    },

    areas: {
      heading: "WHAT WE MAKE",
      lead: "영상 한 편부터 플랫폼 하나까지. 크기는 달라도 직접 만들고 끝까지 서비스한다는 방식은 같습니다.",
    },

    content: {
      videosHeading: "VIDEOS",
      videosLead: "AI 로 기획하고 만든 영상입니다. 눌러서 바로 보실 수 있습니다.",
      shortsHeading: "SHORTS",
      shortsLead: "짧게 보는 콘텐츠. 세로 화면 그대로 담았습니다.",
      empty: "아직 올라온 영상이 없습니다.",
      loading: "불러오는 중…",
      back: "← 서비스 목록으로",
      watchOnYouTube: "유튜브에서 보기",
    },

    cta: {
      titleLines: ["같이 만들", "사람을", "찾습니다"],
      description:
        "크리에이터·기획자·디자이너·개발자를 상시로 보고 있습니다. 영상이든 앱이든, 만들고 싶은 게 무엇인지를 먼저 들려주세요.",
      button: "합류 문의하기",
    },

    team: {
      heading: "OUR TEAM",
      lead: "영상을 만드는 사람과 코드를 쓰는 사람이 한 팀에서 일합니다. 콘텐츠에서 배운 것이 서비스가 되고, 서비스가 다시 콘텐츠가 됩니다.",
    },

    contact: {
      titleTop: "합류, 제휴, 제안 무엇이든",
      titleBottom: "한 줄만 남겨주세요",
      emailLabel: "이메일 주소",
      placeholder: "이메일 주소를 입력해 주세요",
      submit: "보내기",
      invalid: "이메일 주소를 다시 확인해 주세요.",
      opening: "메일 앱을 여는 중입니다. 내용을 적어 보내주세요.",
      direct: "바로 연락하기",
      socialLabel: "Our social networks",
      mailSubject: "스튜디오 조스 문의",
      mailBody:
        "보내는 분 이메일: {email}\n\n어떤 용건인가요? (합류 / 제휴 / 제안 / 기타):\n\n하고 싶은 이야기:\n",
    },

    footer: {
      address: "서울특별시 어딘가 12길 34, 5층",
      biz: "사업자등록번호 000-00-00000",
      rights: "All rights reserved.",
    },
  },

  en: {
    name: "Studio JOS",
    tagline: "Project Studio",
    description:
      "Studio JOS is a project studio that builds and runs its own services — from AI-driven YouTube channels to mobile apps and platforms.",
    metaTitle: "From content to platforms, we build it",

    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langSwitchLabel: "Select language",

    nav: {
      works: "Services",
      make: "What we make",
      join: "Join",
      team: "Team",
      contact: "Contact",
      login: "Login",
    },

    hero: {
      titleLines: ["FROM CONTENT", "TO PLATFORMS", "WE BUILD IT"],
      accentWord: "PLATFORMS",
      description:
        "Studio JOS is a project studio that makes things of its own. AI-driven YouTube channels, mobile apps, platform services — we build the idea, put it in front of real people, and keep running it.",
      primary: "See our services",
      secondary: "Join us",
      stats: [
        { value: "In-house", unit: "", label: "One team, from idea to upkeep" },
        { value: "Long-run", unit: "", label: "We keep running what we make" },
        { value: "Range", unit: "", label: "From a single video to a platform" },
      ],
    },

    works: {
      heading: "OUR SERVICES",
      lead: "YouTube channels, apps, platforms. Everything here is something we built and still run ourselves.",
      prev: "Previous service",
      next: "Next service",
      listLabel: "Service list (scroll horizontally)",
    },

    areas: {
      heading: "WHAT WE MAKE",
      lead: "From a single video to a whole platform. The scale changes; building it ourselves and running it to the end does not.",
    },

    content: {
      videosHeading: "VIDEOS",
      videosLead: "Videos we plan and produce with AI. Tap to watch right here.",
      shortsHeading: "SHORTS",
      shortsLead: "Short-form content, kept in its original vertical frame.",
      empty: "No videos yet.",
      loading: "Loading…",
      back: "← Back to services",
      watchOnYouTube: "Watch on YouTube",
    },

    cta: {
      titleLines: ["LOOKING FOR", "PEOPLE TO", "BUILD WITH"],
      description:
        "We're always talking to creators, product people, designers and engineers. Tell us what you want to make — that says more than a résumé.",
      button: "Get in touch",
    },

    team: {
      heading: "OUR TEAM",
      lead: "The people who make videos and the people who write code sit on the same team. What we learn from content becomes a service, and the service becomes content again.",
    },

    contact: {
      titleTop: "Joining, partnering, or an idea",
      titleBottom: "One line is enough",
      emailLabel: "Email address",
      placeholder: "Enter your email address",
      submit: "Send",
      invalid: "Please check your email address.",
      opening: "Opening your mail app — tell us the rest there.",
      direct: "Reach us directly",
      socialLabel: "Our social networks",
      mailSubject: "Studio JOS enquiry",
      mailBody:
        "From: {email}\n\nWhat is this about? (joining / partnership / idea / other):\n\nTell us more:\n",
    },

    footer: {
      address: "5F, 34 Eodiseonga-gil 12, Seoul, Korea",
      biz: "Business reg. 000-00-00000",
      rights: "All rights reserved.",
    },
  },
};

/* ───────────────────── 반복되는 항목들 ───────────────────── */
/* 색상·이미지·링크는 언어와 무관하므로 한 번만 적고, 글만 두 벌 둡니다. */

export type Area = {
  no: string;
  ko: { title: string; body: string; tags: string[] };
  en: { title: string; body: string; tags: string[] };
};

/** WHAT WE MAKE — 만드는 영역. 콘텐츠에서 플랫폼 순으로 */
export const areas: Area[] = [
  {
    no: "01",
    ko: {
      title: "AI 영상 콘텐츠",
      body: "AI로 기획하고 제작하는 유튜브 채널을 직접 운영합니다. 주제 발굴부터 편집, 업로드, 채널 성장까지 한 팀이 맡습니다.",
      tags: ["유튜브", "숏폼", "생성형 AI"],
    },
    en: {
      title: "AI Video Content",
      body: "We plan and produce YouTube channels with AI, and run them ourselves — topic research, editing, uploading and growth all in one team.",
      tags: ["YouTube", "Shorts", "Generative AI"],
    },
  },
  {
    no: "02",
    ko: {
      title: "AI 서비스",
      body: "콘텐츠를 만들며 직접 쓰던 도구를 서비스로 꺼냅니다. 실제로 일이 줄어드는 AI 도구를 만듭니다.",
      tags: ["LLM", "자동화", "에이전트"],
    },
    en: {
      title: "AI Services",
      body: "We turn the tools we built for our own work into products — tools that actually cut the work, not demos.",
      tags: ["LLM", "Automation", "Agents"],
    },
  },
  {
    no: "03",
    ko: {
      title: "모바일 서비스",
      body: "매일 손이 가는 앱을 만듭니다. iOS·Android 에 직접 출시하고, 리뷰를 읽으며 계속 고칩니다.",
      tags: ["iOS", "Android", "앱스토어"],
    },
    en: {
      title: "Mobile Services",
      body: "Apps people open every day. We ship to iOS and Android ourselves, read the reviews, and keep fixing.",
      tags: ["iOS", "Android", "App Store"],
    },
  },
  {
    no: "04",
    ko: {
      title: "플랫폼 서비스",
      body: "사람과 사람, 가게와 손님을 잇는 플랫폼을 만듭니다. 양쪽 모두 남는 구조를 설계하고 직접 운영합니다.",
      tags: ["예약", "커뮤니티", "마켓플레이스"],
    },
    en: {
      title: "Platform Services",
      body: "Platforms that connect people, shops and customers. We design so both sides come out ahead, then operate them.",
      tags: ["Booking", "Community", "Marketplace"],
    },
  },
];

export type Work = {
  /** public/works/ 아래 이미지 경로. 없으면 아래 두 색으로 그라디언트가 깔립니다. */
  image?: string;
  colors: [string, string];
  /** 눌렀을 때 갈 콘텐츠 페이지 (언어에 맞춰 /ko 가 붙습니다) */
  link?: "videos" | "shorts";
  /** 바깥 주소로 보낼 때 */
  href?: string;
  ko: { kind: string; title: string; meta: string };
  en: { kind: string; title: string; meta: string };
};

/**
 * OUR SERVICES 기본값.
 *
 * 평소에는 관리자에서 올린 내용(Supabase)이 이 자리를 대신합니다.
 * 여기 적힌 건 첫 화면이 그려질 때와 Supabase 를 못 읽을 때 쓰이는 값이라,
 * 실제로 운영 중인 것만 적어둡니다.
 */
export const works: Work[] = [
  {
    colors: ["#a78bfa", "#4c1d95"],
    link: "shorts",
    ko: {
      kind: "유튜브 · 쇼츠",
      title: "어원탐정 — 말의 뿌리를 캐다",
      meta: "우리말 어원 · 1분 쇼츠",
    },
    en: {
      kind: "YouTube · Shorts",
      title: "Eowon Tamjeong — Where words come from",
      meta: "Korean etymology · 1-min shorts",
    },
  },
  {
    colors: ["#ffd76e", "#f4813f"],
    link: "videos",
    ko: {
      kind: "유튜브 · 키즈 콘텐츠",
      title: "Studio JOS Kids — 스페인어 동요",
      meta: "스페인어권 아이들을 위한 노래",
    },
    en: {
      kind: "YouTube · Kids",
      title: "Studio JOS Kids — Canciones Infantiles",
      meta: "Songs for Spanish-speaking kids",
    },
  },
];

export type Member = {
  /** public/team/ 아래 정사각형 이미지. 없으면 그라디언트. */
  image?: string;
  colors: [string, string];
  ko: { name: string; role: string };
  en: { name: string; role: string };
};

export const team: Member[] = [
  {
    colors: ["#ffb3c7", "#ff6f91"],
    ko: { name: "김조스", role: "Founder · Producer" },
    en: { name: "Jos Kim", role: "Founder · Producer" },
  },
  {
    colors: ["#8ef0c8", "#1e9e74"],
    ko: { name: "박서린", role: "Content Director · AI" },
    en: { name: "Seorin Park", role: "Content Director · AI" },
  },
  {
    colors: ["#b7a5ff", "#5b4bd6"],
    ko: { name: "이하늘", role: "Lead Engineer" },
    en: { name: "Haneul Lee", role: "Lead Engineer" },
  },
  {
    colors: ["#ffd9a0", "#e2643f"],
    ko: { name: "정우빈", role: "Mobile Engineer" },
    en: { name: "Woobin Jung", role: "Mobile Engineer" },
  },
];

export const socials = [
  { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "GitHub", href: "https://github.com/", icon: "github" },
] as const;
