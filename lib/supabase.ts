import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 브라우저에서 쓰는 Supabase 클라이언트.
 *
 * 이 사이트는 정적 사이트라 서버가 없습니다. 인증은 브라우저가
 * Supabase 와 직접 주고받고, 실제 데이터 보호는 Supabase 쪽
 * RLS(행 수준 보안) 정책이 책임집니다.
 *
 * anon 키는 공개되는 값이 맞습니다(정적 번들에 박힙니다).
 * 이 키만으로는 RLS 를 통과하지 못하므로, 테이블을 만들 때
 * RLS 를 반드시 켜고 정책을 걸어야 합니다.
 */

/**
 * 관리자는 이메일이 아니라 아이디로 로그인합니다.
 *
 * Supabase 인증은 이메일만 받기 때문에, 아이디 뒤에 이 도메인을 붙여
 * 내부적으로 이메일처럼 다룹니다. 예) 아이디 "zero" → zero@admin.studiojos.kr
 *
 * 실제로 메일이 오가는 주소는 아니고, 계정을 식별하는 용도입니다.
 * Supabase 에서 계정을 만들 때도 이 형식으로 만들어야 합니다.
 */
export const ADMIN_ID_DOMAIN = "admin.studiojos.kr";

/** 입력한 아이디를 Supabase 가 쓰는 이메일 형태로 바꿉니다 */
export function toAuthEmail(id: string): string {
  const trimmed = id.trim();
  // 이미 이메일을 넣었다면 그대로 씁니다
  return trimmed.includes("@") ? trimmed : `${trimmed}@${ADMIN_ID_DOMAIN}`;
}

/** 화면에 보여줄 때는 뒤의 도메인을 떼어 아이디만 보여줍니다 */
export function toDisplayId(email: string | undefined): string {
  if (!email) return "";
  return email.endsWith(`@${ADMIN_ID_DOMAIN}`) ? email.split("@")[0] : email;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** 빌드 시점에 환경변수가 들어왔는지 */
export const isSupabaseConfigured = Boolean(url && anonKey);

let cached: SupabaseClient | null = null;

/** 설정이 없으면 null 을 돌려줍니다(화면에서 안내 문구를 띄웁니다) */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!cached) {
    cached = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return cached;
}
