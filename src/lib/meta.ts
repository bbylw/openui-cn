/** 站点对外正式地址，用于 canonical 与分享卡片 */
export const SITE_ORIGIN = "https://openui.ndjp.net";

export const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "OpenUI 中文站 — 生成式 UI 的开放标准",
    description:
      "OpenUI 是一个全栈、渲染器无关的生成式 UI 框架，围绕紧凑、流式优先的 OpenUI Lang 构建，比等价 JSON 最多减少 67% 的 token。",
  },
  "/lang": {
    title: "OpenUI Lang — 行导向的界面语言 | OpenUI 中文站",
    description:
      "OpenUI Lang 的语法与表达式、内建函数、解析与错误处理，以及可直接运行的实时渲染演练场。",
  },
  "/quickstart": {
    title: "快速开始 — 从脚手架到可用的生成式 UI | OpenUI 中文站",
    description:
      "用 @openuidev/cli 创建应用，走完「定义组件库 → 生成系统提示 → 流式渲染」的五步闭环。",
  },
  "/packages": {
    title: "包与生态 — 11 个官方包 | OpenUI 中文站",
    description:
      "react-lang、react-ui、react-headless、lang-core、langchain、vue-lang、svelte-lang、CLI 等官方包的适用场景与安装方式。",
  },
  "/community": {
    title: "生态与参与 — 文档、Agent 技能与社区 | OpenUI 中文站",
    description:
      "官方文档覆盖的主题、仓库结构、社区渠道、采用者名单、贡献流程，以及能让 AI 编程助手帮你写生成式 UI 的 Agent 技能。",
  },
  "/benchmarks": {
    title: "基准与对比 — Token、延迟与能力 | OpenUI 中文站",
    description:
      "七个 UI 场景的 tiktoken 基准，以及 OpenUI 与 Vercel JSON-Render、A2UI、CopilotKit OpenGenUI 的能力对比。",
  },
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** 按路由同步标题、描述、canonical 与 OG 标签。 */
export function applyRouteMeta(pathname: string) {
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];
  const url = `${SITE_ORIGIN}${pathname === "/" ? "/" : pathname}`;

  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  upsertCanonical(url);
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:url", url);
}
