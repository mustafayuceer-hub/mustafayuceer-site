import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import publications from "@/content/publications.json";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <About />;
}

function About() {
  const t = useTranslations("about");
  const timeline = t.raw("timeline") as { year: string; text: string }[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <Image
          src="/images/mustafa-yuceer-portrait.png"
          alt={t("heading")}
          width={220}
          height={235}
          className="h-48 w-48 shrink-0 rounded-2xl object-cover shadow-md ring-1 ring-black/5 sm:h-56 sm:w-56 dark:ring-white/10"
        />
        <div className="space-y-5 leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>{t("bio1")}</p>
          <p>{t("bio2")}</p>
          <p>{t("bio3")}</p>
          <p>{t("bio4")}</p>
        </div>
      </div>

      <h2 className="mt-16 text-xl font-semibold">{t("timelineHeading")}</h2>
      <ol className="mt-6 space-y-4 border-s border-black/10 ps-6 dark:border-white/15">
        {timeline.map((item, i) => (
          <li key={i} className="relative">
            <span className="absolute -start-[29px] top-1.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">
              {item.year}
            </span>
            <p className="text-neutral-700 dark:text-neutral-300">
              {item.text}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="mt-16 text-xl font-semibold">{t("worksHeading")}</h2>
      <ul className="mt-6 space-y-2">
        {publications.books.map((book) => (
          <li
            key={book.code}
            className="text-neutral-700 dark:text-neutral-300"
          >
            <span className="font-medium text-neutral-900 dark:text-white">
              {book.title}
            </span>
            {book.venue && `, ${book.venue}`} ({book.year})
          </li>
        ))}
      </ul>

      <Image
        src="/images/mustafa-yuceer-closeup.png"
        alt={t("heading")}
        width={1070}
        height={880}
        className="mt-16 h-64 w-full rounded-2xl object-cover shadow-md ring-1 ring-black/5 sm:h-96 dark:ring-white/10"
      />

      <Link
        href="/contact"
        className="mt-16 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {t("contactCta")}
      </Link>
    </div>
  );
}
