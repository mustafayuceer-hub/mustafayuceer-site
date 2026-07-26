import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import data from "@/content/ilmin-zekati.json";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function IlminZekatiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IlminZekati />;
}

type Item = {
  title: string;
  author?: string;
  type?: string;
  description?: string;
  url?: string;
};

function IlminZekati() {
  const t = useTranslations("ilminZekati");
  const items = data.items as Item[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
        {t("intro")}
      </p>

      {items.length ? (
        <ul className="mt-10 space-y-6">
          {items.map((item, i) => (
            <li
              key={i}
              className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
            >
              <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {[item.author, item.type].filter(Boolean).join(" · ")}
              </p>
              {item.description && (
                <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  {t("viewMore")} ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-black/15 px-6 py-8 text-center text-neutral-500 dark:border-white/20">
          {t("placeholder")}
        </p>
      )}
    </div>
  );
}
