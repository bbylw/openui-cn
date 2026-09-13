export const SITE = {
  name: "OpenUI",
  nameZh: "中文站",
  tagline: "生成式 UI 的开放标准",
  repo: "https://github.com/thesysdev/openui",
  docs: "https://openui.com",
  playground: "https://www.openui.com/playground",
  discord: "https://discord.com/invite/Pbv5PsqUSv",
  issues: "https://github.com/thesysdev/openui/issues",
  contributing: "https://github.com/thesysdev/openui/blob/main/CONTRIBUTING.md",
  license: "https://github.com/thesysdev/openui/blob/main/LICENSE",
  adopters: "https://github.com/thesysdev/openui/blob/main/ADOPTERS.md",
  examples: "https://github.com/thesysdev/openui/blob/main/examples/README.md",
  benchmarks: "https://github.com/thesysdev/openui/tree/main/benchmarks",
  skillsRepo: "https://github.com/thesysdev/skills/tree/main/skills/openui",
  skillsHome: "https://agentskills.io",
  quickstartDoc: "https://www.openui.com/docs/agent/getting-started/quickstart",
  comparisonDoc: "https://www.openui.com/docs/openui-lang/comparison",
  actions: "https://github.com/thesysdev/openui/actions/workflows/build-js.yml",
  trendshift: "https://trendshift.io/repositories/22357",
};

/** README 顶部那一行主入口：文档 · 游乐场 · Discord · 贡献指南 */
export const ENTRY_LINKS = [
  {
    key: "文档",
    title: "openui.com",
    desc: "OpenUI Lang 规范、聊天、组件与 API 参考的完整文档。",
    href: SITE.docs,
  },
  {
    key: "游乐场",
    title: "Playground",
    desc: "用默认组件库实时生成 UI，边改提示词边看渲染结果。",
    href: SITE.playground,
  },
  {
    key: "Discord",
    title: "社区",
    desc: "提问、分享你正在构建的内容。",
    href: SITE.discord,
  },
  {
    key: "贡献指南",
    title: "CONTRIBUTING.md",
    desc: "贡献代码、示例实现与文档修订的完整流程。",
    href: SITE.contributing,
  },
];

/** README 仓库结构之后的「入门指南」 */
export const GETTING_STARTED_LINKS = [
  {
    label: "openui.com",
    desc: "查看完整文档",
    href: SITE.docs,
  },
  {
    label: "快速开始",
    desc: "脚手架搭建一个可用应用",
    href: SITE.quickstartDoc,
  },
  {
    label: "examples/README.md",
    desc: "查找聚焦的参考实现",
    href: SITE.examples,
  },
  {
    label: "CONTRIBUTING.md",
    desc: "如果你想贡献代码",
    href: SITE.contributing,
  },
];

/** README 顶部的仓库状态标记 */
export const REPO_BADGES = [
  { label: "构建状态", value: "build-js", href: SITE.actions },
  { label: "许可证", value: "MIT", href: SITE.license },
  { label: "Discord", value: "社区在线", href: SITE.discord },
  { label: "Trendshift", value: "收录项目", href: SITE.trendshift },
];

export const NAV = [
  { to: "/", label: "总览", end: true },
  { to: "/lang", label: "OpenUI Lang" },
  { to: "/quickstart", label: "快速开始" },
  { to: "/packages", label: "包与生态" },
  { to: "/benchmarks", label: "基准与对比" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "站内",
    links: [
      { label: "总览", href: "/", external: false },
      { label: "OpenUI Lang", href: "/lang", external: false },
      { label: "快速开始", href: "/quickstart", external: false },
      { label: "包与生态", href: "/packages", external: false },
      { label: "基准与对比", href: "/benchmarks", external: false },
    ],
  },
  {
    title: "官方资源",
    links: [
      { label: "文档", href: SITE.docs, external: true },
      { label: "游乐场", href: SITE.playground, external: true },
      { label: "GitHub 仓库", href: SITE.repo, external: true },
      { label: "示例实现", href: SITE.examples, external: true },
      { label: "基准测试", href: SITE.benchmarks, external: true },
    ],
  },
  {
    title: "参与",
    links: [
      { label: "贡献指南", href: SITE.contributing, external: true },
      { label: "GitHub Issues", href: SITE.issues, external: true },
      { label: "Discord", href: SITE.discord, external: true },
      { label: "采用者名单", href: SITE.adopters, external: true },
      { label: "Agent 技能", href: SITE.skillsRepo, external: true },
    ],
  },
];
