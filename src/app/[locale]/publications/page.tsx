import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import publications from "@/content/publications.json";
import PeerReviewsSection from "@/components/PeerReviewsSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Publications />;
}

type Pub = {
  code: string;
  title: string;
  venue: string;
  year: number;
  file?: string;
};

type Editorship = {
  year: number;
  role: string;
  title: string;
  scope: string;
};

type Project = {
  title: string;
  team: string[];
  type: string;
  status: string;
  startDate: string;
  endDate: string;
};

type CourseRow = {
  term: string;
  name: string;
  language: string;
  hours?: number;
};

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

const categoryOrder: {
  key: keyof typeof publications;
  labelKey: string;
}[] = [
  { key: "articles", labelKey: "articles" },
  { key: "books", labelKey: "books" },
  { key: "bookChapters", labelKey: "bookChapters" },
  { key: "proceedings", labelKey: "proceedings" },
  { key: "other", labelKey: "other" },
];

function Publications() {
  const t = useTranslations("publications");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
        {t("intro")}
      </p>

      {categoryOrder.map(({ key, labelKey }) => {
        const items = publications[key] as Pub[];
        if (!items?.length) return null;
        return (
          <section key={key} className="mt-14">
            <h2 className="text-xl font-semibold">
              {t(`categories.${labelKey}`)}
            </h2>
            <ol className="mt-5 space-y-4">
              {items.map((pub) => (
                <li
                  key={pub.code}
                  className="flex gap-4 border-b border-black/5 pb-4 dark:border-white/10"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-neutral-400">
                    {pub.code}
                  </span>
                  <div className="flex-1">
                    <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {pub.title}
                      </span>
                      {pub.venue ? `, ${pub.venue}` : ""}
                      {pub.year ? ` (${pub.year})` : ""}
                    </p>
                    {pub.file && (
                      <a
                        href={pub.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
                      >
                        {t("viewPdf")} ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      <ProjectsSection />
      <CourseTables />
      <EditorshipsTable />

      {(publications.peerReviews as string[])?.length > 0 && (
        <PeerReviewsSection
          heading={t("categories.peerReviews")}
          count={String((publications.peerReviews as string[]).length)}
          journals={publications.peerReviews as string[]}
        />
      )}
    </div>
  );
}

function ProjectsSection() {
  const t = useTranslations("publications");
  const locale = useLocale();
  const projects = publications.projects as Project[];
  if (!projects?.length) return null;

  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold">{t("categories.projects")}</h2>
      <ul className="mt-5 space-y-6">
        {projects.map((p, i) => (
          <li
            key={i}
            className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
          >
            <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
              {p.title}
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              {p.team.join(", ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.type && (
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {p.type}
                </span>
              )}
              {p.status && (
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  {p.status}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              {p.startDate && p.endDate
                ? `${formatDate(p.startDate, locale)} – ${formatDate(p.endDate, locale)}`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CourseTables() {
  const t = useTranslations("publications");
  const courses = publications.courses as {
    undergraduate: CourseRow[];
    graduate: CourseRow[];
  };
  if (!courses) return null;

  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold">{t("categories.courses")}</h2>
      <div className="mt-6 space-y-10">
        <CourseTable
          heading={t("undergraduate")}
          rows={courses.undergraduate}
          t={t}
        />
        <CourseTable heading={t("graduate")} rows={courses.graduate} t={t} />
      </div>
    </section>
  );
}

function CourseTable({
  heading,
  rows,
  t,
}: {
  heading: string;
  rows: CourseRow[];
  t: ReturnType<typeof useTranslations>;
}) {
  const hasHours = rows.some((r) => r.hours !== undefined);

  return (
    <div>
      <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-white">
        {heading}
      </h3>
      <div className="mt-3 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
        <table className="w-full text-start text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">{t("term")}</th>
              <th className="px-4 py-3 font-medium">{t("courseName")}</th>
              <th className="px-4 py-3 font-medium">{t("language")}</th>
              {hasHours && (
                <th className="px-4 py-3 font-medium">{t("hours")}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-black/5 dark:border-white/10"
              >
                <td className="px-4 py-3 text-neutral-500">{row.term}</td>
                <td className="px-4 py-3 text-neutral-800 dark:text-neutral-200">
                  {row.name}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {row.language}
                </td>
                {hasHours && (
                  <td className="px-4 py-3 text-neutral-500">
                    {row.hours ?? ""}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditorshipsTable() {
  const t = useTranslations("publications");
  const editorships = publications.editorships as Editorship[];
  if (!editorships?.length) return null;

  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold">{t("categories.editorships")}</h2>
      <div className="mt-5 overflow-x-auto rounded-lg border border-black/10 dark:border-white/10">
        <table className="w-full text-start text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">{t("editorshipYear")}</th>
              <th className="px-4 py-3 font-medium">{t("editorshipRole")}</th>
              <th className="px-4 py-3 font-medium">{t("editorshipTitle")}</th>
              <th className="px-4 py-3 font-medium">{t("editorshipScope")}</th>
            </tr>
          </thead>
          <tbody>
            {editorships.map((e, i) => (
              <tr
                key={i}
                className="border-t border-black/5 dark:border-white/10"
              >
                <td className="px-4 py-3 text-neutral-500">{e.year}</td>
                <td className="px-4 py-3 text-neutral-500">{e.role}</td>
                <td className="px-4 py-3 text-neutral-800 dark:text-neutral-200">
                  {e.title}
                </td>
                <td className="px-4 py-3 text-neutral-500">{e.scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
