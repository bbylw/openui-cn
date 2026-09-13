import type { ReactNode } from "react";
import { useRef } from "react";
import { useInView } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  /** 入场延迟（毫秒），用于给同级元素做级联 */
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
