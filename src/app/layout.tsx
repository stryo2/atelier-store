import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

// UI and body copy: geometric sans.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

// Display headings only: high-contrast serif.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "Atelier", template: "%s | Atelier" },
  description: "Atelier store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
