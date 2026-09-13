import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { PageHero } from "@/components/PageHero";
import { Playground } from "@/components/Playground";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { BUILTIN_GROUPS, EXPRESSION_TYPES, SIGNATURES, SYNTAX_RULES } from "@/content/lang";
import { SITE } from "@/content/site";

const ERROR_CODES = [
  { code: "missing-required", desc: "必填属性缺失且没有默认值" },
  { code: "null-required", desc: "必填属性被显式写成 null 且没有默认值" },
  { code: "unknown-component", desc: "组件名没有出现在库的 schema 中" },
  { code: "excess-args", desc: "传入的位置参数多于 schema 定义的数量" },
];

const STREAM_CODE = `import { Renderer, createStreamingParser } from "@openuidev/react-lang";
import { openuiLibrary } from "@openuidev/react-ui";

// 服务端 / 数据层：增量解析
const parser = createStreamingParser(openuiLibrary);

for await (const chunk of chunks) {
  const latest = parser.push(chunk);   // 每个分片返回最新的 ParseResult
}

// 流结束后再检查未解析引用（流式过程中出现前向引用是正常的）
if (parser.getResult()?.meta.unresolved.length) {
  console.warn("有被引用但从未定义的元素");
}

// 客户端：逐帧把累计文本交给渲染器
function AssistantMessage({ content, isStreaming }) {
  return <Renderer library={openuiLibrary} response={content} isStreaming={isStreaming} />;
}`;

export default function LangPage() {
  return (
    <>
      <PageHero
        eyebrow="OpenUI Lang"
        title={
          <>
            行导向的界面语言，
            <br />
            为流式输出而生
          </>
        }
        sub="每个语句一行，形式为 identifier = Expression。参数按 Zod key 顺序位置传入，允许前向引用——这让解析器可以在任意 token 边界上切分，结构先渲染、数据随后填充。"
        meta={
          <>
            <span className="pill pill--accent">比等价 JSON 最多省 67% token</span>
            <span className="pill">宽容解析 · 非法片段不会阻断渲染</span>
            <span className="pill">Zod schema 类型化契约</span>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      <section className="band band--flush">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 00"
              title="演练场"
              sub="下面每一个示例都是一段真实的 OpenUI Lang，由官方 openuiLibrary 在你浏览器里实时解析并渲染。左边是 Lang 流，右边是渲染结果。"
            />
          </Reveal>
          <Reveal delay={40}>
            <Playground />
          </Reveal>
          <Reveal delay={80}>
            <div className="note" style={{ marginTop: 18 }}>
              <span>
                示例由本站作者手写，用于演示语言与渲染；每个场景下方标注的 token
                数来自 OpenUI 官方基准（tiktoken · GPT-5 编码器）。真实场景里这段文本由模型生成。
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 01"
              title="语法与表达式"
              sub="语言的表面积很小：八种表达式，加上一组位置参数规则。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="tablewrap">
                <table className="dtable" style={{ minWidth: 0 }}>
                  <caption>支持的表达式类型</caption>
                  <thead>
                    <tr>
                      <th scope="col">类型</th>
                      <th scope="col">语法</th>
                      <th scope="col">示例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXPRESSION_TYPES.map((row) => (
                      <tr key={row.type}>
                        <th scope="row" style={{ fontWeight: 400 }} className="name">
                          {row.type}
                        </th>
                        <td>
                          <code className="mono">{row.syntax}</code>
                        </td>
                        <td>
                          <code className="mono">{row.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="stack">
                <div className="klist">
                  {SYNTAX_RULES.map((rule, i) => (
                    <div className="kitem" key={rule}>
                      <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="kitem__d" style={{ marginTop: 0 }}>
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
                <CodeBlock
                  title="一个完整的表单程序"
                  code={`root = Stack([title, form])
title = TextContent("Sign up", "large-heavy")
form = Form("signup", actions, [nameField, emailField])
nameField = FormControl("Name", Input("name", "Your name", "text", { required: true, minLength: 2 }))
emailField = FormControl("Email", Input("email", "you@example.com", "email", { required: true, email: true }))
actions = Buttons([submitBtn, cancelBtn], "row")
submitBtn = Button("Submit", Action([@ToAssistant("Submit")]), "primary")
cancelBtn = Button("Cancel", Action([@ToAssistant("Cancel")]), "secondary")`}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 02"
              title="内建函数"
              sub="以 @ 开头，用来告诉模型「这是函数，不是组件」。它们在启用工具调用或绑定时会一起进入系统提示，主要用于对查询结果做变换、过滤与聚合。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="grid grid--2">
              {BUILTIN_GROUPS.map((group) => (
                <div className="cell" key={group.name}>
                  <div className="cell__idx">{group.name}</div>
                  <div className="stack stack--tight" style={{ marginTop: 12 }}>
                    {group.items.map((item) => (
                      <div key={item.sig}>
                        <code className="mono" style={{ color: "var(--oc-accent-text)" }}>
                          {item.sig}
                        </code>
                        <div className="cell__body" style={{ marginTop: 3 }}>
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 03"
              title="解析、流式与错误"
              sub="两个解析器：一次性解析完整文本，或者增量解析流式分片。解析错误不会阻断渲染——能渲染多少就渲染多少。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <CodeBlock title="增量解析" lang="ts" code={STREAM_CODE} />
            </Reveal>

            <Reveal delay={80}>
              <div className="stack">
                <div className="tablewrap">
                  <table className="dtable" style={{ minWidth: 0 }}>
                    <caption>ParseResult.meta.errors 的 code</caption>
                    <thead>
                      <tr>
                        <th scope="col">code</th>
                        <th scope="col">含义</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ERROR_CODES.map((row) => (
                        <tr key={row.code}>
                          <th scope="row" className="name">
                            <code className="mono">{row.code}</code>
                          </th>
                          <td>{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="note">
                  <span>
                    <b>前向引用是预期行为。</b>
                    流式传输期间 meta.unresolved 里有值是正常的；只有在流结束后，才需要检查是否有被引用却从未定义的元素。
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 04"
              title="常用组件签名"
              sub="内置库里最常被用到的组件。完整的组件签名可以直接从 library.prompt(openuiPromptOptions) 里读出来。"
            />
          </Reveal>
          <Reveal delay={40}>
            <div className="tablewrap">
              <table className="dtable">
                <caption>openuiLibrary 常用签名 · 问号表示可选</caption>
                <thead>
                  <tr>
                    <th scope="col">组件</th>
                    <th scope="col">签名</th>
                  </tr>
                </thead>
                <tbody>
                  {SIGNATURES.map((row) => (
                    <tr key={row.name}>
                      <th scope="row" className="name">
                        <code className="mono">{row.name}</code>
                      </th>
                      <td>
                        <code className="mono">{row.sig}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="hero__ctas" style={{ marginTop: 22 }}>
              <Link className="btn btn--primary" to="/quickstart">
                用 CLI 生成系统提示
              </Link>
              <a className="btn" href={SITE.playground} target="_blank" rel="noreferrer">
                官方游乐场
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
