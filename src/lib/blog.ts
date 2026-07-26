import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const blogDir = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
};

function dirFor(locale: string) {
  return path.join(blogDir, locale);
}

export function getAllSlugs(locale: string): string[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(locale: string): PostMeta[] {
  return getAllSlugs(locale)
    .map((slug) => {
      const filePath = path.join(dirFor(locale), `${slug}.md`);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        image: data.image,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(locale: string, slug: string) {
  const filePath = path.join(dirFor(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image as string | undefined,
    contentHtml: processed.toString(),
  };
}
