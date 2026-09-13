/** Token 效率基准：使用 tiktoken（GPT-5 编码器）测量，七种 UI 场景。 */
export type BenchRow = {
  scenario: string;
  vercel: number;
  c1: number;
  lang: number;
};

export const BENCH_ROWS: BenchRow[] = [
  { scenario: "简单表格", vercel: 340, c1: 357, lang: 148 },
  { scenario: "带数据的图表", vercel: 520, c1: 516, lang: 231 },
  { scenario: "联系表单", vercel: 893, c1: 849, lang: 294 },
  { scenario: "仪表盘", vercel: 2247, c1: 2261, lang: 1226 },
  { scenario: "定价页面", vercel: 2487, c1: 2379, lang: 1195 },
  { scenario: "设置面板", vercel: 1244, c1: 1205, lang: 540 },
  { scenario: "电商产品", vercel: 2449, c1: 2381, lang: 1166 },
];

export const BENCH_TOTAL = { vercel: 10180, c1: 9948, lang: 4800 };

export const VS_VERCEL = "−52.8%";
export const VS_C1 = "−51.7%";
export const VS_VERCEL_MAX = "−67.1%";

export const CAPABILITY_COMPARE: {
  feature: string;
  openui: string;
  vercel: string;
  google: string;
  copilot: string;
}[] = [
  { feature: "Token 消耗", openui: "1x", vercel: "3x", google: "3x", copilot: "4x" },
  { feature: "延迟 (60 tok/s)", openui: "4.9s", vercel: "14.2s", google: "14.2s", copilot: "~20s" },
  { feature: "流式处理", openui: "yes", vercel: "yes", google: "yes", copilot: "part" },
  { feature: "输出一致性", openui: "yes", vercel: "yes", google: "yes", copilot: "no" },
  { feature: "组件", openui: "库 + 自定义", vercel: "库 + 自定义", google: "仅自定义", copilot: "无" },
  {
    feature: "多平台",
    openui: "Web、移动端、邮件",
    vercel: "Web、移动端、PDF、邮件、视频",
    google: "Web、iOS、Android",
    copilot: "Web",
  },
  { feature: "内置数据获取", openui: "yes", vercel: "no", google: "no", copilot: "no" },
  { feature: "包含聊天 UI", openui: "yes", vercel: "no", google: "no", copilot: "yes" },
];

export const BENCH_METHOD = [
  "模型输出被解析为结构化 UI，token 用 tiktoken（GPT-5 编码器）统计。",
  "对比对象为两种基于 JSON 的流式格式：Vercel JSON-Render 与 Thesys C1 JSON。",
  "七个场景覆盖表格、图表、表单、仪表盘、定价页、设置面板与电商商品页。",
];
