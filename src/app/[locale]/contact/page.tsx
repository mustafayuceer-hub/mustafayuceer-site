import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import academicProfiles from "@/content/academic-profiles.json";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Contact />;
}

function Contact() {
  const t = useTranslations("contact");
  const tHome = useTranslations("home");
  const email = "mustafayuceer@gmail.com";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {tHome("academicProfileHeading")}
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
            {tHome("academicProfileIntro")}
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-4">
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
                    {tHome("viewProfile")} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:border-s md:border-black/10 md:ps-12 dark:md:border-white/10">
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("intro")}
          </p>

          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-sm font-medium text-neutral-500">
                {t("email")}
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${email}`}
                  className="text-lg text-[var(--accent)] hover:underline"
                >
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-neutral-500">
                {t("institution")}
              </dt>
              <dd className="mt-1 text-lg text-neutral-800 dark:text-neutral-200">
                {t("institutionValue")}
              </dd>
            </div>
          </dl>

          <h3 className="mt-10 text-lg font-semibold">{t("formHeading")}</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
