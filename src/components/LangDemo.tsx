import { Component, lazy, Suspense, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LangCode } from "@/components/LangCode";
import { useInView, useTypewriter } from "@/lib/hooks";
import { useThemeModeValue } from "@/lib/theme";

/* OpenUI 运行时按需加载：首屏只渲染左侧的 Lang 流，渲染器分块到达后再接管右栏 */
const OpenUITheme = lazy(() =>
  import("@/lib/openui-runtime").then((m) => ({ default: m.OpenUITheme })),
);
const OpenUILangPreview = lazy(() =>
  import("@/lib/openui-runtime").then((m) => ({ default: m.OpenUILangPreview })),
);

class RenderBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type Props = {
  code: string;
  runKey: number;
  /** 进入视口后才开始流式播放 */
  autoRun?: boolean;
  label: ReactNode;
  footer?: ReactNode;
};

export function LangDemo({ code, runKey, autoRun = true, label, footer }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  const [forced, setForced] = useState(false);
  const mode = useThemeModeValue();
  const enabled = autoRun && (inView || forced);
  const { shown, streaming, finish } = useTypewriter(code, runKey, enabled);

  const visible = enabled ? code.slice(0, shown) : code;

  return (
    <div className="stage" ref={stageRef}>
      <div className="stage__bar">
        <span className="stage__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="stage__label">{label}</span>
        <span className="stage__live">
          <i style={streaming ? undefined : { animation: "none", opacity: 0.5 }} />
          {streaming ? "STREAMING" : "IDLE"}
        </span>
      </div>

      <div className="stage__split">
        <div className="stage__pane">
          <div className="pane__cap">
            <span>OpenUI Lang 流</span>
            <span>
              {visible.length} / {code.length} 字符
            </span>
          </div>
          <div className="pane__body">
            <LangCode code={visible} caret={streaming} />
          </div>
        </div>

        <div className="stage__pane">
          <div className="pane__cap">
            <span>实时 UI</span>
            <span>
              <button
                type="button"
                className="code__copy"
                onClick={() => {
                  setForced(true);
                  finish();
                }}
              >
                {streaming ? "跳到结果" : "重放"}
              </button>
            </span>
          </div>
          <div className="pane__body">
            <RenderBoundary
              key={`${runKey}-${enabled ? 1 : 0}`}
              fallback={
                <div className="renderhost__hint">
                  这一段示例在当前环境下渲染失败。
                </div>
              }
            >
              {visible.length === 0 ? (
                <div className="renderhost__hint">等待第一个 token…</div>
              ) : (
                <div className="renderhost">
                  <Suspense
                    fallback={<div className="renderhost__hint">正在加载渲染器…</div>}
                  >
                    <OpenUITheme mode={mode}>
                      <OpenUILangPreview response={visible} isStreaming={streaming} />
                    </OpenUITheme>
                  </Suspense>
                </div>
              )}
            </RenderBoundary>
          </div>
        </div>
      </div>

      {footer}
    </div>
  );
}
