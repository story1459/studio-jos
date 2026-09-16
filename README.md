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
│   ├── (ko)/                 한국어 — 주소 /
│   │   ├── layout.tsx        <html lang="ko">
│   │   ├── page.tsx
│   │   └── opengraph-image.tsx
│   ├── (en)/                 영어 — 주소 /en
│   │   ├── layout.tsx        <html lang="en">
│   │   └── en/page.tsx, en/opengraph-image.tsx
│   ├── globals.css           전체 스타일 (토큰 → 컴포넌트 순)
│   └── icon.svg              파비콘 (BI 심볼로 자동 생성)
├── components/
│   ├── RootShell.tsx         두 언어가 공유하는 <html> 껍데기 · 메타데이터
│   ├── Page.tsx              섹션 조립 + 구조화 데이터(JSON-LD)
│   ├── Logo.tsx              워드마크 · BI 심볼 (마스크로 색 반전)
│   ├── Nav.tsx               상단 알약 네비 · 모바일 메뉴 · 언어 전환
│   ├── Hero.tsx              히어로 + 지표
│   ├── Works.tsx             OUR SERVICES — 운영 중인 서비스 캐러셀
│   ├── Areas.tsx             WHAT WE MAKE — 만드는 영역 4개
│   ├── CtaBand.tsx           라벤더 CTA 밴드 (합류 제안)
│   ├── Team.tsx              OUR TEAM
│   ├── Contact.tsx           문의 폼 · 소셜
│   ├── Footer.tsx            푸터
│   ├── OgImage.tsx           공유 미리보기 이미지 (언어별 자동 생성)
│   └── Reveal.tsx            스크롤 등장 애니메이션
├── data/site.ts              ★ 사이트에 들어가는 모든 내용 (한/영)
├── public/brand/             받은 로고 원본 SVG
└── 이미지.png                 참고한 시안
```

## 언어팩 (한국어 / 영어)

| 언어 | 주소 | `<html lang>` |
|---|---|---|
| 영어 (기본) | `/` | `en` |
| 한국어 | `/ko` | `ko` |

기본 언어를 바꾸려면 `data/site.ts` 의 `paths` 에서 루트(`/`)를 가져갈 언어를 바꾸고,
`app/(en)/page.tsx` 와 `app/(ko)/ko/page.tsx` 의 위치를 서로 맞바꾸면 됩니다.

- 전환 버튼은 상단 네비 오른쪽의 **EN / KO** 알약입니다. 모바일에서도 그대로 보입니다.
- 문구는 전부 `data/site.ts` 의 `t.ko` / `t.en` 에 있습니다. 한쪽만 고치면 다른 쪽은 그대로 남습니다.
- 작업물·팀·영역은 색과 이미지 경로를 한 번만 적고 글만 두 벌 둡니다 (`works`, `team`, `areas` 의 `ko` / `en` 필드).
- 두 언어가 서로를 `hreflang` 으로 가리키고, 각자 `canonical` 을 가집니다. 검색엔진이 두 벌을 중복으로 보지 않습니다.
- 섹션 대문자 제목(OUR SERVICES, WHAT WE MAKE, OUR TEAM)은 디자인 요소라 두 언어에서 동일하게 둡니다.

## 로고

받은 원본(`public/brand/`)은 **녹아웃** 구조입니다. 어두운 판을 채우고 글자를 파낸 형태라
다크 배경에 그대로 올리면 보이지 않습니다. `components/Logo.tsx` 에서 같은 패스를
마스크로 뒤집어, 글자 부분만 `currentColor` 로 칠합니다.

```tsx
<Wordmark id="nav" />      {/* STUDIO JOS 워드마크 — 네비, 푸터 */}
<SymbolMark id="cta" />    {/* BI 심볼 — CTA 밴드 가운데 */}
```

색은 놓이는 곳의 글자색을 따라갑니다. 네비·푸터에서는 흰색, 라벤더 CTA 밴드에서는
잉크색(`--ink`)으로 나옵니다. `id` 는 마스크 식별자로 쓰이니 한 페이지 안에서 겹치지 않게 주세요.

파비콘 `app/icon.svg` 는 BI 심볼을 어두운 라운드 사각형 위에 얹어 만든 것입니다.

### 헤엄치는 조스

`components/SwimmingLogo.tsx` — BI 심볼이 불쑥 나타나 화면을 가로질러 헤엄치고 사라집니다.
배경 장식이 아니라 **콘텐츠 앞**을 지나갑니다(네비보다는 아래).

등장할 때마다 값이 새로 뽑힙니다.

| 무엇 | 범위 |
|---|---|
| 등장 간격 | 4 – 10초 (`GAP`) |
| 세로 위치 | 화면 높이의 10 – 78% |
| 크기 | 화면 폭의 7 – 12%, 56 – 140px 로 제한 |
| 가로지르는 시간 | 4.5 – 7.5초 |
| 방향 | 좌→우 / 우→좌 |
| 진하기 | 0.6 – 0.9 |

몸을 좌우로 ±7° 틀며 위아래로 통통 튑니다(`shark-bob`, 1.05초).
크기를 바꾸려면 컴포넌트의 `w` 계산식을, 등장 빈도는 `GAP` 을,
움직임은 `app/globals.css` 의 `shark-bob` 을 고치면 됩니다.

`z-index: 50` 으로 콘텐츠 위·네비(100) 아래에 놓이고 `pointer-events: none` 이라
클릭을 가로채지 않습니다. `transform` 과 `opacity` 만 움직이고, 다 지나간 요소는 바로 지웁니다.
다른 탭을 보고 있는 동안에는 생성하지 않으며, 움직임 줄이기를 켠 사용자에게는 나오지 않습니다.

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
