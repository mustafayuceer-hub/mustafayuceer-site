"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoGallery({
  photos,
  alt,
}: {
  photos: string[];
  alt: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + photos.length) % photos.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, photos.length]);

  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-2 clear-both">
        {photos.map((photo, i) => (
          <button
            key={photo}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative h-24 w-full overflow-hidden rounded-lg bg-neutral-100 sm:h-28 dark:bg-neutral-800"
          >
            <Image
              src={photo}
              alt={alt}
              fill
              className="object-contain transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Kapat"
            className="absolute top-4 end-4 text-3xl text-white/80 hover:text-white"
          >
            ✕
          </button>
          <Image
            src={photos[openIndex]}
            alt={alt}
            width={1600}
            height={1200}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
