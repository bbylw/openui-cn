import { useState } from "react";

type Props = {
  code: string;
  title?: string;
  /** 走轻量高亮：注释、关键字、字符串 */
  lang?: "bash" | "ts" | "text";
};

const TS_KEYWORDS =
  /\b(import|from|export|const|let|function|return|await|async|new|type|as|default|interface)\b/g;

function highlightTs(code: string) {
  return code.split("\n").map((line, lineIdx) => {
    const parts: { text: string; cls?: string }[] = [];
    let rest = line;

    const commentAt = rest.indexOf("//");
    let comment = "";
    if (commentAt >= 0) {
      comment = rest.slice(commentAt);
      rest = rest.slice(0, commentAt);
    }

    const segments = rest.split(/(\/\*[\s\S]*?\*\/|"[^"]*"|'[^']*')/g);
    for (const seg of segments) {
      if (seg.startsWith('"') || seg.startsWith("'")) {
        parts.push({ text: seg, cls: "str" });
      } else {
        const bits = seg.split(TS_KEYWORDS);
        for (const bit of bits) {
          if (TS_KEYWORDS.test(bit)) {
            TS_KEYWORDS.lastIndex = 0;
            parts.push({ text: bit, cls: "kw" });
          } else {
            parts.push({ text: bit });
          }
        }
        TS_KEYWORDS.lastIndex = 0;
      }
    }
    if (comment) parts.push({ text: comment, cls: "cm" });

    return (
      <span key={lineIdx}>
        {parts.map((p, i) =>
          p.cls ? (
            <span key={i} className={p.cls}>
              {p.text}
            </span>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
        {"\n"}
      </span>
    );
  });
}

export function CodeBlock({ code, title, lang = "bash" }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* 剪贴板不可用时静默 */
    }
  };

  return (
    <div className="code">
      {title === undefined ? null : (
        <div className="code__head">
          <b>{title}</b>
          <button type="button" className="code__copy" onClick={copy}>
            {copied ? "已复制" : "复制"}
          </button>
        </div>
      )}
      <pre className="code__body">
        {lang === "ts" ? highlightTs(code) : code}
      </pre>
    </div>
  );
}
