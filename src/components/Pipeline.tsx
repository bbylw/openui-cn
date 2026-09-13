import { PIPELINE } from "@/content/home";

export function Pipeline() {
  return (
    <div className="pipeline">
      {PIPELINE.map((node, i) => (
        <div className="pnode" key={node.title}>
          <div className="pnode__idx">{String(i + 1).padStart(2, "0")}</div>
          <div className="pnode__title">{node.title}</div>
          <div className="pnode__note">{node.note}</div>
          <span
            className="pnode__wire"
            style={{ animationDelay: `${i * 0.42}s` }}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
