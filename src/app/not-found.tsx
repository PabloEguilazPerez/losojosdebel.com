import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChatIcon, PawIcon } from "@/components/icons";
import { SiteShell } from "@/components/site-shell";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Página no encontrada · ${site.name}`,
};

// Also used by the WordPress routes, whose 404 is decided after the page has started streaming.
export const notFoundMetadata: Metadata = { ...metadata, robots: { index: false } };

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="text-center md:text-left">
          <p
            className="fade-up font-seasons text-8xl leading-none text-olive/25 md:text-9xl"
            aria-hidden="true"
          >
            404
          </p>
          <h1
            className="fade-up mt-2 font-seasons text-4xl leading-tight text-olive md:text-5xl"
            style={delay(150)}
          >
            Esta página se ha ido de paseo
          </h1>
          <p className="fade-up mt-4 text-lg" style={delay(300)}>
            Como algunos de nuestros huéspedes de cuatro patas, la página que
            buscas se ha escapado. Puede que la dirección esté mal escrita o que
            ya no exista.
          </p>

          <ul
            className="mt-6 flex justify-center gap-3 text-olive/50 md:justify-start"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <li
                key={n}
                className={`fade-up ${n % 2 ? "translate-y-2" : "-translate-y-1"}`}
                style={delay(500 + n * 200)}
              >
                <PawIcon
                  className={`size-6 ${n % 2 ? "rotate-[100deg]" : "rotate-[80deg]"}`}
                />
              </li>
            ))}
          </ul>

          <div
            className="fade-up mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            style={delay(450)}
          >
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-olive px-6 py-3 font-bold text-background transition hover:-translate-y-0.5 hover:bg-olive-dark hover:shadow-lg"
            >
              Volver a casa
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-olive/40 px-6 py-3 font-bold text-olive transition hover:-translate-y-0.5 hover:bg-olive/10"
            >
              Leer el blog
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-olive/40 px-6 py-3 font-bold text-olive transition hover:-translate-y-0.5 hover:bg-olive/10"
            >
              <ChatIcon className="size-5" />
              Escríbenos
            </a>
          </div>
        </div>

        <div
          className="fade-up relative mx-auto w-full max-w-md"
          style={delay(200)}
        >
          <Image
            src={photos.fachada.src}
            alt={photos.fachada.alt}
            placeholder="blur"
            sizes="(min-width: 768px) 448px, 100vw"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl shadow-olive/15"
          />
          <div className="float absolute -bottom-6 -left-4 flex size-24 items-center justify-center rounded-full bg-olive text-background shadow-lg md:-left-8">
            <PawIcon className="size-12" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
