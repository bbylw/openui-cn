import type { ReactNode } from "react";
/* OpenUI 组件样式只在项目里引入这一处（分层变体，全部包进 @layer openui）。
   layers.css 已在入口先声明层序，所以这份后到的样式表仍落在 openui 层，不会压过站点样式。 */
import "@openuidev/react-ui/layered/styles/index.css";
import { Renderer } from "@openuidev/react-lang";
import { ThemeProvider, openuiLibrary } from "@openuidev/react-ui";

/**
 * 这个模块是 OpenUI 运行时的唯一入口，只通过动态 import 加载。
 * 它（连同 recharts / react-syntax-highlighter / radix 等）会被切成独立的分块，
 * 首屏只加载站点自身的外壳，渲染器到达后再显示真实界面。
 */

export type OpenUIMode = "light" | "dark";

/** OpenUI 的 token 注入到 body（默认 cssSelector），组件与 portal 都能继承到。 */
export function OpenUITheme({ mode, children }: { mode: OpenUIMode; children: ReactNode }) {
  return <ThemeProvider mode={mode}>{children}</ThemeProvider>;
}

export function OpenUILangPreview({
  response,
  isStreaming,
}: {
  response: string;
  isStreaming: boolean;
}) {
  return <Renderer library={openuiLibrary} response={response} isStreaming={isStreaming} />;
}
