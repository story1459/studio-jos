-- 스튜디오 조스 — 콘텐츠 테이블
--
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 보안 요약
--   공개(anon)      : published = true 인 행만 읽기
--   로그인(authenticated) : 전체 읽기·쓰기
--   회원가입이 막혀 있으므로 authenticated = 관리자 계정뿐입니다.

-- ───────────────────────── 서비스 카드 (OUR SERVICES) ─────────────────────────

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  sort        int  not null default 0,          -- 작을수록 앞
  kind_ko     text not null default '',         -- 카드 위 작은 글씨
  kind_en     text not null default '',
  title_ko    text not null default '',
  title_en    text not null default '',
  meta_ko     text not null default '',         -- 아래 알약 문구
  meta_en     text not null default '',
  color1      text not null default '#8fd4ff',  -- 썸네일 그라디언트
  color2      text not null default '#3f7dff',
  image_url   text,                             -- 넣으면 그라디언트 대신 이미지
  link_type   text not null default 'none'
              check (link_type in ('none', 'videos', 'shorts', 'url')),
  link_url    text,                             -- link_type = 'url' 일 때만
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ───────────────────────── 영상 콘텐츠 ─────────────────────────

create table if not exists public.videos (
  id          uuid primary key default gen_random_uuid(),
  sort        int  not null default 0,
  kind        text not null default 'video'
              check (kind in ('video', 'short')),  -- 일반 영상 / 쇼츠
  youtube_id  text not null,                       -- 11자리 영상 ID
  youtube_url text not null default '',            -- 입력한 원본 주소
  title_ko    text not null default '',
  title_en    text not null default '',
  desc_ko     text not null default '',
  desc_en     text not null default '',
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists videos_kind_sort_idx on public.videos (kind, sort);
create index if not exists services_sort_idx    on public.services (sort);

-- ───────────────────────── 접근 권한 ─────────────────────────
-- 프로젝트 생성 시 "Automatically expose new tables" 를 꺼두었으므로
-- 권한을 직접 부여합니다.

grant usage on schema public to anon, authenticated;

grant select on public.services to anon, authenticated;
grant select on public.videos   to anon, authenticated;

grant insert, update, delete on public.services to authenticated;
grant insert, update, delete on public.videos   to authenticated;

-- ───────────────────────── RLS ─────────────────────────

alter table public.services enable row level security;
alter table public.videos   enable row level security;

drop policy if exists "services read published" on public.services;
create policy "services read published"
  on public.services for select
  to anon
  using (published);

drop policy if exists "services admin read" on public.services;
create policy "services admin read"
  on public.services for select
  to authenticated
  using (true);

drop policy if exists "services admin write" on public.services;
create policy "services admin write"
  on public.services for all
  to authenticated
  using (true) with check (true);

drop policy if exists "videos read published" on public.videos;
create policy "videos read published"
  on public.videos for select
  to anon
  using (published);

drop policy if exists "videos admin read" on public.videos;
create policy "videos admin read"
  on public.videos for select
  to authenticated
  using (true);

drop policy if exists "videos admin write" on public.videos;
create policy "videos admin write"
  on public.videos for all
  to authenticated
  using (true) with check (true);

-- ───────────────────────── 초기 데이터 ─────────────────────────
-- 지금 사이트에 들어 있는 카드 6개를 그대로 옮깁니다.
-- 이미 행이 있으면 건너뜁니다.

insert into public.services
  (sort, kind_ko, kind_en, title_ko, title_en, meta_ko, meta_en, color1, color2, link_type)
select * from (values
  (10, '유튜브 · AI 콘텐츠', 'YouTube · AI Content',
       '조스 AI — 1분 지식 숏폼', 'JOS AI — 1-Minute Knowledge Shorts',
       '운영 중 · 구독자 8.2만', 'Live · 82K subscribers',
       '#ff6b6b', '#c0265a', 'shorts'),
  (20, '유튜브 · AI 콘텐츠', 'YouTube · AI Content',
       '사운드랩 — AI 음악 채널', 'SoundLab — AI Music Channel',
       '운영 중 · 구독자 3.1만', 'Live · 31K subscribers',
       '#ff9a3c', '#ff5f6d', 'videos'),
  (30, 'AI 서비스', 'AI Service',
       '컷봇 — 영상 자동 편집 도구', 'CutBot — Automatic Video Editor',
       '베타 운영 중', 'In beta',
       '#e3b8ff', '#8f6bff', 'none'),
  (40, '모바일', 'Mobile',
       '핀 — 자산 기록 앱', 'Pin — Personal Finance Tracker',
       '운영 중 · MAU 3.4만', 'Live · 34K MAU',
       '#8fd4ff', '#3f7dff', 'none'),
  (50, '모바일', 'Mobile',
       '온도 — 동네 취향 지도', 'Ondo — Neighbourhood Taste Map',
       '운영 중 · MAU 8천', 'Live · 8K MAU',
       '#a7f3c5', '#22b07d', 'none'),
  (60, '플랫폼', 'Platform',
       '모아 — 소상공인 예약 플랫폼', 'Moa — Booking for Local Shops',
       '운영 중 · 매장 480곳', 'Live · 480 stores',
       '#ffd76e', '#f4813f', 'none')
) as seed
where not exists (select 1 from public.services);
