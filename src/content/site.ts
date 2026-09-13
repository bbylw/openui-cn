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
  quickstartDoc: "https://www.openui.com/docs/agent/getting-started/quickstart",
  comparisonDoc: "https://www.openui.com/docs/openui-lang/comparison",
};

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
