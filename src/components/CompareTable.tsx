import { CAPABILITY_COMPARE } from "@/content/benchmarks";

function render(value: string) {
  if (value === "yes") return <span className="mark mark--yes">✓</span>;
  if (value === "no") return <span className="mark mark--no">✕</span>;
  if (value === "part") return <span className="mark mark--part">部分</span>;
  return <span>{value}</span>;
}

export function CompareTable() {
  return (
    <div className="tablewrap">
      <table className="dtable">
        <caption>能力对比 · 数据来自官方 OpenUI Lang 对比文档</caption>
        <thead>
          <tr>
            <th scope="col">特性</th>
            <th scope="col" className="col-accent">
              OpenUI
            </th>
            <th scope="col">json-render (Vercel)</th>
            <th scope="col">A2UI (Google)</th>
            <th scope="col">CopilotKit OpenGenUI</th>
          </tr>
        </thead>
        <tbody>
          {CAPABILITY_COMPARE.map((row) => (
            <tr key={row.feature}>
              <th scope="row" className="name" style={{ fontWeight: 400 }}>
                {row.feature}
              </th>
              <td className="col-accent">{render(row.openui)}</td>
              <td>{render(row.vercel)}</td>
              <td>{render(row.google)}</td>
              <td>{render(row.copilot)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
