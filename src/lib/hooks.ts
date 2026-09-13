import { useCallback, useEffect, useState } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------------------------------------------------------------- */
/* 视口入场：单例 IntersectionObserver，threshold 为 0，                          */
/* 避免「超高容器永远不触发」的老问题。                                          */
/* ---------------------------------------------------------------------- */

let observer: IntersectionObserver | null = null;
const handlers = new WeakMap<Element, () => void>();

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const fn = handlers.get(entry.target);
        handlers.delete(entry.target);
        observer?.unobserve(entry.target);
        fn?.();
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return observer;
}

export function useInView<T extends Element>(ref: { current: T | null }): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    // 首屏元素同步判定，避免等 IntersectionObserver 回调才开启动画
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const io = getObserver();
    handlers.set(node, () => setInView(true));
    io.observe(node);
    return () => {
      handlers.delete(node);
      io.unobserve(node);
    };
  }, [ref, inView]);

  return inView;
}

/* ---------------------------------------------------------------------- */
/* 打字/流式揭示：把一段文本按时间线性揭示出来                                   */
/* ---------------------------------------------------------------------- */

export function useTypewriter(text: string, runKey: number, enabled = true) {
  const [shown, setShown] = useState(enabled ? 0 : text.length);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setShown(text.length);
      setStreaming(false);
      return;
    }
    if (prefersReducedMotion()) {
      setShown(text.length);
      setStreaming(false);
      return;
    }

    let raf = 0;
    let started = 0;
    let skipped = 0;
    const duration = Math.max(1100, Math.min(2800, text.length * 5.2));

    setShown(0);
    setStreaming(true);

    const tick = (now: number) => {
      if (!started) started = now;
      const progress = Math.min(1, (now - started) / duration);
      // 隔帧更新，降低渲染器重复解析的压力
      skipped += 1;
      if (skipped % 2 === 0 || progress >= 1) {
        setShown(Math.floor(progress * text.length));
      }
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setShown(text.length);
        setStreaming(false);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, runKey, enabled]);

  const finish = useCallback(() => {
    setShown(text.length);
    setStreaming(false);
  }, []);

  return { shown, streaming, finish };
}
