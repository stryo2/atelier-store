"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  images: string[];
  name: string;
};

// Swipeable full-bleed carousel on mobile; on desktop a lead image followed
// by a two-up grid of detail shots, all in the same DOM.
export function ProductGallery({ images, name }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = scroller.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:gap-(--grid-gap-x) lg:overflow-visible"
        aria-label={`${name} images`}
        role="region"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className={`media-frame w-full shrink-0 snap-start ${i === 0 ? "lg:col-span-2 lg:aspect-4/5" : ""}`}
          >
            <Image
              src={src}
              alt={i === 0 ? name : `${name}, detail ${i}`}
              fill
              preload={i === 0}
              sizes={i === 0 ? "(min-width: 64rem) 58vw, 100vw" : "(min-width: 64rem) 29vw, 100vw"}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <p
          className="eyebrow absolute right-(--gutter) bottom-4 bg-paper/85 px-2.5 py-1 lg:hidden"
          aria-live="polite"
        >
          {index + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
