import { CampaignPair } from "@/components/home/campaign-pair";
import { EditorialSplit } from "@/components/home/editorial-split";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/home/section-heading";
import { Services } from "@/components/home/services";
import { ProductCard } from "@/components/product/product-card";
import { getGiftEdit, getNewArrivals } from "@/lib/catalog";

// Re-render at most once a minute so stock changes reach the listings.
export const revalidate = 60;

export default async function HomePage() {
  const [newArrivals, giftEdit] = await Promise.all([getNewArrivals(), getGiftEdit()]);

  return (
    <>
      <Hero />

      <section className="container-text section text-center">
        <p className="eyebrow text-muted">The Season</p>
        <p className="display-sm mt-5">
          A wardrobe built on proportion and restraint: precise tailoring, supple leathers and
          knits finished by hand, made to be worn for years.
        </p>
      </section>

      <FeaturedCollections />

      <section className="container-wide section rule">
        <SectionHeading
          eyebrow="Just Arrived"
          title="New Arrivals"
          action={{ label: "View All", href: "/collections/new" }}
        />
        <div className="product-grid">
          {newArrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <EditorialSplit />

      <section className="container-wide section">
        <SectionHeading
          eyebrow="Gifts"
          title="The Gift Edit"
          action={{ label: "Shop Gifts", href: "/collections/gifts" }}
        />
        <div className="product-grid">
          {giftEdit.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <CampaignPair />

      <Services />
    </>
  );
}
