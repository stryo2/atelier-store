import Image from "next/image";
import Link from "next/link";
import { editorial } from "@/lib/sample-data";

const tiles = [
  {
    eyebrow: "Men",
    title: "Tailoring, Reconsidered",
    cta: "Shop Tailoring",
    href: "/collections/men",
    image: editorial.tailoring,
    alt: "Close-up of a navy suit and striped tie",
  },
  {
    eyebrow: "Boutiques",
    title: "Visit Us in Store",
    cta: "Find a Boutique",
    href: "/stores",
    image: editorial.boutique,
    alt: "Warm-lit boutique window with garments on a rail",
  },
];

export function CampaignPair() {
  return (
    <section className="split gap-0">
      {tiles.map((t) => (
        <Link key={t.href} href={t.href} className="group relative block aspect-4/5 overflow-hidden">
          <Image
            src={t.image}
            alt={t.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-(--gutter) pb-10 text-paper md:p-10 xl:p-14">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="display-md mt-3">{t.title}</h2>
            <span className="label mt-6 inline-block underline decoration-1 underline-offset-[0.4em]">
              {t.cta}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
