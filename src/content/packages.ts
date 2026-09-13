export type Pkg = {
  name: string;
  sub: string;
  use: string;
  desc: string;
  group: "React" | "跨框架" | "服务端" | "工具";
};

export const PACKAGES: Pkg[] = [
  {
    name: "@openuidev/lang-core",
    sub: "packages/lang-core",
    use: "框架无关的解析和提示生成",
    desc: "核心解析器、提示生成、运行时评估和类型层，无 React、Vue 或 Svelte 依赖。",
    group: "跨框架",
  },
  {
    name: "@openuidev/langchain",
    sub: "packages/langchain",
    use: "LangChain 和 LangGraph 代理",
    desc: "通过 AG-UI 流式传输 OpenUI 的代理转换器和服务器助手。",
    group: "服务端",
  },
  {
    name: "@openuidev/react-lang",
    sub: "packages/react-lang",
    use: "React 渲染运行时",
    desc: "在 React 中定义组件库、生成提示并渲染流式 OpenUI Lang。",
    group: "React",
  },
  {
    name: "@openuidev/react-headless",
    sub: "packages/react-headless",
    use: "自定义 React 聊天 UI",
    desc: "无头聊天状态、流式适配器和消息格式转换器。",
    group: "React",
  },
  {
    name: "@openuidev/react-ui",
    sub: "packages/react-ui",
    use: "获得完整 React 聊天体验的最快路径",
    desc: "预构建的聊天布局、独立 UI 原语和两个内置组件库。",
    group: "React",
  },
  {
    name: "@openuidev/react-email",
    sub: "packages/react-email",
    use: "邮件生成和 HTML 导出",
    desc: "React Email 组件定义以及模型生成邮件的提示选项。",
    group: "React",
  },
  {
    name: "@openuidev/vue-lang",
    sub: "packages/vue-lang",
    use: "Vue 集成",
    desc: "Vue 3 绑定，用于定义可模型渲染的组件并渲染流式 OpenUI Lang。",
    group: "跨框架",
  },
  {
    name: "@openuidev/svelte-lang",
    sub: "packages/svelte-lang",
    use: "Svelte 集成",
    desc: "Svelte 5 绑定，用于定义可模型渲染的组件并渲染流式 OpenUI Lang。",
    group: "跨框架",
  },
  {
    name: "@openuidev/browser-bundle",
    sub: "packages/browser-bundle",
    use: "CDN、iframe 和无构建嵌入",
    desc: "预构建的浏览器打包，包含渲染器、UI 库、React 和样式的脚本 + 样式表资源。",
    group: "跨框架",
  },
  {
    name: "@openuidev/cli",
    sub: "packages/openui-cli",
    use: "项目脚手架和提示生成",
    desc: "用于创建新应用和从库定义生成系统提示或 JSON Schema 的 CLI。",
    group: "工具",
  },
  {
    name: "@openuidev/openclaw-os-plugin",
    sub: "packages/claw-plugin",
    use: "OpenClaw 工作空间",
    desc: "用于提供 OpenUI 驱动的 OpenClaw 工作空间的 OpenClaw OS 插件。",
    group: "工具",
  },
];

export const INSTALL_SNIPPETS = [
  {
    title: "React 应用（含渲染与预构建组件）",
    code: "bun add @openuidev/react-lang @openuidev/react-ui",
  },
  {
    title: "框架无关的后端或 Edge 提示生成",
    code: "bun add @openuidev/lang-core",
  },
  {
    title: "LangChain / LangGraph 代理与服务器集成",
    code: "bun add @openuidev/langchain @langchain/langgraph",
  },
  {
    title: "Vue 或 Svelte 运行时",
    code: "bun add @openuidev/vue-lang\nbun add @openuidev/svelte-lang",
  },
];

export const REPO_TREE = `openui/
├── packages/
│   ├── react-lang/       # 核心运行时（解析器、渲染器、提示生成）
│   ├── react-headless/   # 无头聊天状态和流式适配器
│   ├── react-ui/         # 预构建的聊天布局和组件库
│   ├── react-email/      # 用于生成邮件的 React Email 组件库
│   ├── lang-core/        # 框架无关的解析器、提示和运行时层
│   ├── langchain/        # LangChain/LangGraph 流式集成
│   ├── vue-lang/         # OpenUI Lang 的 Vue 运行时绑定
│   ├── svelte-lang/      # OpenUI Lang 的 Svelte 运行时绑定
│   ├── browser-bundle/   # 用于 CDN / iframe / 无构建嵌入的脚本标签包
│   └── openui-cli/       # 脚手架和提示生成的 CLI
├── skills/
│   └── openui/           # 用于 AI 辅助开发的 Claude Code 技能
├── examples/             # 功能和集成的参考实现
│   ├── agent-frameworks/
│   ├── app-frameworks/
│   ├── design-systems/
│   ├── harnesses/
│   └── miscellaneous/
├── docs/                 # 文档站点（openui.com）
└── benchmarks/           # Token 效率基准测试`;

export const BUILTIN_LIBRARIES = [
  {
    name: "openuiLibrary",
    desc: "完整组件库：图表、表格、表单、卡片、图片等。本站在演练场中直接用它渲染下面所有示例。",
  },
  {
    name: "openuiChatLibrary",
    desc: "面向聊天的精简子集：follow-ups、steps、callouts，配合 AgentInterface 使用。",
  },
];
