import { Component, type ReactNode } from "react";
import { useRef, useState } from "react";
import { Renderer } from "@openuidev/react-lang";
import { openuiLibrary } from "@openuidev/react-ui";
import { LangCode } from "@/components/LangCode";
import { useInView, useTypewriter } from "@/lib/hooks";

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
                  <Renderer
                    library={openuiLibrary}
                    response={visible}
                    isStreaming={streaming}
                  />
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
