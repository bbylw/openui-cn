import { CodeBlock } from "@/components/CodeBlock";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import {
  BUILTIN_LIBRARIES,
  INSTALL_SNIPPETS,
  PACKAGES,
  REPO_TREE,
  pkgNpmUrl,
  pkgRepoUrl,
} from "@/content/packages";
import { GETTING_STARTED_LINKS, REPO_BADGES, SITE } from "@/content/site";

const GROUPS = ["React", "跨框架", "服务端", "工具"] as const;

const COMPONENT_CATEGORIES = [
  {
    name: "Layout",
    items: "Card · CardHeader · SectionBlock · Tabs · Accordion · Carousel · Separator · Steps",
  },
  {
    name: "Data Display",
    items:
      "Table · Charts（bar / line / area / pie / radar / scatter）· ListBlock · ListItem · Tag · TagBlock · CodeBlock · Image · ImageBlock · ImageGallery",
  },
  {
    name: "Forms",
    items:
      "Input · TextArea · Select · CheckBoxGroup · CheckBoxItem · RadioGroup · RadioItem · SwitchGroup · SwitchItem · Slider · DatePicker · FormControl · Label",
  },
  {
    name: "Actions",
    items: "Button · Buttons · IconButton · FollowUpBlock · FollowUpItem",
  },
  { name: "Feedback", items: "Callout · TextCallout" },
  { name: "Content", items: "TextContent · MarkDownRenderer" },
  { name: "Chat", items: "AgentInterface · ToolCall · ToolResult" },
];

