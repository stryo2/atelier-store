import Image from "next/image";
import Link from "next/link";
import { editorial } from "@/lib/sample-data";

export function EditorialSplit() {
  return (
    <section className="grid bg-surface md:grid-cols-2">
      <div className="relative aspect-4/5 md:aspect-auto md:min-h-[44rem]">
        <Image
          src={editorial.atelier}
          alt="Knitwear and tailored pieces hanging in a sunlit studio"
          fill
          sizes="(min-width: 48rem) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-(--gutter) py-(--section-y) md:px-[8%]">
        <div className="max-w-md">
          <p className="eyebrow text-muted">The Atelier</p>
          <h2 className="display-md mt-4">Made Slowly, Made to Last</h2>
          <p className="mt-6 text-muted">
            Each piece begins in our studio, where patterns are drafted by hand and fabrics are
            chosen for how they wear over years, not seasons. Small runs, considered details and
            finishing done one garment at a time.
          </p>
          <Link href="/craftsmanship" className="btn btn-secondary mt-10">
            Our Craftsmanship
          </Link>
        </div>
      </div>
    </section>
  );
}
