import type { ReactNode } from "react";

const TOKEN = /(@[A-Za-z]+|"(?:[^"\\]|\\.)*"|[A-Z][A-Za-z0-9]*(?=\())/g;

function tokenize(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  TOKEN.lastIndex = 0;
  let last = 0;
  let match: RegExpExecArray | null = TOKEN.exec(text);

  while (match) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const cls = token.startsWith("@")
      ? "tk-fn"
      : token.startsWith('"')
        ? "tk-str"
        : "tk-comp";
    nodes.push(
      <span key={`${keyPrefix}-${match.index}`} className={cls}>
        {token}
      </span>,
    );
    last = match.index + token.length;
    match = TOKEN.exec(text);
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderLine(text: string, key: number, tail: ReactNode) {
  const assign = /^(\s*)([A-Za-z_$][\w$]*)(\s*=\s*)([\s\S]*)$/.exec(text);
  if (!assign) {
    return (
      <span key={key}>
        {tokenize(text, `l${key}`)}
        {tail}
      </span>
    );
  }
  return (
    <span key={key}>
      {assign[1]}
      <span className="tk-id">{assign[2]}</span>
      {assign[3]}
      {tokenize(assign[4], `l${key}`)}
      {tail}
    </span>
  );
}

type Props = {
  code: string;
  className?: string;
  /** 在末行末尾显示闪烁光标 */
  caret?: boolean;
};

/** 极轻量着色：行首标识符、组件名、@ 内建函数、字符串。 */
export function LangCode({ code, className, caret = false }: Props) {
  const lines = code.split("\n");

  return (
    <pre className={`langstream${className ? ` ${className}` : ""}`}>
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        const tail = isLast ? (
          <>
            {caret ? <span className="caret" /> : null}
          </>
        ) : (
          "\n"
        );
        return renderLine(line, i, tail);
      })}
    </pre>
  );
}
