import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import academicProfiles from "@/content/academic-profiles.json";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AcademicProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AcademicProfile />;
}

function AcademicProfile() {
  const t = useTranslations("home");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("academicProfileHeading")}
      </h1>
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
  );
}
