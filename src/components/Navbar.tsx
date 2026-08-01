"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/publications", key: "publications" },
  { href: "/activities", key: "activities" },
  { href: "/blog", key: "blog" },
  { href: "/ilmin-zekati", key: "ilminZekati" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/mark-light.png"
            alt=""
            width={576}
            height={362}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo/mark-dark.png"
            alt=""
            width={576}
            height={362}
            className="hidden h-8 w-auto dark:block"
            priority
          />
          <span className="font-serif text-lg font-semibold tracking-tight">
            {tSite("name")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-medium text-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
          <LocaleSwitcher />
        </nav>

        <button
          className="-me-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl transition-colors hover:bg-black/5 md:hidden dark:hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span>{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/10 px-6 py-4 md:hidden dark:border-white/10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-neutral-600 dark:text-neutral-300"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="pt-2">
            <LocaleSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
