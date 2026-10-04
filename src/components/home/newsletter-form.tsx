"use client";

import { useState } from "react";

type Props = {
  tone?: "light" | "dark";
  className?: string;
};

// Sample-only: no subscription backend yet, it just confirms locally.
export function NewsletterForm({ tone = "light", className = "" }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const dark = tone === "dark";

  if (submitted) {
    return (
      <p className={`label ${className}`} role="status">
        Thank you. You are now subscribed.
      </p>
    );
  }

  return (
    <form
      className={`flex flex-col gap-3 sm:flex-row ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor={`newsletter-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${tone}`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Email address"
        className={
          dark
            ? "border-paper/40 bg-transparent text-paper placeholder:text-paper/50 hover:border-paper focus:border-paper"
            : undefined
        }
      />
      <button type="submit" className={`btn shrink-0 ${dark ? "btn-inverse" : "btn-primary"}`}>
        Subscribe
      </button>
    </form>
  );
}
