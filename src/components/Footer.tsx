import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tSite = useTranslations("site");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 py-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
      <p>
        © {year} {tSite("name")}. {t("rights")}
      </p>
    </footer>
  );
}
