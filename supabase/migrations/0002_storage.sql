-- 스튜디오 조스 — 이미지 업로드용 저장소
--
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 보안 요약
--   공개(anon)            : 읽기만
--   로그인(authenticated) : 올리기 · 바꾸기 · 지우기
--   회원가입이 막혀 있으므로 authenticated = 관리자 계정뿐입니다.

-- 'media' 버킷 (공개 읽기)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- ───────────────────────── 정책 ─────────────────────────

drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
