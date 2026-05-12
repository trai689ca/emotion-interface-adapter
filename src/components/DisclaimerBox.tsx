import { useId, type ReactNode } from "react";

type DisclaimerBoxProps = {
  title: string;
  children: ReactNode;
};

export function DisclaimerBox({ title, children }: DisclaimerBoxProps) {
  const titleId = useId();

  return (
    <aside className="surface notice-box" aria-labelledby={titleId}>
      <h2 className="notice-title" id={titleId}>
        {title}
      </h2>
      <p>{children}</p>
    </aside>
  );
}
