import type { StockState } from "@/lib/catalog";

const dot: Record<StockState["kind"], string> = {
  "in-stock": "bg-success",
  low: "bg-danger",
  "sold-out": "bg-subtle",
};

export function StockStatus({ state }: { state: StockState }) {
  return (
    <p className={`flex items-center gap-2 text-xs ${state.kind === "low" ? "text-danger" : "text-muted"}`}>
      <span className={`size-1.5 rounded-full ${dot[state.kind]}`} aria-hidden="true" />
      {state.label}
    </p>
  );
}
