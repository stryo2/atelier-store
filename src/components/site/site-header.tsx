"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import { navigation } from "@/lib/sample-data";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="header-bar">
      <div className="container-wide grid h-full grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: menu + search on mobile, primary nav on desktop */}
        <div className="flex items-center gap-1 lg:gap-7">
          <button
            type="button"
            className="btn-icon -ml-2.5 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          <button type="button" className="btn-icon lg:hidden" aria-label="Search">
            <SearchIcon />
          </button>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-nav">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Center: wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.32em] uppercase pl-[0.32em] xl:text-[1.75rem]"
          aria-label="Atelier home"
        >
          Atelier
        </Link>

        {/* Right: utilities */}
        <div className="flex items-center justify-end gap-1">
          <button type="button" className="btn-icon hidden lg:inline-flex" aria-label="Search">
            <SearchIcon />
          </button>
          <Link href="/account" className="btn-icon hidden sm:inline-flex" aria-label="Account">
            <UserIcon />
          </Link>
          <Link href="/wishlist" className="btn-icon hidden sm:inline-flex" aria-label="Wishlist">
            <HeartIcon />
          </Link>
          <Link href="/bag" className="btn-icon -mr-2.5 relative" aria-label="Shopping bag, 0 items">
            <BagIcon />
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "visible" : "invisible"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-overlay transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[min(24rem,88vw)] flex-col bg-paper transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-(--header-h) items-center justify-between border-b border-line px-(--gutter)">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              className="btn-icon -mr-2.5"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-(--gutter) py-6">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    className="block py-4 display-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 border-t border-line px-(--gutter) py-6">
            <Link href="/account" className="label flex items-center gap-3">
              <UserIcon /> Sign in
            </Link>
            <Link href="/wishlist" className="label flex items-center gap-3">
              <HeartIcon /> Wishlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
