"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site-data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-ink text-paper"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg font-medium tracking-tight">
          Second Start Initiative
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-paper/80 transition-colors hover:text-marigold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="rounded-full bg-marigold px-5 py-2 font-medium text-ink transition-colors hover:bg-marigold-deep"
          >
            Donate
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 lg:hidden"
        >
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 block h-[2px] w-5 bg-paper transition-transform ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-[2px] w-5 bg-paper transition-transform ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-paper/10 px-5 pb-6 sm:px-8 lg:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2 text-base">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-paper/90 hover:text-marigold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-marigold px-5 py-2 font-medium text-ink"
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
