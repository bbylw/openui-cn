import { CodeBlock } from "@/components/CodeBlock";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { REPO_TREE } from "@/content/packages";
import {
  DOCS_TOPICS,
  GETTING_STARTED_LINKS,
  REPO_BADGES,
  SITE,
  SKILL_COVERS,
} from "@/content/site";

const SKILL_INSTALL = `# 使用 skills CLI（适用于所有代理）
npx skills add thesysdev/skills --skill openui`;

const COMMUNITY = [
  {
    title: "Discord",
    desc: "提问、分享你正在构建的内容。",
    href: SITE.discord,
  },
  {
    title: "GitHub Issues",
    desc: "报告错误或请求功能。",
    href: SITE.issues,
  },
  {
    title: "ADOPTERS.md",
    desc: "正在使用 OpenUI 的组织与项目列表；如果你也在用，考虑把你的组织加进去，这有助于其他采用者找到同行。",
    href: SITE.adopters,
  },
  {
    title: "CONTRIBUTING.md",
    desc: "欢迎贡献代码。参见贡献指南了解参与方式。",
    href: SITE.contributing,
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="生态与参与"
        title="文档、社区，以及给 AI 助手用的技能"
        sub="README 里除了框架本身，还有一整套周边：文档站、仓库结构、社区渠道、采用者名单、贡献流程，以及一个能让 AI 编程助手直接帮你写生成式 UI 的 Agent 技能。"
        meta={
          <>
            <span className="pill pill--accent">Agent 技能</span>
            <span className="pill">npx skills add thesysdev/skills</span>
            <span className="pill">MIT</span>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      <section className="band band--flush" id="docs">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 00"
              title="文档"
              sub="README 只给入口：「详细文档请访问 openui.com」。官方文档站按下面的主题组织。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="jump">
              {DOCS_TOPICS.map((topic) => (
                <a
                  className="jump__item"
                  key={topic.name}
                  href={SITE.docs}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="jump__k mono">{topic.name}</span>
                  <span className="jump__d">{topic.desc}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="badges"
              style={{ marginTop: 20 }}
            >
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
      <section className="band" id="repo">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 01"
              title="仓库结构"
              sub="所有包都在一个 monorepo 里；docs/ 是 openui.com 的文档站，benchmarks/ 是 token 基准测试。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="tablewrap">
                <pre className="tree">{REPO_TREE}</pre>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="stack">
                <div className="eyebrow">从这里开始</div>
                <div className="klist">
                  {GETTING_STARTED_LINKS.map((item, i) => (
                    <a
                      className="kitem"
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="kitem__t">{item.label}</span>
                        <span className="kitem__d" style={{ display: "block" }}>
                          {item.desc}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
                <a className="btn" href={SITE.repo} target="_blank" rel="noreferrer">
                  打开官方仓库
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="skill">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 02"
              title="Agent 技能"
              sub="OpenUI 提供一个 Agent Skill，让 AI 编程助手（Claude Code、Codex、Cursor、Copilot 等）可以帮你用 OpenUI Lang 搭建、构建和调试生成式 UI 应用。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <div className="stack">
                <CodeBlock title="安装" code={SKILL_INSTALL} />
                <div className="note">
                  <span>
                    该技能维护在{" "}
                    <a className="link" href={SITE.skillsRepo} target="_blank" rel="noreferrer">
                      thesysdev/skills
                    </a>{" "}
                    仓库中，技能规格见{" "}
                    <a className="link" href={SITE.skillsHome} target="_blank" rel="noreferrer">
                      agentskills.io
                    </a>
                    。
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="stack">
                <div className="eyebrow">该技能涵盖</div>
                <div className="grid grid--2">
                  {SKILL_COVERS.map((item, i) => (
                    <div className="cell" key={item}>
                      <div className="cell__idx">{String(i + 1).padStart(2, "0")}</div>
                      <div className="cell__title" style={{ fontSize: "0.98rem" }}>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="lede" style={{ fontSize: "0.95rem" }}>
                  安装之后，你可以直接让助手「给我的组件库加一个价格卡片组件」或者「这段模型输出的
                  OpenUI Lang 格式错了，帮我看看」——它会按语言的真实规则来改，而不是自由发挥。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="community">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 03"
              title="社区与参与"
              sub="遇到问题、想提需求，或者想把自己的组织加进采用者名单。"
            />
          </Reveal>

          <Reveal delay={40}>
            <div className="grid grid--2">
              {COMMUNITY.map((item, i) => (
                <a
                  className="cell"
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="cell__idx">{String(i + 1).padStart(2, "0")}</div>
                  <div className="cell__title">{item.title}</div>
                  <div className="cell__body">{item.desc}</div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="split" style={{ marginTop: 34 }}>
              <div className="stack">
                <div className="eyebrow">许可证</div>
                <p className="lede">
                  本项目基于仓库{" "}
                  <span className="mono">LICENSE</span> 文件中描述的条款提供，即
                  <span className="hl"> MIT License</span>，可商用。
                </p>
                <a className="btn" href={SITE.license} target="_blank" rel="noreferrer">
                  查看 LICENSE
                </a>
              </div>

              <div className="stack">
                <div className="eyebrow">免责声明</div>
                <div className="note">
                  <span>
                    <b>重要提示：</b>OpenUI 没有官方的加密货币、代币或硬币。任何使用 OpenUI
                    名称的资产均与本项目无关，也未得到其维护者的认可。
                  </span>
                </div>
                <p className="lede" style={{ fontSize: "0.9rem" }}>
                  本站是非官方中文站点，内容译自 OpenUI 官方仓库的 README、文档与基准测试。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
