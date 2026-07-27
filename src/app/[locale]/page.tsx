import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import academicProfiles from "@/content/academic-profiles.json";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Home />;
}

function Home() {
  const t = useTranslations("home");
  const tSite = useTranslations("site");

  return (
    <div>
      <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 px-6 py-24 sm:py-32 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-[var(--accent)] uppercase">
            {tSite("tagline")}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-300">
            {t("heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/publications"
              className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:border-black/30 dark:border-white/20 dark:hover:border-white/40"
            >
              {t("heroCtaSecondary")}
            </Link>
            <Link
              href="/about"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {t("heroCta")}
            </Link>
          </div>
        </div>
        <Image
          src="/images/mustafa-yuceer-closeup.png"
          alt={tSite("name")}
          width={1070}
          height={880}
          priority
          className="h-56 w-56 shrink-0 rounded-full object-cover shadow-lg ring-1 ring-black/5 sm:h-64 sm:w-64 dark:ring-white/10"
        />
      </section>

      <section className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold">{t("introHeading")}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("introParagraph1")}
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("introParagraph2")}
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {(
              t.raw("focusAreas") as { title: string; text: string }[]
            ).map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
              >
                <dt className="font-serif text-lg font-semibold">
                  {area.title}
                </dt>
                <dd className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {area.text}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("introParagraph3")}
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold">
            {t("academicProfileHeading")}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("academicProfileIntro")}
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {(
              academicProfiles as {
                name: string;
                url: string;
                initials: string;
                color: string;
              }[]
            ).map((profile) => (
              <li key={profile.name}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center gap-3 rounded-2xl border border-black/10 p-5 text-center transition hover:border-black/25 hover:shadow-md dark:border-white/10 dark:hover:border-white/25"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: profile.color }}
                  >
                    {profile.initials}
                  </span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {profile.name}
                  </span>
                  <span className="text-xs font-medium text-[var(--accent)]">
                    {t("viewProfile")} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
