"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import {
  fetchAllVideos,
  parseYouTube,
  youtubeThumb,
  type VideoKind,
  type VideoRow,
} from "@/lib/content";

type Draft = Omit<VideoRow, "id"> & { id?: string };

const BLANK: Draft = {
  sort: 0,
  kind: "video",
  youtube_id: "",
  youtube_url: "",
  title_ko: "",
  title_en: "",
  desc_ko: "",
  desc_en: "",
  published: true,
};

const KIND_LABEL: Record<VideoKind, string> = {
  video: "영상 (가로 16:9)",
  short: "쇼츠 (세로 9:16)",
};

export default function VideosPanel({
  /** 지금 관리 중인 페이지 */
  kind: filter,
  onKind,
  onBack,
}: {
  kind: VideoKind;
  onKind: (kind: VideoKind) => void;
  onBack: () => void;
}) {
  const [rows, setRows] = useState<VideoRow[] | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  const load = useCallback(async () => {
    setRows(await fetchAllVideos());
  }, []);

  /* 첫 로딩 — setState 는 응답이 온 뒤에만 일어나도록 */
  useEffect(() => {
    let alive = true;
    fetchAllVideos().then((r) => {
      if (alive) setRows(r);
    });
    return () => {
      alive = false;
    };
  }, []);

  const say = (text: string, isErr = false) => {
    setMsg(text);
    setErr(isErr);
  };

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  /** 고른 종류만 보여줍니다 */
  const visible = (rows ?? []).filter((r) => (filter ? r.kind === filter : true));

  /** 주소를 붙여넣으면 영상 ID 와 종류를 자동으로 채웁니다 */
  const onUrlChange = (url: string) => {
    setDraft((d) => {
      if (!d) return d;
      const parsed = parseYouTube(url);
      return parsed
        ? { ...d, youtube_url: url, youtube_id: parsed.id, kind: parsed.kind }
        : { ...d, youtube_url: url, youtube_id: "" };
    });
  };

  const save = async () => {
    if (!draft) return;
    const supabase = getSupabase();
    if (!supabase) return;

    if (!draft.youtube_id) {
      say("유튜브 주소에서 영상을 찾지 못했습니다. 주소를 확인해 주세요.", true);
      return;
    }

    setBusy(true);
    const { id, ...fields } = draft;
    const { error } = id
      ? await supabase.from("videos").update(fields).eq("id", id)
      : await supabase.from("videos").insert(fields);
    setBusy(false);

    if (error) {
      say(error.message, true);
      return;
    }
    setDraft(null);
    say(id ? "수정했습니다." : "추가했습니다.");
    load();
  };

  const remove = async (row: VideoRow) => {
    if (!window.confirm(`"${row.title_ko || row.youtube_id}" 영상을 지울까요?`)) return;
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("videos").delete().eq("id", row.id);
    setBusy(false);
    if (error) {
      say(error.message, true);
      return;
    }
    say("삭제했습니다.");
    load();
  };

  const togglePublished = async (row: VideoRow) => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase
      .from("videos")
      .update({ published: !row.published })
      .eq("id", row.id);
    if (error) {
      say(error.message, true);
      return;
    }
    load();
  };

  return (
    <section className="pan">
      <button className="pan__back" onClick={onBack}>← 서비스 카드로</button>

      <div className="pan__head">
        <h2 className="pan__title">
          {filter === "short" ? "쇼츠 페이지" : "영상 페이지"}
        </h2>
        <div className="pan__headright">
          <div className="pan__langs" role="group" aria-label="페이지 고르기">
            <button className={`pan__lang${filter === "video" ? " is-on" : ""}`} onClick={() => onKind("video")}>영상</button>
            <button className={`pan__lang${filter === "short" ? " is-on" : ""}`} onClick={() => onKind("short")}>쇼츠</button>
          </div>
          <button
            className="btn btn--primary"
            onClick={() => {
              setDraft({
                ...BLANK,
                kind: filter ?? "video",
                sort: (rows?.length ?? 0) * 10 + 10,
              });
              say("");
            }}
          >
            + 영상 추가
          </button>
        </div>
      </div>
      <p className="pan__hint">
        유튜브 주소를 붙여넣으면 영상을 찾아 종류(영상/쇼츠)까지 자동으로 맞춥니다.
        각각 <code>/videos</code>, <code>/shorts</code> 페이지에 나옵니다.
      </p>

      {msg && <p className={`adm__msg${err ? " adm__msg--err" : " adm__msg--ok"}`}>{msg}</p>}

      {rows === null && <p className="pan__note">불러오는 중…</p>}
      {rows !== null && visible.length === 0 && (
        <p className="pan__note">
          {filter === "short"
            ? "쇼츠 페이지에 올라간 영상이 없습니다."
            : filter === "video"
              ? "영상 페이지에 올라간 영상이 없습니다."
              : "아직 영상이 없습니다."}
        </p>
      )}

      {visible.length > 0 && (
        <ul className="pan__list">
          {visible.map((r) => (
            <li className={`pan__row${r.published ? "" : " is-hidden"}`} key={r.id}>
              <span className="pan__thumb">
                <Image
                  src={youtubeThumb(r.youtube_id)}
                  alt=""
                  width={64}
                  height={36}
                  unoptimized
                />
              </span>
              <span className="pan__sort">{r.sort}</span>
              <span className="pan__main">
                <strong>{r.title_ko || r.title_en || r.youtube_id}</strong>
                <small>
                  {r.kind === "short" ? "쇼츠" : "영상"} · {r.youtube_id}
                  {r.published ? "" : " · 숨김"}
                </small>
              </span>
              <span className="pan__acts">
                <button className="pan__btn" onClick={() => togglePublished(r)} disabled={busy}>
                  {r.published ? "숨기기" : "보이기"}
                </button>
                <button className="pan__btn" onClick={() => { setDraft(r); say(""); }} disabled={busy}>
                  편집
                </button>
                <button className="pan__btn pan__btn--del" onClick={() => remove(r)} disabled={busy}>
                  삭제
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {draft && (
        <div className="adm__back" onMouseDown={(e) => { if (e.target === e.currentTarget) setDraft(null); }}>
          <div className="adm__modal adm__modal--wide" role="dialog" aria-modal="true" aria-label="영상 편집">
            <div className="adm__modal-head">
              <h3 className="adm__modal-title">{draft.id ? "영상 편집" : "영상 추가"}</h3>
              <button className="adm__close" aria-label="닫기" onClick={() => setDraft(null)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <label className="adm__label pan__wide">
              유튜브 주소
              <input
                className="adm__input"
                value={draft.youtube_url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=… 또는 /shorts/…"
                autoFocus
              />
            </label>

            {draft.youtube_id ? (
              <p className="pan__found">
                <Image src={youtubeThumb(draft.youtube_id)} alt="" width={80} height={45} unoptimized />
                <span>영상 ID <code>{draft.youtube_id}</code> 확인됨</span>
              </p>
            ) : (
              draft.youtube_url && <p className="adm__msg adm__msg--err">영상을 찾지 못했습니다.</p>
            )}

            <div className="pan__grid">
              <label className="adm__label">종류
                <select className="adm__input" value={draft.kind} onChange={(e) => set("kind", e.target.value as VideoKind)}>
                  {(Object.keys(KIND_LABEL) as VideoKind[]).map((k) => (
                    <option key={k} value={k}>{KIND_LABEL[k]}</option>
                  ))}
                </select>
              </label>
              <label className="adm__label">순서<input className="adm__input" type="number" value={draft.sort} onChange={(e) => set("sort", Number(e.target.value))} /></label>

              <label className="adm__label">제목 (한)<input className="adm__input" value={draft.title_ko} onChange={(e) => set("title_ko", e.target.value)} /></label>
              <label className="adm__label">제목 (영)<input className="adm__input" value={draft.title_en} onChange={(e) => set("title_en", e.target.value)} /></label>

              <label className="adm__label pan__wide">설명 (한)<textarea className="adm__input adm__input--area" value={draft.desc_ko} onChange={(e) => set("desc_ko", e.target.value)} rows={2} /></label>
              <label className="adm__label pan__wide">설명 (영)<textarea className="adm__input adm__input--area" value={draft.desc_en} onChange={(e) => set("desc_en", e.target.value)} rows={2} /></label>

              <label className="adm__label">공개
                <select className="adm__input" value={draft.published ? "y" : "n"} onChange={(e) => set("published", e.target.value === "y")}>
                  <option value="y">보이기</option>
                  <option value="n">숨기기</option>
                </select>
              </label>
            </div>

            <div className="pan__foot">
              <button className="btn btn--ghost" onClick={() => setDraft(null)} disabled={busy}>취소</button>
              <button className="btn btn--primary" onClick={save} disabled={busy}>{busy ? "저장 중…" : "저장"}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
