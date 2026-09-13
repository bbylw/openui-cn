export type LangSample = {
  id: string;
  label: string;
  scenario: string;
  note: string;
  official?: { vercel: number; c1: number; lang: number };
  code: string;
};

export const EXPRESSION_TYPES = [
  { type: "组件调用", syntax: "TypeName(arg1, arg2)", example: 'CardHeader("标题", "副标题")' },
  { type: "字符串", syntax: '"text"', example: '"hello"' },
  { type: "数字", syntax: "42, 3.14, -1", example: "3.14" },
  { type: "布尔", syntax: "true / false", example: "true" },
  { type: "空值", syntax: "null", example: "null" },
  { type: "数组", syntax: "[a, b, c]", example: "[col1, col2]" },
  { type: "对象", syntax: "{key: value}", example: '{variant: "info"}' },
  { type: "引用", syntax: "identifier", example: "nameField" },
];

export const SYNTAX_RULES = [
  "每个语句独占一行，形式为 identifier = Expression。",
  "第一个语句是入口点。使用官方库提示时，以 root = Stack(...) 开头。",
  "参数按 Zod key 顺序位置传入——写 SomeComp([children], \"row\")，不要写 direction: \"row\"。",
  "可选参数可以从尾部省略。",
  "允许前向引用，因此可以先把子节点写在后面。",
  "除 root 外，每个变量都必须被至少一处引用；未被引用的变量会被静默丢弃。",
  "字符串使用双引号并支持反斜杠转义。",
  "条件渲染用三元表达式，例如 $editId != \"\" ? Card([editForm]) : null。",
];

export const SIGNATURES = [
  { name: "Stack", sig: "Stack(children, direction?, gap?, align?, justify?, wrap?)" },
  { name: "Card", sig: "Card(children, variant?, direction?, gap?, align?, justify?, wrap?)" },
  { name: "CardHeader", sig: "CardHeader(title?, subtitle?)" },
  { name: "TextContent", sig: "TextContent(text, size?)" },
  { name: "Table", sig: "Table(columns)" },
  { name: "Col", sig: "Col(label, data, type?)" },
  { name: "BarChart", sig: "BarChart(labels, series, variant?, xLabel?, yLabel?)" },
  { name: "Series", sig: "Series(category, values)" },
  { name: "LineChart", sig: "LineChart(labels, series, variant?, xLabel?, yLabel?)" },
  { name: "PieChart", sig: "PieChart(labels, values, variant?, appearance?)" },
  { name: "Form", sig: "Form(name, buttons, fields?)" },
  { name: "FormControl", sig: "FormControl(label, input, hint?)" },
  { name: "Input", sig: "Input(name, placeholder?, type?, rules?)" },
  { name: "Select", sig: "Select(name, items, placeholder?, rules?)" },
  { name: "SelectItem", sig: "SelectItem(value, label)" },
  { name: "Buttons", sig: "Buttons(buttons, direction?)" },
  { name: "Button", sig: "Button(label, action?, variant?, type?, size?)" },
  { name: "Tabs", sig: "Tabs(items)" },
  { name: "TabItem", sig: "TabItem(value, trigger, content)" },
  { name: "Accordion", sig: "Accordion(items)" },
  { name: "AccordionItem", sig: "AccordionItem(value, trigger, content)" },
  { name: "Steps", sig: "Steps(items)" },
  { name: "StepsItem", sig: "StepsItem(title, details)" },
  { name: "Callout", sig: "Callout(variant, title, description)" },
  { name: "Tag", sig: "Tag(text, icon?, size?, variant?)" },
  { name: "TagBlock", sig: "TagBlock(tags)" },
  { name: "CodeBlock", sig: "CodeBlock(language, codeString)" },
];

