import type { ReactNode } from "react";

type Item = {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

// Native <details> so it works without JavaScript.
export function ProductAccordion({ items }: { items: Item[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.title} open={item.defaultOpen} className="group border-b border-line">
          <summary className="label flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
            {item.title}
            <span
              aria-hidden="true"
              className="relative size-3 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <div className="pb-6 text-sm text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
