import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import { LegalLinks } from "@/components/legal-links";
import { site } from "@/lib/site";

// Header and footer for the content pages coming from WordPress.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-olive/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="font-seasons text-2xl text-olive">
            {site.name}
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/" className="hidden hover:text-olive sm:inline">
              Inicio
            </Link>
            <Link href="/blog" className="hover:text-olive">
              Blog
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagramHandle}`}
              className="text-olive hover:text-olive-dark"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-olive px-4 py-2 font-bold text-background hover:bg-olive-dark"
            >
              Reservar
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-olive/10 py-8 text-center text-sm">
        <p className="font-seasons text-xl text-olive">{site.name}</p>
        <p className="mt-1">Vivienda vacacional pet friendly · Asturias</p>
        <LegalLinks />
      </footer>
    </>
  );
}
