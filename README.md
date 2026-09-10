# 스튜디오 조스 — studiojos.kr

유튜브 AI 콘텐츠부터 모바일 서비스, 플랫폼까지 다양한 서비스를 직접 만들고 운영하는
**프로젝트 스튜디오**의 원페이지 사이트입니다.
외주 개발사가 아니라 자기 서비스를 만들어 굴리는 회사라는 점, 그리고
콘텐츠에서 플랫폼까지 폭이 넓다는 점이 문구 전반의 기준입니다.

참고 시안(NFT 마켓플레이스 랜딩)의 구조와 다크 + 글로우 톤을 가져왔고,
**Next.js 16 (App Router) + TypeScript**, 스타일은 손으로 쓴 CSS 한 장입니다.

## 실행

```bash
npm install     # 최초 1회
npm run dev     # http://localhost:3000
npm run build   # 배포용 빌드
npm start       # 빌드 결과 실행
npx eslint .    # 린트
```

## 구조

```
.
├── app/
│   ├── layout.tsx            메타데이터·폰트·전역 설정
│   ├── page.tsx              섹션 조립 + 구조화 데이터(JSON-LD)
│   ├── globals.css           전체 스타일 (토큰 → 컴포넌트 순)
│   ├── icon.svg              파비콘
│   └── opengraph-image.tsx   공유 미리보기 이미지 (자동 생성)
├── components/
│   ├── Nav.tsx               상단 알약 네비 · 모바일 메뉴 · 현재 섹션 표시
│   ├── Hero.tsx              히어로 + 지표
│   ├── Works.tsx             OUR SERVICES — 운영 중인 서비스 캐러셀
│   ├── Areas.tsx             WHAT WE MAKE — 만드는 영역 4개
│   ├── CtaBand.tsx           라벤더 CTA 밴드 (합류 제안)
│   ├── Team.tsx              OUR TEAM
│   ├── Contact.tsx           문의 폼 · 소셜
│   ├── Footer.tsx            푸터
│   └── Reveal.tsx            스크롤 등장 애니메이션
├── data/site.ts              ★ 사이트에 들어가는 모든 내용
└── 이미지.png                 참고한 시안
```

## 시안 → 이 사이트 대응표

| 시안 섹션 | 이 사이트 |
|---|---|
| 상단 알약 네비 + Connect | 그대로 (`문의하기` 버튼) |
| DISCOVER RARE ART 히어로 | `콘텐츠부터 플랫폼까지 직접 만듭니다` + 지표 3개 |
| OUR COLLECTION 캐러셀 | **OUR SERVICES** — 유튜브 채널 → AI 도구 → 앱 → 플랫폼 순 |
| — | **WHAT WE MAKE** (시안엔 없지만 추가한 영역 섹션: AI 영상 콘텐츠 / AI 서비스 / 모바일 / 플랫폼) |
| JOIN OUR COMMUNITY 라벤더 밴드 | **같이 만들 사람을 찾습니다** — 합류 CTA |
| OUR ARTISTS 그리드 | **OUR TEAM** |
| 뉴스레터 + 소셜 | 문의 폼 + 소셜 |

작업 사례를 기간(`12주`)으로 보여주던 외주사 문법을 걷어내고,
운영 상태와 지표(`운영 중 · MAU 3.4만`)로 바꿨습니다.

## 내용 고치기 — `data/site.ts` 한 파일

지금 들어있는 글과 숫자는 전부 예시입니다. 화면 코드를 건드릴 필요 없이 이 파일만 고치면 됩니다.

| 바꿀 것 | 위치 |
|---|---|
| 회사명·이메일·전화·주소·사업자번호 | `site` |
| 메뉴 항목 | `nav` |
| 히어로 문구, 지표 숫자 (12개 / 30만 / 4개) | `hero` |
| 운영 중인 서비스·채널 (개수 자유) | `works` |
| 만드는 영역 4개 | `areas` |
| 팀 멤버 | `team` |
| 합류 CTA 문구 | `cta` |
| 소셜 링크 | `socials` |

