"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronIcon, CloseIcon } from "@/components/icons";
import type { Photo } from "@/lib/photos";

// Full-screen viewer for one of `photos`; `index` null means closed.
export function Lightbox({
  photos,
  index,
  onChange,
}: {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (index === null) dialog.current?.close();
    else if (!dialog.current?.open) dialog.current?.showModal();
  }, [index]);

  const step = (delta: number) =>
    index !== null && onChange((index + delta + photos.length) % photos.length);

  const current = index === null ? null : photos[index];

  return (
    <dialog
      ref={dialog}
      onClose={() => onChange(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85"
      aria-label="Galería de fotos"
    >
      {current && (
        <figure className="flex w-[min(92vw,85dvh)] flex-col items-center gap-3">
          <Image
            key={current.src.src}
            src={current.src}
            alt={current.alt}
            placeholder="blur"
            sizes="92vw"
            className="h-auto w-full rounded-lg"
          />
          <figcaption className="text-center text-sm text-white/85">
            {current.label} · {index! + 1}/{photos.length}
          </figcaption>
        </figure>
      )}
      <button
        type="button"
        onClick={() => onChange(null)}
        className="fixed top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Cerrar"
      >
        <CloseIcon className="size-6" />
      </button>
      <button
        type="button"
        onClick={() => step(-1)}
        className="fixed top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Foto anterior"
      >
        <ChevronIcon className="size-6 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        className="fixed top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Foto siguiente"
      >
        <ChevronIcon className="size-6" />
      </button>
    </dialog>
  );
}
