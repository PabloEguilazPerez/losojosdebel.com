"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "@/components/icons";
import { Lightbox } from "@/components/lightbox";
import type { Photo } from "@/lib/photos";

const arrow =
  "rounded-full border border-olive/30 p-2.5 text-olive transition hover:bg-olive hover:text-background disabled:pointer-events-none disabled:opacity-30";

// Horizontal photo strip: arrows, progress bar, drag with the mouse, and a lightbox on click.
export function Carousel({
  photos,
  heading,
}: {
  photos: Photo[];
  heading: React.ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [state, setState] = useState({
    progress: 0,
    first: 0,
    atStart: true,
    atEnd: false,
  });
  const [open, setOpen] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // First photo whose centre is past the left edge of the content area.
    const edge =
      el.getBoundingClientRect().left +
      parseFloat(getComputedStyle(el).paddingLeft);
    const first = Math.max(
      0,
      Array.from(el.children).findIndex((item) => {
        const rect = item.getBoundingClientRect();
        return rect.left + rect.width / 2 > edge;
      }),
    );
    setState({
      progress: max > 0 ? el.scrollLeft / max : 1,
      first,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const page = (direction: 1 | -1) =>
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.75,
      behavior: "smooth",
    });

  return (
    <>
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between gap-4 px-4">
        <div data-reveal="up">{heading}</div>
        <div className="flex shrink-0 items-center gap-3">
          <span
            className="hidden text-sm tabular-nums sm:inline"
            aria-live="polite"
          >
            {String(state.first + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={state.atStart}
            className={arrow}
            aria-label="Fotos anteriores"
          >
            <ChevronIcon className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={state.atEnd}
            className={arrow}
            aria-label="Más fotos"
          >
            <ChevronIcon className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={measure}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = {
            x: e.clientX,
            left: track.current.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(e) => {
          const el = track.current;
          if (!drag.current || !el) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 5 && !drag.current.moved) {
            drag.current.moved = true;
            el.style.scrollSnapType = "none";
            el.setPointerCapture(e.pointerId);
          }
          if (drag.current.moved) el.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          if (track.current) track.current.style.scrollSnapType = "";
          // Let the click that follows a drag see `moved`, then forget it.
          setTimeout(() => (drag.current = null));
        }}
        onDragStart={(e) => e.preventDefault()}
        className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] active:cursor-grabbing md:scroll-px-[max(1rem,calc((100vw-72rem)/2+1rem))] md:px-[max(1rem,calc((100vw-72rem)/2+1rem))] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <li
            key={photo.src.src}
            data-reveal="right"
            style={
              { "--d": `${Math.min(i, 5) * 100}ms` } as React.CSSProperties
            }
            className={`h-80 shrink-0 snap-start md:h-[28rem] ${i % 3 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}`}
          >
            <button
              type="button"
              onClick={() => !drag.current?.moved && setOpen(i)}
              className="group relative block h-full w-full overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
              aria-label={`Ampliar: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 600px, 430px"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent px-4 pt-12 pb-3 text-left text-white">
                <span className="font-seasons text-xl">{photo.label}</span>
                <span className="translate-y-2 text-xs font-bold tracking-[0.2em] uppercase opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Ampliar
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 max-w-6xl px-4">
        <div className="h-0.5 overflow-hidden rounded-full bg-olive/15">
          <div
            className="h-full origin-left bg-olive transition-transform duration-150"
            style={{ transform: `scaleX(${Math.max(state.progress, 0.04)})` }}
          />
        </div>
      </div>

      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </>
  );
}
