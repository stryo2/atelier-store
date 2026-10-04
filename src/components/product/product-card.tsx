import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@/components/icons";
import {
  formatPrice,
  productHref,
  productImage,
  stockState,
  type Product,
} from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const stock = stockState(product);
  // Stock state outranks marketing badges on the listing.
  const flag = stock.kind === "sold-out" ? "Sold out" : stock.kind === "low" ? "Low stock" : product.badge;

  return (
    <article className="group relative">
      <Link href={productHref(product)} className="block">
        <div className="media-frame">
          <Image
            src={productImage(product)}
            alt={product.name}
            fill
            sizes="(min-width: 80rem) 25vw, (min-width: 64rem) 33vw, 50vw"
            className={`transition-transform duration-700 ease-editorial group-hover:scale-[1.03] ${
              stock.kind === "sold-out" ? "opacity-60" : ""
            }`}
          />
        </div>
        <div className="mt-4 flex flex-col gap-1 pr-8">
          {flag && (
            <span className={`eyebrow ${stock.kind === "in-stock" ? "text-muted" : "text-danger"}`}>
              {flag}
            </span>
          )}
          <h3 className="text-sm">{product.name}</h3>
          <p className="meta">{product.detail}</p>
          <p className="price mt-1">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <button
        type="button"
        className="btn-icon absolute top-2 right-2 bg-paper/0 hover:bg-paper/70"
        aria-label={`Save ${product.name} to wishlist`}
      >
        <HeartIcon width={18} height={18} />
      </button>
    </article>
  );
}
