import { BenchTable, TotalsBars } from "@/components/BenchTable";
import { CodeBlock } from "@/components/CodeBlock";
import { CompareTable } from "@/components/CompareTable";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { BENCH_METHOD, BENCH_TOTAL } from "@/content/benchmarks";
import { SITE } from "@/content/site";

const SKILL_CODE = `# 使用 skills CLI（适用于所有代理）
npx skills add thesysdev/skills --skill openui`;

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

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="community">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 02"
              title="生态与参与"
              sub="采用者名单、贡献指南，以及一个能给 AI 编程助手用的 Agent 技能。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="stack">
                <CodeBlock title="安装 Agent 技能" code={SKILL_CODE} />
                <div className="note">
                  <span>
                    该技能让 Claude Code、Codex、Cursor、Copilot 等助手可以帮你用 OpenUI Lang
                    搭建、构建和调试生成式 UI 应用；内容覆盖组件库设计、Lang 语法、系统提示生成、渲染器、SDK 包，
                    以及调试格式错误的模型输出。
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid grid--2">
                <a className="cell" href={SITE.adopters} target="_blank" rel="noreferrer">
                  <div className="cell__idx">采用者</div>
                  <div className="cell__title">ADOPTERS.md</div>
                  <div className="cell__body">
                    正在使用 OpenUI 的组织与项目列表。如果你也在用，可以把自己的组织加进去。
                  </div>
                </a>
                <a className="cell" href={SITE.contributing} target="_blank" rel="noreferrer">
                  <div className="cell__idx">贡献</div>
                  <div className="cell__title">CONTRIBUTING.md</div>
                  <div className="cell__body">
                    贡献指南与参与方式。代码贡献、示例实现与文档修订都欢迎。
                  </div>
                </a>
                <a className="cell" href={SITE.discord} target="_blank" rel="noreferrer">
                  <div className="cell__idx">社区</div>
                  <div className="cell__title">Discord</div>
                  <div className="cell__body">
                    提问、分享你正在构建的内容，或者只是看看别人用它做了什么。
                  </div>
                </a>
                <a className="cell" href={SITE.license} target="_blank" rel="noreferrer">
                  <div className="cell__idx">许可证</div>
                  <div className="cell__title">MIT License</div>
                  <div className="cell__body">
                    本项目基于仓库 LICENSE 文件描述的条款提供，可商用。
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
