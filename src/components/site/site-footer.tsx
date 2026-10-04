import Link from "next/link";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { footerColumns } from "@/lib/sample-data";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-wide section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-paper/60">Newsletter</p>
            <p className="display-sm mt-4 max-w-md">
              Receive news of new collections, events and private appointments.
            </p>
            <NewsletterForm tone="dark" className="mt-8 max-w-md" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow text-paper/60">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((label) => (
                    <li key={label}>
                      <Link
                        href={`/${slug(label)}`}
                        className="text-sm text-paper/90 transition-colors hover:text-paper hover:underline underline-offset-4"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-serif text-4xl tracking-[0.32em] uppercase sm:text-5xl">Atelier</p>
          <div className="flex flex-col gap-2 text-xs text-paper/60 sm:items-end">
            <span className="eyebrow">United States · English · USD</span>
            <span>© {new Date().getFullYear()} Atelier. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