export const BUILTIN_GROUPS = [
  {
    name: "聚合",
    items: [
      { sig: "@Count(array)", desc: "数组长度" },
      { sig: "@Sum(array)", desc: "数值求和" },
      { sig: "@Avg(array)", desc: "平均值" },
      { sig: "@Min(array)", desc: "最小值" },
      { sig: "@Max(array)", desc: "最大值" },
      { sig: "@First(array)", desc: "第一个元素" },
      { sig: "@Last(array)", desc: "最后一个元素" },
    ],
  },
  {
    name: "过滤与排序",
    items: [
      { sig: "@Filter(array, field, op, value)", desc: "支持 ==、!=、>、<、>=、<=、contains" },
      { sig: "@Sort(array, field, direction?)", desc: '方向为 "asc"（默认）或 "desc"' },
    ],
  },
  {
    name: "数学",
    items: [
      { sig: "@Round(number, decimals?)", desc: "四舍五入到 N 位小数" },
      { sig: "@Abs(number)", desc: "绝对值" },
      { sig: "@Floor(number)", desc: "向下取整" },
      { sig: "@Ceil(number)", desc: "向上取整" },
    ],
  },
  {
    name: "迭代",
    items: [
      { sig: '@Each(array, "item", template)', desc: "为数组中每个元素渲染模板" },
    ],
  },
  {
    name: "动作步骤",
    items: [
      { sig: "@Run(ref)", desc: "执行 Mutation 或重新获取 Query" },
      { sig: "@Set($var, value)", desc: "修改某个 $ 变量" },
      { sig: "@Reset($var1, $var2)", desc: "将 $ 变量恢复为默认值" },
      { sig: '@ToAssistant("msg")', desc: "向助手发送一条消息" },
      { sig: '@OpenUrl("url")', desc: "在新标签页打开链接" },
    ],
  },
];

export const KPI_PATTERN = `kpi = Card([
  TextContent("Open Tickets", "small"),
  TextContent("" + @Count(@Filter(data.rows, "status", "==", "open")), "large-heavy")
])`;

/* ---------------------------------------------------------------------- */
/* 演练场样例：作者手写，全部由 openuiLibrary 在浏览器里实时渲染            */
/* ---------------------------------------------------------------------- */

