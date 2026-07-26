import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllSlugs, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(locale, slug);
  if (!post) notFound();

  return <BlogPost post={post} />;
}

function BlogPost({
  post,
}: {
  post: {
    title: string;
    date: string;
    image?: string;
    contentHtml: string;
  };
}) {
  const t = useTranslations("blog");

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-[var(--accent)] hover:underline"
      >
        <span className="inline-block rtl:-scale-x-100">←</span> {t("back")}
      </Link>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={1400}
          height={1207}
          priority
          className="mt-6 h-64 w-full rounded-2xl object-cover object-top shadow-md ring-1 ring-black/5 sm:h-96 dark:ring-white/10"
        />
      )}
      <p className="mt-6 text-sm text-neutral-500">{post.date}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <div
        className="prose prose-neutral mt-8 max-w-none leading-relaxed dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
