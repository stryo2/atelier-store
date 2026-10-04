import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/home/section-heading";
import { Breadcrumbs } from "@/components/product/breadcrumbs";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { StockStatus } from "@/components/product/stock-status";
import {
  categoryHref,
  formatPrice,
  getAllProducts,
  getProduct,
  getRelatedProducts,
  productGallery,
  productImage,
  stockState,
} from "@/lib/catalog";

// Re-render at most once a minute so stock changes reach the page.
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [productImage(product)] },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const { category } = product;
  const stock = stockState(product);
  const related = await getRelatedProducts(product);

  return (
    <>
      <div className="container-wide py-4 lg:py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category.label, href: categoryHref(category) },
            { label: product.name },
          ]}
        />
      </div>

      <div className="lg:container-wide lg:grid lg:grid-cols-12 lg:gap-(--grid-gap-x)">
        <div className="lg:col-span-7">
          <ProductGallery images={productGallery(product)} name={product.name} />
        </div>

        <div className="px-(--gutter) pt-8 pb-(--section-y) lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-4 lg:col-start-9 lg:self-start lg:px-0 lg:pt-0">
          <div className="flex items-center gap-3">
            <Link href={categoryHref(category)} className="eyebrow text-muted transition-colors hover:text-ink">
              {category.label}
            </Link>
            {product.badge && (
              <>
                <span className="eyebrow text-subtle" aria-hidden="true">·</span>
                <span className="eyebrow">{product.badge}</span>
              </>
            )}
          </div>

          <h1 className="display-sm mt-4">{product.name}</h1>
          <p className="meta mt-2">{product.detail}</p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="price text-base">{formatPrice(product.price)}</p>
            <StockStatus state={stock} />
          </div>

          <p className="mt-6 text-muted">{product.description}</p>

          <div className="mt-8">
            <PurchasePanel productName={product.name} sizes={product.sizes} stock={stock} />
          </div>

          <ul className="meta mt-2 flex flex-col gap-2 border-t border-line pt-6">
            <li>Complimentary express shipping</li>
            <li>Free returns within 30 days</li>
            <li>Arrives in signature packaging</li>
          </ul>

          <div className="mt-8">
            <ProductAccordion
              items={[
                {
                  title: "Product Details",
                  defaultOpen: true,
                  content: (
                    <ul className="flex list-disc flex-col gap-1.5 pl-4">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Shipping & Returns",
                  content: (
                    <p>
                      Orders ship within one business day by express courier, with signature on
                      delivery. Return unworn items within 30 days for a full refund, free of charge.
                    </p>
                  ),
                },
                {
                  title: "Care & Craftsmanship",
                  content: (
                    <p>
                      Store in the dust bag provided, away from direct sunlight. For repairs or
                      after-care, contact a client advisor or visit any boutique.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section className="container-wide section rule">
        <SectionHeading eyebrow={category.label} title="You May Also Like" />
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
