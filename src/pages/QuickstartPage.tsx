import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { PageHero } from "@/components/PageHero";
import { Pipeline } from "@/components/Pipeline";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { QUICKSTART_OUTCOMES } from "@/content/home";
import { SITE } from "@/content/site";

const CLI_BASIC = `npx @openuidev/cli@latest create --name genui-chat-app
cd genui-chat-app
echo "OPENAI_API_KEY=sk-your-key-here" > .env
npm run dev`;

const CLI_TEMPLATE = `npx @openuidev/cli@latest create \\
  --name recipe-remix \\
  --template openui-cloud`;

const COMPONENT_CODE = `import { createLibrary, defineComponent, useTriggerAction } from "@openuidev/react-lang";
import { chatLibrary } from "@openuidev/thesys";
import { z } from "zod/v4";

const RecipeRemix = defineComponent({
  name: "RecipeRemix",
  description: "Three sourced recipe suggestions.",
  props: z.object({
    recipes: z.array(
      z.object({
        title: z.string(),
        time: z.string(),
        servings: z.number().int().positive(),
        ingredients: z.array(z.string()),
        sourceUrl: z.string(),
        imageUrl: z.string().optional(),
      }),
    ),
  }),
  component: function RecipeRemix({ props }) {
    const triggerAction = useTriggerAction();
    return (
      <section>
        {props.recipes.map((recipe) => (
          <article key={recipe.title}>
            <h3>{recipe.title}</h3>
            <span>{recipe.time}</span>
            <button onClick={() => triggerAction(\`Make \${recipe.title} faster\`)}>
              Remix this
            </button>
          </article>
        ))}
      </section>
    );
  },
});

export const recipeLibrary = createLibrary({
  root: chatLibrary.root ?? "Card",
  componentGroups: chatLibrary.componentGroups,
  components: [...Object.values(chatLibrary.components), RecipeRemix],
});`;

const GENERATE_CODE = `# 从库定义生成可序列化的组件规范
npx @openuidev/cli@latest generate \\
  --spec src/lib/recipe-library.tsx \\
  --out src/lib/recipe-library-spec.json`;

const PROMPT_CODE = `const recipeInstructions = \`
You are a practical recipe remix assistant.
Return exactly three concise recipes and clearly label substitutions.
Render the final recipe recommendations using exactly one RecipeRemix component.
Do not return recipe recommendations as a prose-only response.
\`;

// 服务端：把组件库规范与自定义指令一起交给提示生成器
instructions: generateSystemPrompt({
  cloud: true,
  library: recipeLibrarySpec,
  instructions: recipeInstructions,
});

// 客户端：换成你自己的组件库
<AgentInterface llm={llm} componentLibrary={recipeLibrary} agentName="Recipe Remix" />`;

const STEPS = [
  {
    title: "定义组件库",
    body: "用 defineComponent 描述单个组件，再用 createLibrary 把它们组装成库。root 决定入口组件。",
  },
  {
    title: "生成系统提示",
    body: "openuiLibrary.prompt(openuiPromptOptions) 会把语法规则、组件签名与示例渲染成一段指令。",
  },
  {
    title: "把提示发给模型",
    body: "模型因此知道确切的输出语言。你可以在指令里加上业务约束，例如「必须用恰好一个 RecipeRemix 渲染」。",
  },
  {
    title: "流式回传 Lang",
    body: "把模型的输出分片累加成一个字符串，一并交给前端的 Renderer。",
  },
  {
    title: "逐步渲染",
    body: "Renderer 在每个 token 到达时增量解析，结构先渲染、数据随后填充；解析失败的片段会被丢弃。",
  },
];

