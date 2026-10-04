// Site content and merchandising that stays in code: navigation, editorial
// imagery, collections and the hand-picked home page product lists.
// Products, categories and stock live in the database (see src/lib/catalog.ts).

import { unsplash } from "./unsplash";

export type Collection = {
  id: string;
  eyebrow: string;
  title: string;
  href: string;
  image: string;
};

export const newArrivalSlugs = [
  "structured-top-handle-bag",
  "biker-jacket",
  "pointed-stiletto-pump",
  "round-metal-sunglasses",
  "lightweight-bomber",
  "suede-brogue",
  "hand-knit-poncho",
  "tapered-cargo-trouser",
];

export const giftEditSlugs = [
  "pearl-strand-necklace",
  "sapphire-drop-earrings",
  "essential-cotton-t-shirt",
  "floral-wrap-dress",
];

export const editorial = {
  hero: unsplash("1539109136881-3be0616acf4b"),
  atelier: unsplash("1558769132-cb1aea458c5e"),
  tailoring: unsplash("1507679799987-c73779587ccf"),
  boutique: unsplash("1445205170230-053b83016050"),
};

export const featuredCollections: Collection[] = [
  {
    id: "women",
    eyebrow: "Women",
    title: "Outerwear for the City",
    href: "/collections/women",
    // Cropped high to keep the model's (designer) handbag out of frame.
    image: unsplash("1485968579580-b6d095142e6e", "upper"),
  },
  {
    id: "men",
    eyebrow: "Men",
    title: "The Tailoring Edit",
    href: "/collections/men",
    image: unsplash("1617137968427-85924c800a22"),
  },
  {
    id: "bags",
    eyebrow: "Bags",
    title: "Shoulder & Chain Bags",
    href: "/collections/bags",
    image: unsplash("1566150905458-1bf1fc113f0d"),
  },
];

export const services = [
  {
    title: "Complimentary Shipping",
    body: "Free express delivery on every order, with signature on arrival.",
  },
  {
    title: "Returns Within 30 Days",
    body: "Send items back free of charge, from home or in store.",
  },
  {
    title: "Signature Packaging",
    body: "Every order arrives wrapped and ready to give.",
  },
  {
    title: "Book an Appointment",
    body: "Shop with a client advisor in store or by video call.",
  },
];

export const navigation = [
  { label: "New In", href: "/collections/new" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Jewelry", href: "/collections/jewelry" },
];

export const footerColumns = [
  {
    title: "Client Services",
    links: ["Contact Us", "Shipping", "Returns", "Size Guide", "FAQ"],
  },
  {
    title: "The Company",
    links: ["About Atelier", "Craftsmanship", "Sustainability", "Careers"],
  },
  {
    title: "Legal",
    links: ["Terms of Use", "Privacy Policy", "Cookie Settings", "Accessibility"],
  },
];
