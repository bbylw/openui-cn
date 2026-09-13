import { BENCH_ROWS, BENCH_TOTAL, VS_C1, VS_VERCEL, VS_VERCEL_MAX } from "@/content/benchmarks";

const fmt = (n: number) => n.toLocaleString("en-US");
const pct = (from: number, to: number) => `−${(((from - to) / from) * 100).toFixed(1)}%`;

export function BenchTable() {
  return (
    <div className="tablewrap">
      <table className="dtable">
        <caption>Token 效率基准 · tiktoken（GPT-5 编码器）</caption>
        <thead>
          <tr>
            <th scope="col">场景</th>
            <th scope="col" className="num">
              Vercel JSON-Render
            </th>
            <th scope="col" className="num">
              Thesys C1 JSON
            </th>
            <th scope="col" className="num col-accent">
              OpenUI Lang
            </th>
            <th scope="col" className="num">
              对比 Vercel
            </th>
            <th scope="col" className="num">
              对比 C1
            </th>
          </tr>
        </thead>
        <tbody>
          {BENCH_ROWS.map((row) => (
            <tr key={row.scenario}>
              <th scope="row" className="name" style={{ fontWeight: 400 }}>
                {row.scenario}
              </th>
              <td className="num">{fmt(row.vercel)}</td>
              <td className="num">{fmt(row.c1)}</td>
              <td className="num col-accent">{fmt(row.lang)}</td>
              <td className="num delta">{pct(row.vercel, row.lang)}</td>
              <td className="num delta">{pct(row.c1, row.lang)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="is-total">
            <td>总计</td>
            <td className="num">{fmt(BENCH_TOTAL.vercel)}</td>
            <td className="num">{fmt(BENCH_TOTAL.c1)}</td>
            <td className="num col-accent">{fmt(BENCH_TOTAL.lang)}</td>
            <td className="num delta">{VS_VERCEL}</td>
            <td className="num delta">{VS_C1}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function TotalsBars() {
  const max = BENCH_TOTAL.vercel;
  const rows = [
    { k: "Vercel JSON-Render", v: BENCH_TOTAL.vercel, accent: false },
    { k: "Thesys C1 JSON", v: BENCH_TOTAL.c1, accent: false },
    { k: "OpenUI Lang", v: BENCH_TOTAL.lang, accent: true },
  ];

  return (
    <div className="totals">
      {rows.map((r) => (
        <div className="totbar" key={r.k}>
          <span className="totbar__k">{r.k}</span>
          <span className="bars__track">
            <span
              className={`bars__fill${r.accent ? " bars__fill--accent" : ""}`}
              style={{ width: `${(r.v / max) * 100}%` }}
            />
          </span>
          <span className="totbar__v">{r.v.toLocaleString("en-US")}</span>
          <span className="totbar__d">
            {r.accent ? VS_VERCEL : `${((r.v / max) * 100).toFixed(1)}%`}
          </span>
        </div>
      ))}
      <p className="totals__note">
        峰值场景为「联系表单」，OpenUI Lang 148 tokens 对比 Vercel JSON-Render 340 tokens，即
        <span className="accent"> {VS_VERCEL_MAX}</span>。
      </p>
    </div>
  );
}
