export const HERO_STATS = [
  { value: "−52.8%", unit: "", label: "总体 Token · 对比 Vercel JSON-Render" },
  { value: "10", unit: "个", label: "官方包 · React / Vue / Svelte / CLI" },
  { value: "4.9", unit: "s", label: "延迟 · 60 tok/s，对比 14.2s" },
];

export const CAPABILITIES = [
  {
    title: "OpenUI Lang",
    body: "一种为流式输出设计的结构化 UI 生成紧凑语言：行导向、位置参数、允许前向引用。",
  },
  {
    title: "内置组件库",
    body: "图表、表单、表格、布局等，可直接使用或扩展——组件库就是模型能力边界的定义。",
  },
  {
    title: "从组件库生成提示",
    body: "直接从你允许的组件集合生成模型指令，无需手写系统提示词。",
  },
  {
    title: "流式渲染器",
    body: "在 React 中随着 token 到达逐步解析并渲染模型输出，结构先到、数据后填。",
  },
  {
    title: "聊天与应用界面",
    body: "使用同一套基础架构构建助手、副驾驶与更广泛的交互式产品流程。",
  },
  {
    title: "多框架运行时",
    body: "React 官方支持；另有 Vue 3 与 Svelte 5 绑定，以及零框架依赖的核心解析层。",
  },
];

export const PIPELINE = [
  {
    title: "组件库",
    note: "用 Zod schema 定义模型被允许生成的组件",
  },
  {
    title: "系统提示",
    note: "从组件库生成指令，声明语言规范与组件签名",
  },
  {
    title: "大语言模型",
    note: "在受限的组件集合内生成 UI",
  },
  {
    title: "OpenUI Lang 流",
    note: "行导向输出，逐行发出、可增量解析",
  },
  {
    title: "渲染器",
    note: "宽容解析：遇到非法部分丢弃，能渲染多少渲染多少",
  },
  {
    title: "实时 UI",
    note: "交给你自己注册的 React 组件",
  },
];

export const WHY_LANG = [
  {
    title: "流式输出",
    body: "随着 token 到达逐步发出 UI。行导向语法让解析器可以在任意位置切分，无需等待完整的 JSON 对象闭合。",
  },
  {
    title: "Token 高效",
    body: "比等效 JSON 最多减少 67% 的 token。省掉 \"component\" / \"props\" / \"children\" 这些被反复重复的键名。",
  },
  {
    title: "受控渲染",
    body: "将输出限制为你定义和注册的组件。模型无法凭空发明一个你的应用不认识的界面元素。",
  },
  {
    title: "类型化组件契约",
    body: "使用 Zod schemas 预先定义组件属性和结构，属性顺序即位置参数顺序，可选参数可从尾部省略。",
  },
];

export const QUICKSTART_OUTCOMES = [
  {
    title: "OpenUI Lang 支持",
    body: "从应用流程内置的结构化 UI 生成开始。",
  },
  {
    title: "库驱动的提示",
    body: "从你允许的组件集合生成模型指令。",
  },
  {
    title: "流式支持",
    body: "随着输出到达逐步更新界面。",
  },
  {
    title: "可用的应用基础",
    body: "从现成的示例开始，无需手动连接所有组件。",
  },
];

export const HERO_LANG_SAMPLE = `root = Stack([head, kpis, chart], "column", "l")
head = CardHeader("运营看板", "示例数据 · 由 openuiLibrary 渲染")
kpis = Stack([k1, k2, k3], "row", "m", "stretch", "start", true)
k1 = Card([k1l, k1v, k1t], "card")
k1l = TextContent("今日活跃", "small")
k1v = TextContent("12,480", "large-heavy")
k1t = Tag("+8.2%", null, "sm", "success")
k2 = Card([k2l, k2v], "card")
k2l = TextContent("OpenUI Lang token", "small")
k2v = TextContent("1,226", "large-heavy")
k3 = Card([k3l, k3v], "card")
k3l = TextContent("等价 JSON token", "small")
k3v = TextContent("2,247", "large-heavy")
chart = BarChart(["周一", "周二", "周三", "周四", "周五"], [s1, s2], "grouped", "日期", "千次")
s1 = Series("OpenUI Lang", [42, 48, 51, 63, 70])
s2 = Series("等价 JSON", [40, 45, 49, 60, 66])
`;
