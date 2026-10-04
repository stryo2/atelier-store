// Drizzle table definitions live here (or re-export them from this file).
//
// Better Auth needs its own tables (user, session, account, verification).
// Generate them with:  npx @better-auth/cli generate --output src/db/auth-schema.ts
// then add:            export * from "./auth-schema";

import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
// Relative import: drizzle-kit loads this file outside Next's path aliases.
import type { CropName } from "../lib/unsplash";

/** Size picker entry. Availability is set by hand; stock is tracked per product. */
export type Size = {
  label: string;
  inStock: boolean;
};

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const productBadge = pgEnum("product_badge", ["New", "Exclusive"]);

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamps.createdAt,
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    /** Short material/colour line shown under the name. */
    detail: text("detail").notNull(),
    description: text("description").notNull(),
    details: text("details").array().notNull().default(sql`'{}'::text[]`),
    /** Price in minor units (cents). */
    priceCents: integer("price_cents").notNull(),
    /** Unsplash photo id of the main image. */
    photo: text("photo").notNull(),
    /** Extra detail crops of the main photo, shown after it in the gallery. */
    crops: text("crops").array().$type<CropName[]>().notNull().default(sql`'{}'::text[]`),
    /** Null for one-size products (no size picker). */
    sizes: jsonb("sizes").$type<Size[]>(),
    badge: productBadge("badge"),
    ...timestamps,
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    check("products_price_cents_nonnegative", sql`${t.priceCents} >= 0`),
  ],
);

export const productStock = pgTable(
  "product_stock",
  {
    productId: integer("product_id")
      .primaryKey()
      .references(() => products.id, { onDelete: "cascade" }),
    /** Units available across all sizes; 0 means sold out. */
    quantity: integer("quantity").notNull().default(0),
    updatedAt: timestamps.updatedAt,
  },
  (t) => [check("product_stock_quantity_nonnegative", sql`${t.quantity} >= 0`)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stock: one(productStock),
}));

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, { fields: [productStock.productId], references: [products.id] }),
}));
