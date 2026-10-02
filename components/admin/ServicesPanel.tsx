"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import {
  fetchAllServices,
  uploadImage,
  type LinkType,
  type ServiceRow,
  type VideoKind,
} from "@/lib/content";

type Draft = Omit<ServiceRow, "id"> & { id?: string };

const BLANK: Draft = {
  sort: 0,
  kind_ko: "",
  kind_en: "",
  title_ko: "",
  title_en: "",
  meta_ko: "",
  meta_en: "",
  color1: "#8fd4ff",
  color2: "#3f7dff",
  image_url: null,
  link_type: "none",
  link_url: null,
  published: true,
};

const LINK_LABEL: Record<LinkType, string> = {
  none: "링크 없음",
  videos: "영상 페이지 (/videos)",
  shorts: "쇼츠 페이지 (/shorts)",
  url: "직접 주소 입력",
};

const LINK_SHORT: Record<LinkType, string> = {
  none: "",
  videos: "→ 영상",
  shorts: "→ 쇼츠",
  url: "→ 외부",
};

export default function ServicesPanel({
  /** 영상/쇼츠 페이지로 연결된 카드에서 "상세 페이지 설정"을 눌렀을 때 */
  onManage,
}: {
  onManage: (kind: VideoKind) => void;
}) {
  const [rows, setRows] = useState<ServiceRow[] | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [preview, setPreview] = useState<"ko" | "en">("ko");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setRows(await fetchAllServices());
  }, []);

  /* 첫 로딩 — setState 는 응답이 온 뒤에만 */
  useEffect(() => {
    let alive = true;
    fetchAllServices().then((r) => {
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

  const onPickFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    say("");
    const res = await uploadImage(file);
    setUploading(false);
    if ("error" in res) {
      say(res.error, true);
      return;
    }
    set("image_url", res.url);
  };

  const save = async () => {
    if (!draft) return;
    const supabase = getSupabase();
    if (!supabase) return;

    if (!draft.title_ko.trim() && !draft.title_en.trim()) {
      say("제목을 한 쪽이라도 입력해 주세요.", true);
      return;
    }

    setBusy(true);
    const { id, ...fields } = draft;
    const payload = {
      ...fields,
      image_url: fields.image_url?.trim() || null,
      link_url: fields.link_type === "url" ? fields.link_url?.trim() || null : null,
    };

    const { error } = id
      ? await supabase.from("services").update(payload).eq("id", id)
      : await supabase.from("services").insert(payload);
    setBusy(false);

    if (error) {
      say(error.message, true);
      return;
    }
    setDraft(null);
    say(id ? "수정했습니다." : "추가했습니다.");
    load();
  };

  const remove = async (row: ServiceRow) => {
    if (!window.confirm(`"${row.title_ko || row.title_en}" 카드를 지울까요?`)) return;
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("services").delete().eq("id", row.id);
    setBusy(false);
    if (error) {
      say(error.message, true);
      return;
    }
    say("삭제했습니다.");
    load();
  };

  const togglePublished = async (row: ServiceRow) => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase
      .from("services")
      .update({ published: !row.published })
      .eq("id", row.id);
    if (error) {
      say(error.message, true);
      return;
    }
    load();
  };

  const pick = (ko: string, en: string) => (preview === "ko" ? ko || en : en || ko);

  return (
    <section className="pan">
      <div className="pan__head">
        <h2 className="pan__title">서비스 카드</h2>
        <div className="pan__headright">
          <div className="pan__langs" role="group" aria-label="미리보기 언어">
            {(["ko", "en"] as const).map((l) => (
              <button
                key={l}
                className={`pan__lang${preview === l ? " is-on" : ""}`}
                onClick={() => setPreview(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="btn btn--primary"
            onClick={() => {
              setDraft({ ...BLANK, sort: (rows?.length ?? 0) * 10 + 10 });
              say("");
            }}
          >
            + 카드 추가
          </button>
        </div>
      </div>
      <p className="pan__hint">
        홈의 OUR SERVICES 영역에 실제로 나오는 모습입니다. 순서는 숫자가 작을수록 앞입니다.
      </p>

      {msg && <p className={`adm__msg${err ? " adm__msg--err" : " adm__msg--ok"}`}>{msg}</p>}

      {rows === null && <p className="pan__note">불러오는 중…</p>}
      {rows?.length === 0 && <p className="pan__note">아직 카드가 없습니다.</p>}

      {!!rows?.length && (
        <ul className="svcgrid">
          {rows.map((r) => (
            <li className={`svcgrid__item${r.published ? "" : " is-hidden"}`} key={r.id}>
              {/* 사이트에 나오는 카드 그대로 */}
              <div className="card svcgrid__card">
                <div
                  className="card__thumb"
                  style={{ "--c1": r.color1, "--c2": r.color2 } as React.CSSProperties}
                >
                  {r.image_url && (
                    <Image
                      src={r.image_url}
                      alt=""
                      fill
                      sizes="240px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  )}
                </div>
                <div className="card__body">
                  <span className="card__kind">{pick(r.kind_ko, r.kind_en)}</span>
                  <h3 className="card__title">
                    {pick(r.title_ko, r.title_en) || "(제목 없음)"}
                  </h3>
                </div>
                <span className="card__pill">{pick(r.meta_ko, r.meta_en)}</span>

                {!r.published && <span className="svcgrid__badge">숨김</span>}
                {r.link_type !== "none" && (
                  <span className="svcgrid__link">{LINK_SHORT[r.link_type]}</span>
                )}
              </div>

              {/* 영상·쇼츠 페이지로 연결된 카드는 그 페이지의 콘텐츠를 바로 관리 */}
              {(r.link_type === "videos" || r.link_type === "shorts") && (
                <button
                  className="svcgrid__go"
                  onClick={() => onManage(r.link_type === "shorts" ? "short" : "video")}
                  disabled={busy}
                >
                  상세 페이지 설정
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              <div className="svcgrid__bar">
                <span className="svcgrid__sort">#{r.sort}</span>
                <button className="pan__btn" onClick={() => togglePublished(r)} disabled={busy}>
                  {r.published ? "숨기기" : "보이기"}
                </button>
                <button
                  className="pan__btn"
                  onClick={() => {
                    setDraft(r);
                    say("");
                  }}
                  disabled={busy}
                >
                  편집
                </button>
                <button className="pan__btn pan__btn--del" onClick={() => remove(r)} disabled={busy}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {draft && (
        <div
          className="adm__back"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDraft(null);
          }}
        >
          <div
            className="adm__modal adm__modal--wide"
            role="dialog"
            aria-modal="true"
            aria-label="카드 편집"
          >
            <div className="adm__modal-head">
              <h3 className="adm__modal-title">{draft.id ? "카드 편집" : "카드 추가"}</h3>
              <button className="adm__close" aria-label="닫기" onClick={() => setDraft(null)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* 썸네일 — 업로드 */}
            <div className="upl">
              <div
                className="upl__preview card__thumb"
                style={{ "--c1": draft.color1, "--c2": draft.color2 } as React.CSSProperties}
              >
                {draft.image_url && (
                  <Image
                    src={draft.image_url}
                    alt=""
                    fill
                    sizes="140px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                )}
              </div>

              <div className="upl__side">
                <p className="upl__label">썸네일 이미지</p>
                <p className="upl__hint">
                  비우면 아래 두 색의 그라디언트가 깔립니다. 세로 3:4, 5MB 이하.
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => onPickFile(e.target.files?.[0])}
                />
                <div className="upl__acts">
                  <button
                    className="btn btn--ghost"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading || busy}
                  >
                    {uploading ? "올리는 중…" : draft.image_url ? "이미지 바꾸기" : "이미지 올리기"}
                  </button>
                  {draft.image_url && (
                    <button
                      className="pan__btn pan__btn--del"
                      onClick={() => set("image_url", null)}
                      disabled={uploading || busy}
                    >
                      빼기
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pan__grid">
              <label className="adm__label">순서<input className="adm__input" type="number" value={draft.sort} onChange={(e) => set("sort", Number(e.target.value))} /></label>
              <label className="adm__label">공개
                <select className="adm__input" value={draft.published ? "y" : "n"} onChange={(e) => set("published", e.target.value === "y")}>
                  <option value="y">보이기</option>
                  <option value="n">숨기기</option>
                </select>
              </label>

              <label className="adm__label">분류 (한)<input className="adm__input" value={draft.kind_ko} onChange={(e) => set("kind_ko", e.target.value)} placeholder="유튜브 · AI 콘텐츠" /></label>
              <label className="adm__label">분류 (영)<input className="adm__input" value={draft.kind_en} onChange={(e) => set("kind_en", e.target.value)} placeholder="YouTube · AI Content" /></label>

              <label className="adm__label">제목 (한)<input className="adm__input" value={draft.title_ko} onChange={(e) => set("title_ko", e.target.value)} /></label>
              <label className="adm__label">제목 (영)<input className="adm__input" value={draft.title_en} onChange={(e) => set("title_en", e.target.value)} /></label>

              <label className="adm__label">아래 문구 (한)<input className="adm__input" value={draft.meta_ko} onChange={(e) => set("meta_ko", e.target.value)} placeholder="운영 중 · 구독자 8.2만" /></label>
              <label className="adm__label">아래 문구 (영)<input className="adm__input" value={draft.meta_en} onChange={(e) => set("meta_en", e.target.value)} placeholder="Live · 82K subscribers" /></label>

              <label className="adm__label">색 1<input className="adm__input adm__input--color" type="color" value={draft.color1} onChange={(e) => set("color1", e.target.value)} /></label>
              <label className="adm__label">색 2<input className="adm__input adm__input--color" type="color" value={draft.color2} onChange={(e) => set("color2", e.target.value)} /></label>

              <label className="adm__label">클릭 시 이동
                <select className="adm__input" value={draft.link_type} onChange={(e) => set("link_type", e.target.value as LinkType)}>
                  {(Object.keys(LINK_LABEL) as LinkType[]).map((k) => (
                    <option key={k} value={k}>{LINK_LABEL[k]}</option>
                  ))}
                </select>
              </label>
              {draft.link_type === "url" && (
                <label className="adm__label">주소<input className="adm__input" value={draft.link_url ?? ""} onChange={(e) => set("link_url", e.target.value)} placeholder="https://…" /></label>
              )}
            </div>

            <div className="pan__foot">
              <button className="btn btn--ghost" onClick={() => setDraft(null)} disabled={busy || uploading}>취소</button>
              <button className="btn btn--primary" onClick={save} disabled={busy || uploading}>{busy ? "저장 중…" : "저장"}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
