"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  getSupabase,
  isSupabaseConfigured,
  toAuthEmail,
  toDisplayId,
} from "@/lib/supabase";
import { Wordmark } from "@/components/Logo";

type Phase = "loading" | "out" | "in";

/** Supabase 가 돌려주는 영어 오류를 사람이 읽을 말로 */
function readableError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "아이디 또는 비밀번호가 맞지 않습니다.";
  if (m.includes("email not confirmed")) return "이메일 인증이 아직 끝나지 않은 계정입니다.";
  if (m.includes("too many requests") || m.includes("rate limit"))
    return "시도가 너무 잦습니다. 잠시 후 다시 해주세요.";
  if (m.includes("failed to fetch") || m.includes("network"))
    return "서버에 연결하지 못했습니다. 네트워크를 확인해 주세요.";
  return message;
}

export default function AdminGate() {
  // 설정이 없으면 확인할 것도 없으므로 처음부터 로그아웃 상태로 둡니다
  const [phase, setPhase] = useState<Phase>(isSupabaseConfigured ? "loading" : "out");
  const [session, setSession] = useState<Session | null>(null);

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  /* 비밀번호 변경 */
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);

  /* 현재 로그인 상태 확인 + 이후 변화 구독 */
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setPhase(data.session ? "in" : "out");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setPhase(next ? "in" : "out");
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      const supabase = getSupabase();
      if (!supabase) {
        setError("Supabase 설정이 없습니다. 환경변수를 넣고 다시 빌드해 주세요.");
        return;
      }

      const id = adminId.trim();
      if (!id || !password) {
        setError("아이디와 비밀번호를 모두 입력해 주세요.");
        return;
      }

      setBusy(true);
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: toAuthEmail(id),
        password,
      });
      setBusy(false);

      if (authError) {
        setError(readableError(authError.message));
        return;
      }
      setPassword("");
    },
    [adminId, password],
  );

  const changePassword = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPwMsg("");
      setPwErr(false);

      const supabase = getSupabase();
      if (!supabase) return;

      if (newPw.length < 8) {
        setPwErr(true);
        setPwMsg("비밀번호는 8자 이상으로 정해주세요.");
        return;
      }
      if (newPw !== newPw2) {
        setPwErr(true);
        setPwMsg("두 번 입력한 비밀번호가 서로 다릅니다.");
        return;
      }

      setPwBusy(true);
      const { error: upErr } = await supabase.auth.updateUser({ password: newPw });
      setPwBusy(false);

      if (upErr) {
        setPwErr(true);
        setPwMsg(readableError(upErr.message));
        return;
      }
      setNewPw("");
      setNewPw2("");
      setPwMsg("비밀번호를 바꿨습니다.");
    },
    [newPw, newPw2],
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
  }, []);

  /* ── 설정 누락 안내 ── */
  if (!isSupabaseConfigured) {
    return (
      <main className="adm">
        <div className="adm__card">
          <Wordmark id="admin-setup" className="adm__logo" />
          <h1 className="adm__title">관리자</h1>
          <p className="adm__msg adm__msg--warn">
            Supabase 환경변수가 설정되지 않았습니다.
            <br />
            <code>.env.local</code> 에 아래 두 값을 넣고 다시 빌드해 주세요.
          </p>
          <pre className="adm__pre">
            NEXT_PUBLIC_SUPABASE_URL=...{"\n"}NEXT_PUBLIC_SUPABASE_ANON_KEY=...
          </pre>
        </div>
      </main>
    );
  }

  /* ── 확인 중 ── */
  if (phase === "loading") {
    return (
      <main className="adm">
        <div className="adm__card">
          <p className="adm__msg">확인 중…</p>
        </div>
      </main>
    );
  }

  /* ── 로그인 완료 ── */
  if (phase === "in" && session) {
    return (
      <main className="adm adm--wide">
        <header className="adm__bar">
          <Link href="/" className="adm__home" aria-label="사이트로 이동">
            <Wordmark id="admin-bar" className="adm__logo adm__logo--sm" />
          </Link>
          <div className="adm__who">
            <span>{toDisplayId(session.user.email)}</span>
            <button className="btn btn--ghost" onClick={signOut} disabled={busy}>
              로그아웃
            </button>
          </div>
        </header>

        <div className="adm__body">
          <h1 className="adm__title">관리자</h1>
          <p className="adm__msg">
            로그인되었습니다. 관리 기능은 아직 붙이지 않았습니다 — 무엇부터 만들지
            정해지면 이 화면에 추가합니다.
          </p>

          <ul className="adm__todo">
            <li>사이트 문구 수정 (지금은 <code>data/site.ts</code> 파일)</li>
            <li>서비스 · 팀 목록 관리</li>
            <li>문의 내역 확인</li>
            <li>이미지 업로드</li>
          </ul>

          <section className="adm__section">
            <h2 className="adm__h2">비밀번호 변경</h2>
            <p className="adm__msg">
              임시 비밀번호를 쓰고 있다면 지금 바꿔주세요.
            </p>

            <form className="adm__pwform" onSubmit={changePassword}>
              <label className="adm__label" htmlFor="adm-newpw">
                새 비밀번호 (8자 이상)
              </label>
              <input
                id="adm-newpw"
                className="adm__input"
                type="password"
                autoComplete="new-password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                disabled={pwBusy}
                required
              />

              <label className="adm__label" htmlFor="adm-newpw2">
                새 비밀번호 확인
              </label>
              <input
                id="adm-newpw2"
                className="adm__input"
                type="password"
                autoComplete="new-password"
                value={newPw2}
                onChange={(e) => setNewPw2(e.target.value)}
                disabled={pwBusy}
                required
              />

              <p
                className={`adm__msg${pwErr ? " adm__msg--err" : " adm__msg--ok"}`}
                role="status"
                aria-live="polite"
              >
                {pwMsg}
              </p>

              <button className="btn btn--primary" type="submit" disabled={pwBusy}>
                {pwBusy ? "바꾸는 중…" : "비밀번호 바꾸기"}
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  /* ── 로그인 화면 ── */
  return (
    <main className="adm">
      <form className="adm__card" onSubmit={onSubmit}>
        <Link href="/" aria-label="사이트로 이동">
          <Wordmark id="admin-login" className="adm__logo" />
        </Link>
        <h1 className="adm__title">관리자 로그인</h1>

        <label className="adm__label" htmlFor="adm-id">
          아이디
        </label>
        <input
          id="adm-id"
          className="adm__input"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="관리자 아이디"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          disabled={busy}
          required
        />

        <label className="adm__label" htmlFor="adm-pw">
          비밀번호
        </label>
        <input
          id="adm-pw"
          className="adm__input"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={busy}
          required
        />

        <p className="adm__msg adm__msg--err" role="alert" aria-live="polite">
          {error}
        </p>

        <button className="btn btn--primary adm__submit" type="submit" disabled={busy}>
          {busy ? "확인 중…" : "로그인"}
        </button>
      </form>
    </main>
  );
}
