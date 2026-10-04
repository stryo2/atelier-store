import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { featuredCollections } from "@/lib/sample-data";
import { SectionHeading } from "./section-heading";

export function FeaturedCollections() {
  return (
    <section className="container-wide section">
      <SectionHeading eyebrow="Featured" title="The Collections" />
      {/* Horizontal snap rail on mobile, three-up grid from md */}
      <div className="-mx-(--gutter) flex snap-x snap-mandatory gap-(--grid-gap-x) overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        {featuredCollections.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="group w-[78vw] shrink-0 snap-start sm:w-[60vw] md:w-auto"
          >
            <div className="media-frame">
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 48rem) 33vw, 78vw"
                className="transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-muted">{c.eyebrow}</p>
                <h3 className="display-sm mt-2">{c.title}</h3>
              </div>
              <ArrowRightIcon className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
