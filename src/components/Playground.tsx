import { useState } from "react";
import { LangDemo } from "@/components/LangDemo";
import { SAMPLES } from "@/content/lang";

export function Playground() {
  const [activeId, setActiveId] = useState(SAMPLES[0].id);
  const [runKey, setRunKey] = useState(0);

  const sample = SAMPLES.find((s) => s.id === activeId) ?? SAMPLES[0];
  const lineCount = sample.code.split("\n").length;

  return (
    <div>
      <div className="pg__tabs" role="tablist" aria-label="OpenUI Lang 示例">
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === activeId}
            className="pg__tab"
            onClick={() => {
              setActiveId(s.id);
              setRunKey((k) => k + 1);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <LangDemo
        key={sample.id}
        code={sample.code}
        runKey={runKey}
        label={<>示例 · <b>{sample.scenario}</b></>}
        footer={
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
            {sample.official ? (
              <span>
                官方基准 token · Vercel <b>{sample.official.vercel}</b> · C1{" "}
                <b>{sample.official.c1}</b> · OpenUI Lang{" "}
                <b className="accent">{sample.official.lang}</b>
              </span>
            ) : (
              <span>官方基准见「基准与对比」页</span>
            )}
          </div>
        }
      />

      <p className="pg__note" style={{ marginTop: 14, color: "var(--oc-fg-2)", fontSize: "0.92rem" }}>
        {sample.note}
      </p>
    </div>
  );
}
