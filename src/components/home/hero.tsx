import Image from "next/image";
import Link from "next/link";
import { editorial } from "@/lib/sample-data";

export function Hero() {
  return (
    <section className="relative">
      <div className="media-hero md:aspect-auto! md:h-[calc(100svh-var(--header-h)-2.25rem)] md:min-h-[36rem] md:max-h-[64rem]">
        <Image
          src={editorial.hero}
          alt="Model in a pale blue wool coat on a city square"
          fill
          preload
          sizes="100vw"
          className="object-[50%_30%]"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-wide pb-10 text-paper md:pb-16">
          <p className="eyebrow">Autumn–Winter 2026</p>
          <h1 className="display-lg mt-4 max-w-3xl">Quiet Structure</h1>
          <p className="mt-4 max-w-md text-sm text-paper/85 md:text-base">
            Soft-shouldered coats, tactile wools and leather pieces cut to be lived in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections/new" className="btn btn-inverse">
              Discover the Collection
            </Link>
            <Link href="/collections/women" className="btn btn-ghost text-paper hover:text-paper/70">
              Shop Women
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