export default function QuickstartPage() {
  return (
    <>
      <PageHero
        eyebrow="快速开始"
        title="从脚手架到可用的生成式 UI"
        sub="最快的方式是跑一次 CLI：它会创建一个带流式处理、内置 UI 与 OpenUI Lang 支持的完整应用。"
        meta={
          <>
            <span className="pill pill--accent">Node.js 20+</span>
            <span className="pill">npx @openuidev/cli@latest</span>
            <span className="pill">约 10 分钟</span>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      <section className="band band--flush" id="scaffold">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 00"
              title="跑起来"
              sub="这是开始使用 OpenUI 的最快方式。脚手架应用提供了一个端到端的起点，包含流式处理、内置 UI 和 OpenUI Lang 支持。"
            />
          </Reveal>

          <div className="split">
            <Reveal delay={40}>
              <CodeBlock title="终端 · 最快路径" code={CLI_BASIC} />
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
            <div className="stack" style={{ marginTop: 22 }}>
              <CodeBlock title="官方教程路径 · 带 Gateway 的模板" code={CLI_TEMPLATE} />
              <div className="note">
                <span>
                  这个模板内置流式聊天、会话历史、Web 搜索、图片搜索、报告、演示文稿与一个示例函数工具，
                  你只需要新增一个工具和一个组件。前置条件是 Node.js 20+ 与一个 Thesys 账号。
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="loop">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 01"
              title="五步闭环"
              sub="不管用哪种模板，运行时的形状都是同一套：组件库定义能力边界，提示传达边界，渲染器负责把它变成界面。"
            />
          </Reveal>
          <Reveal delay={40}>
            <Pipeline />
          </Reveal>
          <div className="split" style={{ marginTop: 30 }}>
            <Reveal delay={60}>
              <ol className="klist">
                {STEPS.map((step, i) => (
                  <li className="kitem" key={step.title}>
                    <span className="kitem__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="kitem__t">{step.title}</span>
                      <span className="kitem__d" style={{ display: "block" }}>
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={100}>
              <CodeBlock
                title="package.json 里加上依赖"
                code={`bun add @openuidev/react-lang @openuidev/react-ui
bun add @openuidev/lang-core @openuidev/react-headless
bun add zod zustand`}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="band" id="extend">
        <div className="wrap">
          <Reveal>
            <SectionHead
              index="/ 02"
              title="加一个你自己的组件"
              sub="扩展的代价很小：一个 defineComponent，一次 createLibrary，一次 CLI 生成——你的组件就进入了模型的能力集合。"
            />
          </Reveal>

          <Reveal delay={40}>
            <CodeBlock title="src/lib/recipe-library.tsx" lang="ts" code={COMPONENT_CODE} />
          </Reveal>

          <div className="split" style={{ marginTop: 30 }}>
            <Reveal delay={80}>
              <CodeBlock title="生成组件规范" code={GENERATE_CODE} />
            </Reveal>
            <Reveal delay={120}>
              <CodeBlock title="把组件库接进提示与界面" lang="ts" code={PROMPT_CODE} />
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="note" style={{ marginTop: 20 }}>
              <span>
                <b>useTriggerAction()</b> 让组件里的按钮可以发起新一轮行动。上面例子中的
                「Remix this」按钮就是在组件内部把一条新指令发回给助手，于是生成式 UI
                从「一次性输出」变成了可继续交互的流程。
              </span>
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
                <span className="eyebrow">接下来</span>
                <h2 className="band__title" style={{ marginTop: 14 }}>
                  从内置组件库开始，逐步换成你自己的设计系统
                </h2>
                <p className="band__sub">
                  openuiLibrary 覆盖图表、表格、表单、卡片、图片等；当你需要品牌化的界面时，
                  再用 defineComponent 逐个替换。
                </p>
              </div>
              <div className="stack stack--tight">
                <Link className="btn btn--primary" to="/packages">
                  看全部官方包
                </Link>
                <a className="btn" href={SITE.quickstartDoc} target="_blank" rel="noreferrer">
                  官方快速开始文档
                </a>
                <a className="btn" href={SITE.examples} target="_blank" rel="noreferrer">
                  参考实现 examples
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