## 이미지 넣기

지금은 사진 없이 그라디언트와 CSS 도형으로 채워둔 상태라, 이미지가 없어도 화면이 깨지지 않습니다.
실제 이미지가 생기면 `public/` 에 넣고 `data/site.ts` 에 경로만 적으면 `next/image` 가 알아서 최적화합니다.

```ts
// public/works/jos-ai.jpg 를 넣었다면
{
  kind: "유튜브 · AI 콘텐츠",
  title: "조스 AI — 1분 지식 숏폼",
  meta: "운영 중 · 구독자 8.2만",
  image: "/works/jos-ai.jpg",               // ← 이 줄만 추가
  colors: ["#ff6b6b", "#c0265a"],
  href: "https://youtube.com/@채널아이디",  // 채널·서비스 주소가 있으면 카드 전체가 링크가 됩니다
}
```

- 서비스 카드: **세로 3:4** (예: 900×1200)
- 팀 사진: **정사각형** (예: 800×800)
- 히어로 비주얼을 실제 이미지로 바꾸려면 `components/Hero.tsx` 의 `.hero__art` 블록을 `<Image>` 로 교체

파비콘은 `app/icon.svg`, 공유 미리보기는 `app/opengraph-image.tsx` 가 자동으로 만듭니다.
직접 만든 이미지를 쓰려면 각각 `app/icon.png`, `app/opengraph-image.png` 로 바꿔 넣으면 됩니다.

## 문의 폼

백엔드가 아직 없어서 **메일 앱을 여는 방식**(`mailto:`)입니다.
받은 편지함으로 바로 꽂히게 하려면 `components/Contact.tsx` 의 `onSubmit` 안에서
`window.location.href = mailto…` 부분을 서버 액션이나 API 호출로 바꾸면 됩니다.
Resend·Formspree·Web3Forms 중 아무거나 붙이면 10분이면 됩니다.

## 디자인 토큰

`app/globals.css` 최상단 `:root` 에 모여 있습니다.

| 용도 | 값 |
|---|---|
| 배경 | `#0b0b0f` |
| 카드/패널 면 | `#17171e`, `#1e1e27` |
| 포인트(블루) | `#2f9bf5` |
| 보조 포인트(바이올렛) | `#7c5cff` |
| CTA 밴드 라벤더 | `#c3c0e6` → `#dfe2ea` |
| CTA 버튼/글자 | `#3a3960` |
| 보조 텍스트 | `#9a9aa9`, `#6e6e7e` |
| 구분선 | `rgba(255,255,255,.08)` |

서체는 대문자 헤드라인에 **Poppins 800**(`next/font` 로 자체 호스팅), 한글 본문에 **Pretendard** 입니다.

## 확인한 것

- 390 / 768 / 1440px 에서 가로 스크롤 없음 (`scrollWidth === clientWidth`)
- 모바일 메뉴, 캐러셀(화살표·드래그·스와이프·키보드), 문의 폼 검증 동작
- `prefers-reduced-motion` 존중, 키보드 포커스 링, 본문 바로가기
- JS 가 꺼져도 모든 내용이 보임 (`<noscript>` 가 등장 애니메이션만 걷어냄)
- `next build` · `eslint` 통과, 하이드레이션 경고 0건, 의존성 취약점 0건

## 배포 — Netlify

[netlify.toml](netlify.toml) 에 빌드 설정이 들어 있습니다.
Next.js 런타임은 Netlify 가 자동으로 붙이므로 플러그인은 일부러 선언하지 않았습니다
(직접 적으면 버전이 고정돼 오히려 꼬입니다).

1. https://app.netlify.com/start
2. GitHub → `story1459/studio-jos` 선택
3. 빌드 설정은 `netlify.toml` 을 읽어 자동으로 채워집니다. 그대로 Deploy

보안 헤더는 `next.config.ts` 에 있습니다.
