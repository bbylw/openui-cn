import { Link } from "react-router-dom";
import { BenchTable, TotalsBars } from "@/components/BenchTable";
import { CodeBlock } from "@/components/CodeBlock";
import { LangDemo } from "@/components/LangDemo";
import { Pipeline } from "@/components/Pipeline";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { BENCH_TOTAL, VS_C1, VS_VERCEL } from "@/content/benchmarks";
import {
  CAPABILITIES,
  HERO_LANG_SAMPLE,
  HERO_STATS,
  QUICKSTART_OUTCOMES,
  WHY_LANG,
} from "@/content/home";
import { KPI_PATTERN } from "@/content/lang";
import { PACKAGES } from "@/content/packages";
import { ENTRY_LINKS, REPO_BADGES, SITE } from "@/content/site";

const CLI = `npx @openuidev/cli@latest create --name genui-chat-app
cd genui-chat-app
echo "OPENAI_API_KEY=sk-your-key-here" > .env
npm run dev`;

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__top">
            <div>
              <span className="eyebrow">生成式 UI 的开放标准</span>
              <h1 className="hero__title">
                <span className="hero__title-line">让模型直接吐出</span>
                <span className="hero__title-line">
                  一段 <em>可流式的界面</em>
                </span>
              </h1>
            </div>

            <div className="hero__aside">
              <p className="hero__sub">
                OpenUI 是一个全栈、渲染器无关的生成式 UI 框架，围绕一种紧凑、流式优先的语言构建。
                模型输出不再是纯文本，而是被逐行解析、逐步渲染成你自己注册的组件。
              </p>
              <div className="hero__ctas">
                <Link className="btn btn--primary" to="/quickstart">
                  快速开始
                </Link>
                <Link className="btn" to="/lang">
                  OpenUI Lang 是什么
                </Link>
                <a className="btn" href={SITE.playground} target="_blank" rel="noreferrer">
                  官方游乐场
                </a>
              </div>
            </div>
          </div>

          <div className="hero__stage">
            <LangDemo
              code={HERO_LANG_SAMPLE}
              runKey={0}
              label={
                <>
                  实时演示 · <b>运营看板</b>
                </>
              }
            />
          </div>

          <div className="hero__stats">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="stat__v">
                  {stat.value}
                  {stat.unit ? <small>{stat.unit}</small> : null}
                </div>
                <div className="stat__k">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="what">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 00"
              title="什么是 OpenUI"
              sub="OpenUI 的核心是 OpenUI Lang：一种用于模型生成 UI 的紧凑、流式优先的语言。它不仅把模型输出当作纯文本，还允许你定义组件、从组件库生成提示指令，并在模型流式输出时渲染结构化的 UI。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="grid grid--3">
              {CAPABILITIES.map((cap, i) => (
                <div className="cell" key={cap.title}>
                  <div className="cell__idx">{String(i + 1).padStart(2, "0")}</div>
                  <div className="cell__title">{cap.title}</div>
                  <div className="cell__body">{cap.body}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="note" style={{ marginTop: 18 }}>
              <span>
                <b>重要提示：</b>OpenUI 没有官方的加密货币、代币或硬币。任何使用 OpenUI
                名称的资产均与本项目无关，也未得到其维护者的认可。
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 01"
              title="工作原理"
              sub="你的组件定义了模型可以生成什么。整个闭环只有五步，而组件库始终是唯一的权力来源。"
            />
          </Reveal>

          <Reveal delay={40}>
            <Pipeline />
          </Reveal>

          <div className="split" style={{ marginTop: 34 }}>
            <Reveal delay={60}>
              <ol className="klist">
                {[
                  ["定义或复用组件库", "用 Zod schema 描述每个组件的属性与结构。"],
                  ["从该库生成系统提示", "library.prompt() 直接把组件签名与规则渲染成指令。"],
                  ["把提示发送给模型", "模型因此知道确切的输出语言，而不是自由发挥。"],
                  ["把 OpenUI Lang 输出流回客户端", "行导向输出可以边到边解析。"],
                  ["用渲染器逐步渲染", "结构先渲染，数据随后填充。"],
                ].map(([title, body], i) => (
                  <li className="kitem" key={title}>
                    <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="kitem__t">{title}</span>
                      <span className="kitem__d" style={{ display: "block" }}>
                        {body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={100}>
              <div className="stack">
                <p className="lede">
                  你也可以在官方的 Playground 里亲手试一遍：用默认组件库实时生成 UI。
                </p>
                <CodeBlock
                  title="最小闭环"
                  lang="ts"
                  code={`import { defineComponent, createLibrary, Renderer } from "@openuidev/react-lang";
import { openuiLibrary, openuiPromptOptions } from "@openuidev/react-ui";
import { z } from "zod";

// 1. 定义模型可以生成什么
const MyCard = defineComponent({
  name: "MyCard",
  description: "Display a card with multiple children",
  props: z.object({ children: z.array(z.any()) }),
  component: ({ props, renderNode }) => <div>{renderNode(props.children)}</div>,
});

const myLibrary = createLibrary({ components: [MyCard] });

// 2. 从库生成系统提示
const systemPrompt = openuiLibrary.prompt(openuiPromptOptions);

// 3. 边到边渲染
function AssistantMessage({ content, isStreaming }) {
  return <Renderer library={openuiLibrary} response={content} isStreaming={isStreaming} />;
}`}
                />
                <a className="link" href={SITE.playground} target="_blank" rel="noreferrer">
                  打开官方游乐场
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="why">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 02"
              title="为什么需要一门新语言"
              sub="OpenUI Lang 专为「需要结构化且可流式传输的模型生成 UI」而设计——这正是 JSON 最不擅长的地方。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="klist">
                {WHY_LANG.map((item, i) => (
                  <div className="kitem" key={item.title}>
                    <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="kitem__t">{item.title}</span>
                      <span className="kitem__d" style={{ display: "block" }}>
                        {item.body}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="stack">
                <TotalsBars />
                <div className="note">
                  <span>
                    总体下来，OpenUI Lang 比 Vercel JSON-Render 少 <b>{VS_VERCEL}</b>，比
                    Thesys C1 JSON 少 <b>{VS_C1}</b>。完整方法论与复现步骤见官方
                    benchmarks 目录。
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="split" style={{ marginTop: 30 }}>
              <div className="prose">
                <p>
                  <span className="hl">受控渲染</span>
                  ：输出被限制在你定义并注册的组件里。模型无法凭空发明一个你的应用不认识的界面元素；
                  遇到非法片段，解析器会直接丢弃，其余部分照常渲染。
                </p>
                <p>
                  <span className="hl">类型化组件契约</span>
                  ：组件属性由 Zod schema 预先定义，位置参数顺序即 schema 的 key
                  顺序，可选参数可以从尾部省略——这让人和模型都能一眼读懂签名。
                </p>
              </div>
              <CodeBlock title="用 @ 内建函数组合出 KPI" code={KPI_PATTERN} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="quickstart">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 03"
              title="快速开始"
              sub="这是开始使用 OpenUI 的最快方式。脚手架应用提供了一个端到端的起点，包含流式处理、内置 UI 和 OpenUI Lang 支持。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <CodeBlock title="终端" code={CLI} />
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid--2">
                {QUICKSTART_OUTCOMES.map((item, i) => (
                  <div className="cell" key={item.title}>
                    <div className="cell__idx">{String(i + 1).padStart(2, "0")}</div>
                    <div className="cell__title">{item.title}</div>
                    <div className="cell__body">{item.body}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div style={{ marginTop: 20 }}>
              <Link className="btn" to="/quickstart">
                展开完整上手路径
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="packages">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 04"
              title="包与生态"
              sub="从框架无关的解析核心，到 React / Vue / Svelte 运行时，再到 CLI 与聊天界面——按你的场景取用。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="jump">
              <Link className="jump__item" to="/packages">
                <span className="jump__k">跨框架</span>
                <span className="jump__t">解析与提示核心</span>
                <span className="jump__d">lang-core 无 React / Vue / Svelte 依赖</span>
              </Link>
              <Link className="jump__item" to="/packages">
                <span className="jump__k">React</span>
                <span className="jump__t">渲染运行时与组件库</span>
                <span className="jump__d">react-lang · react-headless · react-ui</span>
              </Link>
              <Link className="jump__item" to="/packages">
                <span className="jump__k">服务端</span>
                <span className="jump__t">代理与流式集成</span>
                <span className="jump__d">langchain · AG-UI 流式传输</span>
              </Link>
              <Link className="jump__item" to="/packages">
                <span className="jump__k">工具</span>
                <span className="jump__t">脚手架与提示生成</span>
                <span className="jump__d">CLI · browser-bundle · 文档站</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginTop: 18 }} className="pillrow">
              {PACKAGES.map((pkg) => (
                <span className="pill" key={pkg.name}>
                  {pkg.name.replace("@openuidev/", "")}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="benchmarks">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 05"
              title="Token 与对比"
              sub={`七个 UI 场景，用 tiktoken（GPT-5 编码器）统计：总计 ${BENCH_TOTAL.lang.toLocaleString("en-US")} tokens，对比 Vercel JSON-Render 的 ${BENCH_TOTAL.vercel.toLocaleString("en-US")}。`}
            />
          </Reveal>

          <Reveal delay={40}>
            <BenchTable />
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginTop: 20 }}>
              <Link className="btn" to="/benchmarks">
                查看完整对比与延迟数据
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="entry">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 06"
              title="官方入口与生态"
              sub="README 顶部那一行入口，加上仓库状态标记与入门路径。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="jump">
              {ENTRY_LINKS.map((item) => (
                <a
                  className="jump__item"
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="jump__k">{item.key}</span>
                  <span className="jump__t">{item.title}</span>
                  <span className="jump__d">{item.desc}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="badges" style={{ marginTop: 18 }}>
              {REPO_BADGES.map((badge) => (
                <a
                  className="badge"
                  key={badge.label}
                  href={badge.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="badge__k">{badge.label}</span>
                  <span className="badge__v">{badge.value}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band">
        <div className="wrap">
          <Reveal>
            <div className="cta">
              <div>
                <span className="eyebrow">下一步</span>
                <h2 className="band__title" style={{ marginTop: 14 }}>
                  用你自己的组件库，跑通第一个流式界面
                </h2>
                <p className="band__sub">
                  一分钟脚手架，加上一个函数工具和一个自定义组件，就能得到可用的生成式 UI 流程。
                </p>
              </div>
              <div className="stack stack--tight">
                <Link className="btn btn--primary" to="/quickstart">
                  快速开始
                </Link>
                <a
                  className="btn"
                  href={SITE.docs}
                  target="_blank"
                  rel="noreferrer"
                >
                  官方文档 openui.com
                </a>
                <a
                  className="btn"
                  href={SITE.discord}
                  target="_blank"
                  rel="noreferrer"
                >
                  加入 Discord
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
