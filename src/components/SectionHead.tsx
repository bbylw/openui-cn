import type { ReactNode } from "react";

type Props = {
  index: string;
  title: ReactNode;
  sub?: ReactNode;
  id?: string;
};

export function SectionHead({ index, title, sub, id }: Props) {
  return (
    <header className="band__head">
      <div className="band__line">
        <span className="band__idx">{index}</span>
      </div>
      <h2 className="band__title" id={id}>
        {title}
      </h2>
      {sub ? <p className="band__sub">{sub}</p> : null}
    </header>
  );
}
