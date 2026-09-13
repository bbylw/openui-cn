import { BenchTable, TotalsBars } from "@/components/BenchTable";
import { CompareTable } from "@/components/CompareTable";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { BENCH_METHOD, BENCH_TOTAL } from "@/content/benchmarks";
import { SITE } from "@/content/site";

export default function BenchmarksPage() {
  return (
    <>
      <PageHero
        eyebrow="基准与对比"
        title="同一份界面，少一半的 token"
        sub="OpenUI Lang 的收益主要来自两件事：去掉被反复重复的键名，以及用行导向结构替代需要整体闭合的 JSON。"
        meta={
          <>
            <span className="pill pill--accent">
              总计 {BENCH_TOTAL.lang.toLocaleString("en-US")} vs{" "}
              {BENCH_TOTAL.vercel.toLocaleString("en-US")} tokens
            </span>
            <span className="pill">tiktoken · GPT-5 编码器</span>
            <span className="pill">七个 UI 场景</span>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      <section className="band band--flush" id="token">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 00"
              title="Token 效率"
              sub="测量对象是模型输出的 UI 描述本身。场景覆盖从最简单的表格到完整的定价页与仪表盘。"
            />
          </Reveal>

          <Reveal delay={40}>
            <BenchTable />
          </Reveal>

          <div className="split" style={{ marginTop: 30 }}>
            <Reveal delay={80}>
              <div className="stack">
                <div className="eyebrow">总计对比</div>
                <TotalsBars />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="stack">
                <div className="eyebrow">方法</div>
                <ol className="klist">
                  {BENCH_METHOD.map((line, i) => (
                    <li className="kitem" key={line}>
                      <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="kitem__d" style={{ marginTop: 0 }}>
                        {line}
                      </span>
                    </li>
                  ))}
                </ol>
                <a className="link" href={SITE.benchmarks} target="_blank" rel="noreferrer">
                  完整方法论与复现步骤（benchmarks/）
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 01"
              title="能力对比"
              sub="OpenUI 的差异化在于「组件来自库 + 自定义」以及内置的数据获取与聊天 UI——这两件事决定了它能不能直接撑起产品流程，而不是只做一个演示。"
            />
          </Reveal>

          <Reveal delay={40}>
            <CompareTable />
          </Reveal>

          <Reveal delay={80}>
            <div className="grid grid--3" style={{ marginTop: 30 }}>
              {[
                {
                  t: "1x token，4.9s 延迟",
                  b: "在 60 tok/s 的生成速度下，3x token 意味着 14.2s；这直接决定了用户愿不愿意等。",
                },
                {
                  t: "流式 + 输出一致性",
                  b: "两种能力同时具备，才能一边渲染一边保证最终结构与组件库一致。",
                },
                {
                  t: "Web、移动端、邮件",
                  b: "同一份 Lang 可以渲染到不同平台；browser-bundle 让无构建嵌入也成为可能。",
                },
              ].map((item) => (
                <div className="cell" key={item.t}>
                  <div className="cell__title" style={{ marginTop: 0 }}>
                    {item.t}
                  </div>
                  <div className="cell__body">{item.b}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ marginTop: 22 }}>
              <a className="link" href={SITE.comparisonDoc} target="_blank" rel="noreferrer">
                官方 OpenUI Lang 对比文档
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