export const SAMPLES: LangSample[] = [
  {
    id: "overview",
    label: "组件速览",
    scenario: "内置组件库一览",
    note: "Tabs、Accordion、Steps、Form、Chart、Callout 都由 openuiLibrary 预置。表单里的输入框可以真的输入，校验规则来自 Lang 里的 rules 对象。",
    code: `root = Stack([head, tabs, faq], "column", "l")
head = CardHeader("内置组件速览", "下面每一个组件都来自 openuiLibrary")
tabs = Tabs([tabCharts, tabForms, tabText])
tabCharts = TabItem("charts", "图表", [chart])
chart = BarChart(["一月", "二月", "三月", "四月"], [seriesA], "grouped", "月份", "完成度")
seriesA = Series("完成度", [62, 78, 91, 55])
tabForms = TabItem("forms", "表单", [form])
form = Form("demo", btns, [nameField, planField])
nameField = FormControl("名称", Input("name", "给你的项目起个名字", "text", { required: true, minLength: 2 }))
planField = FormControl("方案", Select("plan", plans, "请选择方案"), "随时可以更改")
plans = [SelectItem("free", "Free"), SelectItem("pro", "Pro"), SelectItem("team", "Team")]
btns = Buttons([okBtn], "row")
okBtn = Button("确认", Action([@ToAssistant("确认这个方案")]), "primary")
tabText = TabItem("text", "流程", [steps, callout])
steps = Steps([st1, st2, st3])
st1 = StepsItem("定义组件库", "用 Zod schema 描述模型可以生成什么")
st2 = StepsItem("生成系统提示", "library.prompt() 输出组件签名与全部规则")
st3 = StepsItem("流式渲染", "Renderer 在 token 到达时增量解析")
callout = Callout("info", "宽容解析", "非法片段会被丢弃，不影响其余部分继续渲染。")
faq = Accordion([q1, q2])
q1 = AccordionItem("q1", "与 JSON 相比省多少 token？", [a1])
a1 = TextContent("官方基准：总体比 Vercel JSON-Render 少 52.8%，峰值场景少 67.1%。")
q2 = AccordionItem("q2", "组件可以自己定义吗？", [a2])
a2 = TextContent("可以。defineComponent + createLibrary 就能扩展出你自己的组件库。")`,
  },
  {
    id: "table",
    label: "简单表格",
    scenario: "简单表格",
    note: "表格是列导向的：每个 Col 自带一列数据。状态列直接放 Tag 组件数组，指定 type 为 action。",
    official: { vercel: 340, c1: 357, lang: 148 },
    code: `root = Stack([head, table], "column", "m")
head = CardHeader("本周工单", "4 条 · 示例数据")
table = Table([colTicket, colOwner, colStatus, colAge])
colTicket = Col("工单", ["OP-2041", "OP-2042", "OP-2049", "OP-2053"])
colOwner = Col("负责人", ["林", "周", "陈", "赵"])
colStatus = Col("状态", [s1, s2, s3, s4], "action")
s1 = Tag("处理中", null, "sm", "info")
s2 = Tag("待响应", null, "sm", "warning")
s3 = Tag("已关闭", null, "sm", "success")
s4 = Tag("处理中", null, "sm", "info")
colAge = Col("停留（天）", [3, 1, 7, 2], "number")`,
  },
  {
    id: "chart",
    label: "带数据的图表",
    scenario: "带数据的图表",
    note: "图表只需要两个东西：类别标签数组，以及一个或多个 Series。系列名会成为图例。",
    official: { vercel: 520, c1: 516, lang: 231 },
    code: `root = Stack([head, chart], "column", "m")
head = CardHeader("近 7 日生成量", "单位：千次")
chart = BarChart(labels, [seriesA, seriesB], "grouped", "日期", "千次")
labels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
seriesA = Series("OpenUI Lang", [42, 48, 51, 63, 70, 58, 61])
seriesB = Series("等价 JSON", [40, 45, 49, 60, 66, 55, 57])`,
  },
  {
    id: "form",
    label: "联系表单",
    scenario: "联系表单",
    note: "每个 FormControl 单独引用，渲染器就能逐字段流式出现。errors 对象直接映射到校验规则，错误提示由渲染器负责，不需要模型写文案。试着留空点提交。",
    official: { vercel: 893, c1: 849, lang: 294 },
    code: `root = Stack([head, form], "column", "m")
head = CardHeader("联系我们", "提交后会带着内容进入下一轮对话")
form = Form("contact", btns, [nameField, emailField, topicField, msgField])
nameField = FormControl("姓名", Input("name", "你的名字", "text", { required: true, minLength: 2 }))
emailField = FormControl("邮箱", Input("email", "you@example.com", "email", { required: true, email: true }))
topicField = FormControl("主题", Select("topic", topics, "请选择"), "选择最接近的一项")
topics = [SelectItem("docs", "文档问题"), SelectItem("bug", "缺陷反馈"), SelectItem("idea", "功能建议")]
msgField = FormControl("留言", TextArea("message", "想说点什么…", 4, { required: true, minLength: 10 }), "至少 10 个字")
btns = Buttons([submitBtn, cancelBtn], "row")
submitBtn = Button("提交", Action([@ToAssistant("提交联系表单")]), "primary")
cancelBtn = Button("取消", Action([@ToAssistant("取消提交")]), "secondary")`,
  },
  {
    id: "dashboard",
    label: "仪表盘",
    scenario: "仪表盘",
    note: "KPI 卡片用 Stack(direction: row, wrap: true) 排布，卡片在同一行里自动均分空间；折线图用 natural 变体。",
    official: { vercel: 2247, c1: 2261, lang: 1226 },
    code: `root = Stack([head, kpis, chartCard], "column", "l")
head = CardHeader("运营看板", "数据为演示用示例值")
kpis = Stack([k1, k2, k3], "row", "m", "stretch", "start", true)
k1 = Card([k1l, k1v, k1t], "card")
k1l = TextContent("今日活跃用户", "small")
k1v = TextContent("12,480", "large-heavy")
k1t = Tag("+8.2%", null, "sm", "success")
k2 = Card([k2l, k2v, k2t], "card")
k2l = TextContent("平均会话时长", "small")
k2v = TextContent("6m 12s", "large-heavy")
k2t = Tag("+1.4%", null, "sm", "success")
k3 = Card([k3l, k3v, k3t], "card")
k3l = TextContent("流失率", "small")
k3v = TextContent("2.7%", "large-heavy")
k3t = Tag("-0.3%", null, "sm", "info")
chartCard = Card([chartHead, chart], "card")
chartHead = CardHeader("近 7 日活跃与新增", "单位：人")
chart = LineChart(["周一", "周二", "周三", "周四", "周五", "周六", "周日"], [lineA, lineB], "natural", "日期", "人数")
lineA = Series("活跃", [9200, 10400, 9800, 11800, 12480, 10300, 9900])
lineB = Series("新增", [1800, 2100, 1900, 2400, 2600, 2300, 2000])`,
  },
  {
    id: "pricing",
    label: "定价页面",
    scenario: "定价页面",
    note: "三档方案就是三张 Card 横排；列表用 MarkDownRenderer 渲染，主推方案用 primary 按钮区分主动作。",
    official: { vercel: 2487, c1: 2379, lang: 1195 },
    code: `root = Stack([head, plans, note], "column", "l")
head = CardHeader("定价", "按 token 计费，无最低消费")
plans = Stack([free, pro, team], "row", "m", "stretch", "start", true)
free = Card([freeName, freePrice, freeLine, freeList, freeBtn], "card")
freeName = TextContent("Free", "small-heavy")
freePrice = TextContent("¥0", "large-heavy")
freeLine = TextContent("每月 10 万 token 额度", "small")
freeList = MarkDownRenderer("- 1 个组件库\n- 社区支持")
freeBtn = Button("开始使用", Action([@ToAssistant("了解 Free 方案")]), "secondary")
pro = Card([proName, proPrice, proLine, proList, proBtn], "card")
proName = TextContent("Pro", "small-heavy")
proPrice = TextContent("¥299", "large-heavy")
proLine = TextContent("每月 500 万 token 额度", "small")
proList = MarkDownRenderer("- 10 个组件库\n- 邮件支持\n- 用量分析")
proBtn = Button("升级到 Pro", Action([@ToAssistant("升级到 Pro")]), "primary")
team = Card([teamName, teamPrice, teamLine, teamList, teamBtn], "card")
teamName = TextContent("Team", "small-heavy")
teamPrice = TextContent("按需", "large-heavy")
teamLine = TextContent("共享额度与审计日志", "small")
teamList = MarkDownRenderer("- 无限组件库\n- 单点登录\n- 专属支持")
teamBtn = Button("联系销售", Action([@ToAssistant("联系销售")]), "secondary")
note = Callout("info", "计费口径", "这里的价格只是演示数据，用来展示渲染效果。")`,
  },
  {
    id: "settings",
    label: "设置面板",
    scenario: "设置面板",
    note: "复选框、下拉、开关组都走同一个 Form。SwitchGroup 的 card 变体让每个开关成为独立卡片。",
    official: { vercel: 1244, c1: 1205, lang: 540 },
    code: `root = Stack([head, card], "column", "m")
head = CardHeader("通知设置", "按需开启，随时可以改")
card = Card([form], "card")
form = Form("notify", btns, [chField, freqField, quietField])
chField = FormControl("渠道", CheckBoxGroup("channels", chItems), "可以多选")
chItems = [CheckBoxItem("邮件", "每日摘要", "email", true), CheckBoxItem("站内", "即时提醒", "inapp", false)]
freqField = FormControl("聚合频率", Select("freq", freqItems, "选择频率"))
freqItems = [SelectItem("realtime", "实时"), SelectItem("hourly", "每小时"), SelectItem("daily", "每天")]
quietField = FormControl("免打扰", SwitchGroup("quiet", quietItems, "card"), "开启后不推送")
quietItems = [SwitchItem("夜间免打扰", "22:00 - 08:00", "night", true), SwitchItem("周末免打扰", "周六日不推送", "weekend", false)]
btns = Buttons([saveBtn], "row")
saveBtn = Button("保存设置", Action([@ToAssistant("保存通知设置")]), "primary")`,
  },
  {
    id: "commerce",
    label: "电商产品",
    scenario: "电商产品",
    note: "商品卡是 Card 横向 wrap 排布，标签用 TagBlock 一次传入字符串数组。",
    official: { vercel: 2449, c1: 2381, lang: 1166 },
    code: `root = Stack([head, grid], "column", "m")
head = CardHeader("热销商品", "4 件 · 演示数据")
grid = Stack([p1, p2, p3, p4], "row", "m", "stretch", "start", true)
p1 = Card([p1n, p1p, p1tags, p1btn], "card")
p1n = TextContent("机械键盘 · 87 键", "small-heavy")
p1p = TextContent("¥ 599", "large-heavy")
p1tags = TagBlock(["静音", "热插拔", "现货"])
p1btn = Button("加入购物车", Action([@ToAssistant("把机械键盘加入购物车")]), "secondary")
p2 = Card([p2n, p2p, p2tags, p2btn], "card")
p2n = TextContent("人体工学椅", "small-heavy")
p2p = TextContent("¥ 1,280", "large-heavy")
p2tags = TagBlock(["网布", "可调腰托", "预售"])
p2btn = Button("加入购物车", Action([@ToAssistant("把人体工学椅加入购物车")]), "secondary")
p3 = Card([p3n, p3p, p3tags, p3btn], "card")
p3n = TextContent("27 寸 4K 显示器", "small-heavy")
p3p = TextContent("¥ 2,099", "large-heavy")
p3tags = TagBlock(["色准 ΔE<2", "Type-C 供电", "现货"])
p3btn = Button("加入购物车", Action([@ToAssistant("把显示器加入购物车")]), "secondary")
p4 = Card([p4n, p4p, p4tags, p4btn], "card")
p4n = TextContent("降噪耳机", "small-heavy")
p4p = TextContent("¥ 899", "large-heavy")
p4tags = TagBlock(["40h 续航", "LDAC", "现货"])
p4btn = Button("加入购物车", Action([@ToAssistant("把降噪耳机加入购物车")]), "secondary")`,
  },
];
