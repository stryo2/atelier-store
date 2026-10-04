// Initial catalogue, loaded into the database by src/db/seed.ts.
// The storefront reads products from the database, never from this file.

import type { CropName } from "../lib/unsplash";
import type { Size } from "./schema";

export type SeedCategory = {
  slug: string;
  name: string;
};

export type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  detail: string;
  /** Whole US dollars. */
  price: number;
  photo: string;
  crops: CropName[];
  stock: number;
  sizes?: Size[];
  badge?: "New" | "Exclusive";
  description: string;
  details: string[];
};

export const categories: SeedCategory[] = [
  { slug: "ready-to-wear", name: "Ready-to-Wear" },
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "accessories", name: "Accessories" },
  { slug: "jewelry", name: "Jewelry" },
];

const apparelSizes = (soldOut: string[] = []): Size[] =>
  ["XS", "S", "M", "L", "XL"].map((label) => ({ label, inStock: !soldOut.includes(label) }));

const shoeSizes = (range: number[], soldOut: number[] = []): Size[] =>
  range.map((n) => ({ label: String(n), inStock: !soldOut.includes(n) }));

export const products: SeedProduct[] = [
  {
    slug: "structured-top-handle-bag",
    name: "Structured Top Handle Bag",
    category: "bags",
    detail: "Pebbled calfskin, teal",
    price: 2450,
    photo: "1594223274512-ad4803739b7c",
    crops: ["center", "upper"],
    stock: 2,
    badge: "New",
    description:
      "A compact top handle bag with a rigid frame and a fold-over flap. The push-lock closure and detachable strap let it move from hand to shoulder.",
    details: [
      "Pebbled calfskin",
      "Gold-tone push-lock closure",
      "Detachable, adjustable shoulder strap",
      "Microfibre lining with one interior pocket",
      "W 24cm × H 18cm × D 10cm",
      "Made in Italy",
    ],
  },
  {
    slug: "biker-jacket",
    name: "Biker Jacket",
    category: "ready-to-wear",
    detail: "Lambskin leather, black",
    price: 3900,
    photo: "1521223890158-f9f7c3d5d504",
    crops: ["center", "upper"],
    stock: 8,
    sizes: apparelSizes(["XS"]),
    description:
      "Cut close to the body from supple lambskin, this biker jacket keeps the classic asymmetric zip and notched lapels with a softer, lighter hand.",
    details: [
      "100% lambskin leather",
      "Asymmetric front zip",
      "Three zipped pockets",
      "Cupro lining",
      "Specialist leather clean only",
      "Made in Italy",
    ],
  },
  {
    slug: "pointed-stiletto-pump",
    name: "Pointed Stiletto Pump",
    category: "shoes",
    detail: "Pebbled leather, ivory, 95mm",
    price: 980,
    photo: "1535043934128-cf0b28d52f95",
    crops: ["center", "lowerLeft"],
    stock: 0,
    sizes: shoeSizes([36, 37, 38, 39, 40, 41], [36, 37, 38, 39, 40, 41]),
    badge: "Exclusive",
    description:
      "A pointed-toe pump in softly pebbled ivory leather on a slender 95mm heel. Leather lined and cushioned at the footbed.",
    details: [
      "Pebbled calf leather upper",
      "Leather lining and sole",
      "95mm heel",
      "Fits true to size",
      "Made in Italy",
    ],
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "accessories",
    detail: "Gold-tone, green lenses",
    price: 520,
    photo: "1511499767150-a48a237f0083",
    crops: ["upper", "lowerLeft"],
    stock: 14,
    description:
      "A fine round frame in gold-tone metal with deep green lenses and adjustable nose pads. Supplied with a leather case.",
    details: [
      "Gold-tone metal frame",
      "Category 3 green lenses, 100% UV protection",
      "Adjustable nose pads",
      "Leather case and cleaning cloth included",
    ],
  },
  {
    slug: "lightweight-bomber",
    name: "Lightweight Bomber",
    category: "ready-to-wear",
    detail: "Technical twill, tobacco",
    price: 1650,
    photo: "1591047139829-d91aecb6caea",
    crops: ["center", "upper"],
    stock: 6,
    sizes: apparelSizes(["L"]),
    badge: "New",
    description:
      "An unlined bomber in water-repellent technical twill, finished with ribbed trims and a sleeve utility pocket. Light enough to layer year-round.",
    details: [
      "100% polyamide technical twill",
      "Water-repellent finish",
      "Two-way front zip",
      "Ribbed collar, cuffs and hem",
      "Machine wash cold",
    ],
  },
  {
    slug: "suede-brogue",
    name: "Suede Brogue",
    category: "shoes",
    detail: "Suede, emerald",
    price: 890,
    photo: "1560343090-f0409e92791a",
    crops: ["center", "lowerLeft"],
    stock: 3,
    sizes: shoeSizes([40, 41, 42, 43, 44, 45], [40, 45]),
    description:
      "A laceless brogue in brushed emerald suede with full wingtip perforation, on a stacked leather heel and Goodyear-welted sole.",
    details: [
      "Calf suede upper",
      "Leather lining",
      "Goodyear-welted leather sole",
      "Stacked 25mm heel",
      "Made in Portugal",
    ],
  },
  {
    slug: "hand-knit-poncho",
    name: "Hand-Knit Poncho",
    category: "ready-to-wear",
    detail: "Cotton crochet, ivory",
    price: 1200,
    photo: "1434389677669-e08b4cac3105",
    crops: ["center", "upper"],
    stock: 1,
    description:
      "Hand-crocheted in an open stitch from organic cotton, finished with a knotted fringe. One size, designed to drape.",
    details: [
      "100% organic cotton",
      "Hand-crocheted, approx. 30 hours per piece",
      "One size",
      "Hand wash cold, dry flat",
    ],
  },
  {
    slug: "tapered-cargo-trouser",
    name: "Tapered Cargo Trouser",
    category: "ready-to-wear",
    detail: "Silk blend, blush",
    price: 1100,
    photo: "1594633312681-425c7b97ccd1",
    crops: ["upper", "lowerLeft"],
    stock: 9,
    sizes: apparelSizes(),
    description:
      "A relaxed cargo trouser in fluid silk blend, with an elasticated waist, patch pockets and cuffed ankles.",
    details: [
      "70% silk, 30% viscose",
      "Elasticated waist with drawcord",
      "Patch pockets",
      "Elasticated cuffs",
      "Dry clean only",
    ],
  },
  {
    slug: "pearl-strand-necklace",
    name: "Pearl Strand Necklace",
    category: "jewelry",
    detail: "Freshwater pearls, white gold clasp",
    price: 1850,
    photo: "1515562141207-7a88fb7ce338",
    crops: ["center", "upper"],
    stock: 5,
    description:
      "A single strand of hand-knotted freshwater pearls, closed with a sculpted white gold clasp.",
    details: [
      "7–8mm freshwater pearls",
      "18k white gold clasp",
      "Hand-knotted on silk",
      "Length 45cm",
      "Presented in a signature box",
    ],
  },
  {
    slug: "sapphire-drop-earrings",
    name: "Sapphire Drop Earrings",
    category: "jewelry",
    detail: "Sterling silver, blue crystal",
    price: 760,
    photo: "1535632066927-ab7c9ab60908",
    crops: ["center", "upper"],
    stock: 1,
    badge: "New",
    description:
      "Statement drop earrings framing a pear-cut blue crystal in a halo of baguette stones.",
    details: [
      "Rhodium-plated sterling silver",
      "Blue and clear crystal",
      "Post back",
      "Drop 4.5cm",
    ],
  },
  {
    slug: "essential-cotton-t-shirt",
    name: "Essential Cotton T-Shirt",
    category: "ready-to-wear",
    detail: "Organic jersey, optic white",
    price: 390,
    photo: "1521572163474-6864f9cf17ab",
    crops: ["upper", "lowerLeft"],
    stock: 30,
    sizes: apparelSizes(),
    description:
      "A crew-neck T-shirt in dense organic cotton jersey, with a clean neckline and a straight, easy fit.",
    details: [
      "100% organic cotton jersey, 220gsm",
      "Ribbed crew neck",
      "Regular fit",
      "Machine wash at 30°C",
    ],
  },
  {
    slug: "floral-wrap-dress",
    name: "Floral Wrap Dress",
    category: "ready-to-wear",
    detail: "Printed silk crêpe",
    price: 2300,
    photo: "1496747611176-843222e1e57c",
    crops: ["upper", "lowerLeft"],
    stock: 4,
    sizes: apparelSizes(["XL"]),
    description:
      "A wrap dress in floral-printed silk crêpe with flutter sleeves and a tie waist, falling to mid-calf.",
    details: [
      "100% silk crêpe de chine",
      "Wrap front with tie fastening",
      "Flutter sleeves",
      "Midi length",
      "Dry clean only",
    ],
  },
];
