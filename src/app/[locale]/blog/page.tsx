import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPostsMeta } from "@/lib/blog";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPostsMeta(locale);

  return <Blog posts={posts} />;
}

function Blog({
  posts,
}: {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    image?: string;
  }[];
}) {
  const t = useTranslations("blog");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-300">
        {t("intro")}
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-neutral-500">{t("empty")}</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="flex flex-col gap-5 border-b border-black/10 pb-8 sm:flex-row dark:border-white/10"
            >
              {post.image && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="shrink-0 sm:w-48"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1400}
                    height={1207}
                    className="h-40 w-full rounded-xl object-cover object-top shadow-sm ring-1 ring-black/5 sm:h-32 dark:ring-white/10"
                  />
                </Link>
              )}
              <div className="flex-1">
                <p className="text-sm text-neutral-500">{post.date}</p>
                <h2 className="mt-1 text-xl font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[var(--accent)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  {t("readMore")}{" "}
                  <span className="inline-block rtl:-scale-x-100">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
