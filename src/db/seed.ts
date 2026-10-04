// Loads the initial catalogue into the database. Safe to re-run: rows are
// upserted by slug, so existing data is updated rather than duplicated.
//
//   npm run db:seed

import { sql, type SQL } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";
import { db } from "./index";
import { categories, products, productStock } from "./schema";
import * as data from "./seed-data";

/** `excluded.<column>` for each column, for ON CONFLICT DO UPDATE SET. */
function excluded<T extends Record<string, PgColumn>>(columns: T) {
  return Object.fromEntries(
    Object.entries(columns).map(([key, column]) => [key, sql.raw(`excluded."${column.name}"`)]),
  ) as Record<keyof T, SQL>;
}

const categoryIdOf = (slug: string) => sql`(select id from ${categories} where slug = ${slug})`;
const productIdOf = (slug: string) => sql`(select id from ${products} where slug = ${slug})`;

async function main() {
  // One batch runs as a single transaction. Later statements look up ids by
  // slug, since the neon-http driver can't pass results between statements.
  await db.batch([
    db
      .insert(categories)
      .values(data.categories.map((c, i) => ({ slug: c.slug, name: c.name, sortOrder: i })))
      .onConflictDoUpdate({
        target: categories.slug,
        set: excluded({ name: categories.name, sortOrder: categories.sortOrder }),
      }),

    db
      .insert(products)
      .values(
        data.products.map((p) => ({
          slug: p.slug,
          categoryId: categoryIdOf(p.category),
          name: p.name,
          detail: p.detail,
          description: p.description,
          details: p.details,
          priceCents: p.price * 100,
          photo: p.photo,
          crops: p.crops,
          sizes: p.sizes ?? null,
          badge: p.badge ?? null,
        })),
      )
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          ...excluded({
            categoryId: products.categoryId,
            name: products.name,
            detail: products.detail,
            description: products.description,
            details: products.details,
            priceCents: products.priceCents,
            photo: products.photo,
            crops: products.crops,
            sizes: products.sizes,
            badge: products.badge,
          }),
          updatedAt: sql`now()`,
        },
      }),

    db
      .insert(productStock)
      .values(data.products.map((p) => ({ productId: productIdOf(p.slug), quantity: p.stock })))
      .onConflictDoUpdate({
        target: productStock.productId,
        set: { ...excluded({ quantity: productStock.quantity }), updatedAt: sql`now()` },
      }),
  ]);

  console.log(
    `Seeded ${data.categories.length} categories and ${data.products.length} products with stock.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
