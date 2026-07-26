import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

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
  const email = "mustafayuceer@gmail.com";

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
        {t("intro")}
      </p>

      <dl className="mt-10 space-y-6">
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
    </div>
  );
}
