"use client";

import { useState } from "react";

export default function PeerReviewsSection({
  heading,
  count,
  journals,
}: {
  heading: string;
  count: string;
  journals: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-14">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-full border border-black/10 px-6 py-3 text-start transition hover:border-black/30 dark:border-white/15 dark:hover:border-white/30"
        aria-expanded={open}
      >
        <span className="text-xl font-semibold">
          {heading}{" "}
          <span className="text-sm font-normal text-neutral-500">
            ({count})
          </span>
        </span>
        <span
          className={`text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {journals.map((journal) => (
            <li
              key={journal}
              className="rounded-xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm leading-snug text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {journal}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