const STYLE_CODE = `/* 分层变体：OpenUI 全部样式被包进 @layer openui，
   站点自己的普通 CSS 无需 !important 或优先级技巧即可覆盖 */
@layer theme, base, openui, components, utilities;
@import "tailwindcss";
@import "@openuidev/react-ui/layered/styles/index.css";`;

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="包与生态"
        title="按场景取用，从解析核心到完整聊天界面"
        sub="OpenUI 的官方包覆盖三种典型的接入深度：只要 React 渲染、要自己的聊天 UI，或者完全框架无关的服务端提示生成。"
        meta={
          <>
            <span className="pill pill--accent">11 个包</span>
            <span className="pill">React 19 / Vue 3 / Svelte 5</span>
            <span className="pill">MIT</span>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      <section className="band band--flush" id="all">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 00"
              title="全部官方包"
              sub="包名可以直接在 npm 上搜到；每个包在 monorepo 里的目录也一并列出，方便对着源码读。"
            />
          </Reveal>

          {GROUPS.map((group, gi) => {
            const items = PACKAGES.filter((p) => p.group === group);
            if (!items.length) return null;
            return (
              <Reveal key={group} delay={gi * 40}>
                <div style={{ marginTop: gi === 0 ? 0 : 34 }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>
                    {group}
                  </div>
                  <div>
                    {items.map((pkg) => (
                      <div className="pkg" key={pkg.name}>
                        <div>
                          <a
                            className="pkg__name link"
                            href={pkgRepoUrl(pkg.sub)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {pkg.name}
                          </a>
                          <div className="pkg__use">适用场景：{pkg.use}</div>
                          <div className="pkg__meta">
                            <a href={pkgRepoUrl(pkg.sub)} target="_blank" rel="noreferrer">
                              monorepo 目录
                            </a>
                            <a href={pkgNpmUrl(pkg.name)} target="_blank" rel="noreferrer">
                              npm
                            </a>
                          </div>
                        </div>
                        <div className="pkg__desc">{pkg.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="start">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 01"
              title="常用起点"
              sub="四种最常见的接入方式。本站自己用的是第一组：react-lang 负责渲染，react-ui 提供预置组件库。"
            />
          </Reveal>
          <Reveal delay={40}>
            <div className="cols-2">
              {INSTALL_SNIPPETS.map((snippet) => (
                <CodeBlock key={snippet.title} title={snippet.title} code={snippet.code} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="libraries">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 02"
              title="两个预置组件库"
              sub="位于 @openuidev/react-ui 内。它们既是开箱可用的默认值，也是你自定义组件库时的基座。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="stack">
                {BUILTIN_LIBRARIES.map((lib) => (
                  <div className="cell cell--card" key={lib.name}>
                    <div className="pkg__name">{lib.name}</div>
                    <div className="cell__body" style={{ marginTop: 8 }}>
                      {lib.desc}
                    </div>
                  </div>
                ))}
                <CodeBlock
                  title="从库生成系统提示"
                  lang="ts"
                  code={`import { openuiLibrary, openuiPromptOptions } from "@openuidev/react-ui";

const systemPrompt = openuiLibrary.prompt(openuiPromptOptions);

// 也可以导出成 JSON Schema 交给别的模型供应商
const schema = openuiLibrary.toJSONSchema();`}
                />
                <div className="note">
                  <span>
                    扩展内置库时不要从零开始：把{' '}
                    <span className="mono">Object.values(chatLibrary.components)</span> 和你的组件一起传给{' '}
                    <span className="mono">createLibrary</span>，原有的内联组件就仍然可用。
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="tablewrap">
                <table className="dtable" style={{ minWidth: 0 }}>
                  <caption>独立 UI 原语 · 可按组件单独引入</caption>
                  <thead>
                    <tr>
                      <th scope="col">类别</th>
                      <th scope="col">组件</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPONENT_CATEGORIES.map((row) => (
                      <tr key={row.name}>
                        <th scope="row" className="name" style={{ width: "28%" }}>
                          {row.name}
                        </th>
                        <td>
                          <span className="mono">{row.items}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="styles">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 03"
              title="样式集成"
              sub="OpenUI 提供两种样式变体。默认版本不分层，兼容旧浏览器；分层版本包进 @layer openui，任何未分层的消费方 CSS 都能直接胜出。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="stack">
                <CodeBlock
                  title="默认（无分层）"
                  lang="ts"
                  code={`import "@openuidev/react-ui/styles/index.css";
// 单组件样式：@openuidev/react-ui/styles/Button.css`}
                />
                <CodeBlock title="分层变体 + Tailwind v4" code={STYLE_CODE} />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="stack">
                <div className="klist">
                  {[
                    [
                      "只从一处引入",
                      "OpenUI 的 CSS 必须只从一个地方引入；在代码分割的打包器下多处引入，可能让 openui 层在你的层序声明之前注册，从而锁死错误的层序。",
                    ],
                    [
                      "reset 的层要高一段",
                      "应用级 reset 需要包在 openui 之下的层里；未分层的 reset 无论优先级如何都会压过所有分层样式。",
                    ],
                    [
                      "标记本站在做什么",
                      "本站就用了分层变体：OpenUI 全部样式位于 @layer openui，站点自身的样式位于 @layer app，站点 reset 位于更低的 @layer reset。",
                    ],
                    [
                      "浏览器要求",
                      "分层变体依赖 CSS cascade layers（Chrome 99+、Firefox 97+、Safari 15.4+）；更旧的浏览器会整块丢弃 @layer，组件将无样式渲染。",
                    ],
                  ].map(([title, body], i) => (
                    <div className="kitem" key={title}>
                      <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="kitem__t">{title}</span>
                        <span className="kitem__d" style={{ display: "block" }}>
                          {body}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="note">
                  <span>
                    <span className="mono">defaults.css</span>（主题 token）与
                    ThemeProvider 的运行时样式注入始终保持未分层，因此运行时主题永远能覆盖组件默认值。
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="repo">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 04"
              title="仓库结构"
              sub="所有包都在一个 monorepo 里；docs/ 是 openui.com 的文档站，benchmarks/ 是 token 基准测试。"
            />
          </Reveal>
          <Reveal delay={40}>
            <div className="tablewrap">
              <pre className="tree">{REPO_TREE}</pre>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="hero__ctas" style={{ marginTop: 22 }}>
              <a className="btn btn--primary" href={SITE.repo} target="_blank" rel="noreferrer">
                打开官方仓库
              </a>
              <a className="btn" href={SITE.examples} target="_blank" rel="noreferrer">
                参考实现 examples
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="start-here">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 05"
              title="从这里开始"
              sub="README 给出的四条入门路径，按你当前要做的事挑一条。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="jump">
              {GETTING_STARTED_LINKS.map((item) => (
                <a
                  className="jump__item"
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="jump__k">{item.label}</span>
                  <span className="jump__d">{item.desc}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <div className="split" style={{ marginTop: 36 }}>
            <Reveal delay={80}>
              <div className="stack">
                <div className="eyebrow">社区</div>
                <div className="klist">
                  <a className="kitem" href={SITE.discord} target="_blank" rel="noreferrer">
                    <span className="kitem__n">01</span>
                    <span>
                      <span className="kitem__t">Discord</span>
                      <span className="kitem__d" style={{ display: "block" }}>
                        提问、分享你正在构建的内容。
                      </span>
                    </span>
                  </a>
                  <a className="kitem" href={SITE.issues} target="_blank" rel="noreferrer">
                    <span className="kitem__n">02</span>
                    <span>
                      <span className="kitem__t">GitHub Issues</span>
                      <span className="kitem__d" style={{ display: "block" }}>
                        报告错误或请求功能。
                      </span>
                    </span>
                  </a>
                  <a className="kitem" href={SITE.adopters} target="_blank" rel="noreferrer">
                    <span className="kitem__n">03</span>
                    <span>
                      <span className="kitem__t">ADOPTERS.md</span>
                      <span className="kitem__d" style={{ display: "block" }}>
                        正在使用 OpenUI 的组织与项目列表；欢迎把你的组织加进去。
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="stack">
                <div className="eyebrow">仓库状态</div>
                <div className="badges">
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
                <div className="note">
                  <span>
                    README 顶部还有项目 banner 与 demo.gif 演示动画。本站没有引用这两张远程图片，
                    而是用由 openuiLibrary 实时渲染的界面来替代——它们比录屏更能说明问题。
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
