// Catalogue access layer. Pages and components read products only through
// here; rows from the database are mapped to the plain `Product` shape below.

import { asc, eq, inArray, ne, sql } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { categories, products, productStock, type Size } from "@/db/schema";
import { giftEditSlugs, newArrivalSlugs } from "./sample-data";
import { unsplash, type CropName } from "./unsplash";

export type { Size };

export type Category = {
  /** Category slug, used in collection URLs. */
  id: string;
  label: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: Category;
  /** Short material/colour line shown under the name. */
  detail: string;
  /** Whole currency units. */
  price: number;
  /** Unsplash photo id of the main image. */
  photo: string;
  /** Extra detail crops of the main photo, shown after it in the gallery. */
  crops: CropName[];
  /** Units available across all sizes; 0 means sold out. */
  stock: number;
  sizes?: Size[];
  badge?: "New" | "Exclusive";
  description: string;
  details: string[];
};

export type StockState =
  | { kind: "in-stock"; label: string }
  | { kind: "low"; label: string }
  | { kind: "sold-out"; label: string };

const LOW_STOCK_THRESHOLD = 3;

export function stockState(product: Product): StockState {
  if (product.stock <= 0) return { kind: "sold-out", label: "Sold out" };
  if (product.stock <= LOW_STOCK_THRESHOLD)
    return { kind: "low", label: `Low stock: only ${product.stock} left` };
  return { kind: "in-stock", label: "In stock" };
}

export const productHref = (product: Product) => `/products/${product.slug}`;
export const categoryHref = (category: Category) => `/collections/${category.id}`;

export const productImage = (product: Product) => unsplash(product.photo);
export const productGallery = (product: Product) => [
  unsplash(product.photo),
  ...product.crops.map((crop) => unsplash(product.photo, crop)),
];

export const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;

// Every product query loads its category and stock row alongside it.
const withRelations = { category: true, stock: true } as const;

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
  stock: typeof productStock.$inferSelect | null;
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: { id: row.category.slug, label: row.category.name },
    detail: row.detail,
    price: row.priceCents / 100,
    photo: row.photo,
    crops: row.crops,
    stock: row.stock?.quantity ?? 0,
    sizes: row.sizes ?? undefined,
    badge: row.badge ?? undefined,
    description: row.description,
    details: row.details,
  };
}

/** Loads products by slug, returned in the order of `slugs`. */
async function bySlug(slugs: string[]) {
  const rows = await db.query.products.findMany({
    where: inArray(products.slug, slugs),
    with: withRelations,
  });
  const found = new Map(rows.map((row) => [row.slug, toProduct(row)]));
  return slugs.map((slug) => found.get(slug)).filter((p): p is Product => !!p);
}

export async function getAllProducts() {
  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: asc(products.id),
  });
  return rows.map(toProduct);
}

// Deduplicated per request: the product page calls it from both
// generateMetadata and the page itself.
export const getProduct = cache(async (slug: string) => {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : undefined;
});

export function getNewArrivals() {
  return bySlug(newArrivalSlugs);
}

export function getGiftEdit() {
  return bySlug(giftEditSlugs);
}

/** Same-category products first, topped up with others, excluding the product itself. */
export async function getRelatedProducts(product: Product, limit = 4) {
  const rows = await db.query.products.findMany({
    where: ne(products.id, product.id),
    with: withRelations,
    orderBy: [
      sql`(${products.categoryId} = (select category_id from products where id = ${product.id})) desc`,
      asc(products.id),
    ],
    limit,
  });
  return rows.map(toProduct);
}
