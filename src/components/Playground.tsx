import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { LangDemo } from "@/components/LangDemo";
import { SAMPLES } from "@/content/lang";

export function Playground() {
  const [activeId, setActiveId] = useState(SAMPLES[0].id);
  const [runKey, setRunKey] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const sample = SAMPLES.find((s) => s.id === activeId) ?? SAMPLES[0];
  const lineCount = sample.code.split("\n").length;

  const select = (index: number, moveFocus = false) => {
    const next = SAMPLES[index];
    if (!next) return;
    setActiveId(next.id);
    setRunKey((k) => k + 1);
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = SAMPLES.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <div>
      <div className="pg__tabs" role="tablist" aria-label="OpenUI Lang 示例">
        {SAMPLES.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`pg-tab-${item.id}`}
            aria-selected={item.id === activeId}
            aria-controls="pg-panel"
            tabIndex={item.id === activeId ? 0 : -1}
            className="pg__tab"
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="pg-panel" aria-labelledby={`pg-tab-${sample.id}`}>
        <LangDemo
          key={sample.id}
          code={sample.code}
          runKey={runKey}
          label={
            <>
              示例 · <b>{sample.scenario}</b>
            </>
          }
          footer={
            <>
              <div className="pg__meta">
                <span>
                  场景 <b>{sample.scenario}</b>
                </span>
                <span>
                  语句 <b>{lineCount}</b> 行
                </span>
                <span>
                  Lang 字符 <b>{sample.code.length}</b>
                </span>
                <span className="spacer">官方基准 token · tiktoken（GPT-5 编码器）</span>
              </div>

              {sample.official ? (
                <div className="tokbars">
                  {[
                    { k: "Vercel JSON-Render", v: sample.official.vercel },
                    { k: "Thesys C1 JSON", v: sample.official.c1 },
                    { k: "OpenUI Lang", v: sample.official.lang, accent: true },
                  ].map((row) => (
                    <div className="tokbar" key={row.k}>
                      <span className="tokbar__k">{row.k}</span>
                      <span className="bars__track">
                        <span
                          className={`bars__fill${row.accent ? " bars__fill--accent" : ""}`}
                          style={{ width: `${(row.v / sample.official!.vercel) * 100}%` }}
                        />
                      </span>
                      <span className="tokbar__v">{row.v}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pg__meta">
                  <span>本示例对应的官方基准见「基准与对比」页</span>
                </div>
              )}
            </>
          }
        />
      </div>

      <p
        className="pg__note"
        style={{ marginTop: 14, color: "var(--oc-fg-2)", fontSize: "0.92rem" }}
      >
        {sample.note}
      </p>
    </div>
  );
}
