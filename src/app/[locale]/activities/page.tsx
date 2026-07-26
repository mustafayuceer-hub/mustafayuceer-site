import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import activities from "@/content/activities.json";
import PhotoGallery from "@/components/PhotoGallery";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Activities />;
}

type ContentBlock =
  | { type: "p"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

type TableRow = {
  date: string;
  name: string;
  youtubeId: string;
};

type Item = {
  title: string;
  venue?: string;
  year?: number;
  date?: string;
  endDate?: string;
  time?: string;
  location?: string;
  speaker?: string;
  scope?: string;
  description?: string;
  content?: ContentBlock[];
  poster?: string;
  sourceUrl?: string;
  file?: string;
  photos?: string[];
  youtubeId?: string;
  table?: TableRow[];
  image?: string;
};

const categoryOrder: {
  key: keyof typeof activities;
  labelKey: string;
}[] = [
  { key: "conferences", labelKey: "conferences" },
  { key: "seminars", labelKey: "seminars" },
  { key: "workshops", labelKey: "workshops" },
  { key: "tvPrograms", labelKey: "tvPrograms" },
  { key: "interviews", labelKey: "interviews" },
];

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RichContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mt-3 space-y-3">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h4
              key={i}
              className="pt-2 font-serif text-base font-semibold text-neutral-900 dark:text-white"
            >
              {block.text}
            </h4>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-2 ps-5">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="leading-relaxed text-neutral-600 dark:text-neutral-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="leading-relaxed text-neutral-600 dark:text-neutral-300"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function Activities() {
  const t = useTranslations("activities");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
        {t("intro")}
      </p>

      {categoryOrder.map(({ key, labelKey }) => {
        const items = activities[key] as Item[];
        return (
          <section key={key} className="mt-14">
            <h2 className="text-xl font-semibold">
              {t(`categories.${labelKey}`)}
            </h2>
            {items?.length ? (
              <ul className="mt-6 space-y-10">
                {items.map((item, i) =>
                  item.table ? (
                    <li key={i}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={1608}
                          height={968}
                          className="mb-4 w-full rounded-2xl object-cover shadow-md ring-1 ring-black/5 dark:ring-white/10"
                        />
                      )}
                      <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-4 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
                        <table className="w-full text-start text-sm">
                          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                            <tr>
                              <th className="px-4 py-3 font-medium">
                                {t("date")}
                              </th>
                              <th className="px-4 py-3 font-medium">
                                {t("episode")}
                              </th>
                              <th className="px-4 py-3 font-medium">
                                {t("link")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.table.map((row, j) => (
                              <tr
                                key={j}
                                className="border-t border-black/5 dark:border-white/10"
                              >
                                <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                                  {formatDate(row.date, locale)}
                                </td>
                                <td className="px-4 py-3 text-neutral-800 dark:text-neutral-200">
                                  {row.name}
                                </td>
                                <td className="px-4 py-3">
                                  <a
                                    href={`https://www.youtube.com/watch?v=${row.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-[var(--accent)] hover:underline"
                                  >
                                    YouTube ↗
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </li>
                  ) : item.youtubeId ? (
                    <li
                      key={i}
                      className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
                    >
                      <div className="aspect-video w-full">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                            {item.description}
                          </p>
                        )}
                        {item.sourceUrl && (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
                          >
                            YouTube ↗
                          </a>
                        )}
                      </div>
                    </li>
                  ) : item.poster ? (
                    <li
                      key={i}
                      className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
                    >
                      <Image
                        src={item.poster}
                        alt={item.title}
                        width={1129}
                        height={1600}
                        className="w-full max-w-sm mx-auto sm:mx-0 sm:float-left sm:me-6 sm:mb-2 rtl:sm:float-right object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--accent)]">
                          {[
                            item.date ? formatDate(item.date, locale) : null,
                            item.time,
                            item.location,
                            item.speaker,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {item.content ? (
                          <RichContent blocks={item.content} />
                        ) : (
                          item.description && (
                            <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                              {item.description}
                            </p>
                          )
                        )}
                        {item.photos && item.photos.length > 0 && (
                          <PhotoGallery photos={item.photos} alt={item.title} />
                        )}
                        {item.sourceUrl && (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
                          >
                            {item.sourceUrl.includes("selcuk.edu.tr")
                              ? "selcuk.edu.tr ↗"
                              : "↗"}
                          </a>
                        )}
                      </div>
                    </li>
                  ) : (
                    <li
                      key={i}
                      className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
                    >
                      <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {[
                          item.venue,
                          item.date
                            ? item.endDate && item.endDate !== item.date
                              ? `${formatDate(item.date, locale)} – ${formatDate(item.endDate, locale)}`
                              : formatDate(item.date, locale)
                            : null,
                          item.year ? String(item.year) : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {item.scope && (
                        <span className="mt-3 inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                          {item.scope}
                        </span>
                      )}
                      {item.description && (
                        <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-300">
                          {item.description}
                        </p>
                      )}
                      {item.file && (
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
                        >
                          {t("viewPdf")} ↗
                        </a>
                      )}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="mt-5 rounded-lg border border-dashed border-black/15 px-6 py-6 text-center text-sm text-neutral-500 dark:border-white/20">
                {t("placeholder")}
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
