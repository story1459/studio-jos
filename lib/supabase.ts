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
