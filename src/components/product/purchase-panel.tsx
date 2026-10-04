"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/icons";
import type { Size, StockState } from "@/lib/catalog";

type Props = {
  productName: string;
  sizes?: Size[];
  stock: StockState;
};

// Sample-only: there is no cart yet, so "Add to bag" just confirms locally.
export function PurchasePanel({ productName, sizes, stock }: Props) {
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const soldOut = stock.kind === "sold-out";

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 3000);
    return () => clearTimeout(t);
  }, [added]);

  const addToBag = () => {
    if (sizes?.length && !size) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    setAdded(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {sizes && sizes.length > 0 && (
        <fieldset>
          <div className="mb-3 flex items-baseline justify-between">
            <legend className="label">
              Size{size && <span className="ml-2 font-normal normal-case tracking-normal text-muted">{size}</span>}
            </legend>
            <Link href="/size-guide" className="link text-xs">
              Size guide
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
            {sizes.map((s) => {
              const selected = size === s.label;
              return (
                <button
                  key={s.label}
                  type="button"
                  disabled={!s.inStock}
                  aria-pressed={selected}
                  aria-label={s.inStock ? `Size ${s.label}` : `Size ${s.label}, sold out`}
                  onClick={() => {
                    setSize(s.label);
                    setError(null);
                  }}
                  className={`flex min-h-12 items-center justify-center border text-xs transition-colors ${
                    selected
                      ? "border-ink bg-ink text-paper"
                      : s.inStock
                        ? "border-line hover:border-ink"
                        : "cursor-not-allowed border-line text-subtle line-through"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-3">
        {soldOut ? (
          <>
            <button type="button" className="btn btn-primary btn-block" disabled>
              Sold Out
            </button>
            <button type="button" className="btn btn-secondary btn-block">
              Notify Me When Available
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary btn-block" onClick={addToBag}>
            {added ? "Added to Bag" : "Add to Bag"}
          </button>
        )}
        <button
          type="button"
          className="btn btn-secondary btn-block"
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
        >
          <HeartIcon width={16} height={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved to Wishlist" : "Save to Wishlist"}
        </button>
      </div>

      <p role="status" className={`min-h-5 text-xs ${error ? "text-danger" : "text-success"}`}>
        {error ?? (added ? `${productName}${size ? `, size ${size},` : ""} has been added to your bag.` : "")}
      </p>
    </div>
  );
}
