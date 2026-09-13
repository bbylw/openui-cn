import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
};

export function PageHero({ eyebrow, title, sub, meta }: Props) {
  return (
    <section className="phero">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="phero__title">{title}</h1>
        {sub ? <p className="phero__sub">{sub}</p> : null}
        {meta ? <div className="phero__meta">{meta}</div> : null}
      </div>
    </section>
  );
}
