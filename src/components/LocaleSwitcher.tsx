"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 p-0.5 text-sm dark:border-white/15">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() =>
            router.replace(
              // @ts-expect-error -- dynamic pathname params are fine here
              { pathname, params },
              { locale: loc }
            )
          }
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === loc
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          }`}
          aria-current={locale === loc}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
