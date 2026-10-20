import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChatIcon,
  InstagramIcon,
  MailIcon,
  PawIcon,
  PhoneIcon,
} from "@/components/icons";
import { Carousel } from "@/components/carousel";
import { LegalLinks } from "@/components/legal-links";
import { PostCard } from "@/components/post-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { StickyBar } from "@/components/sticky-bar";
import { gallery, photos, type Photo } from "@/lib/photos";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/wordpress";
import logoAcuarela from "../../public/logo-acuarela.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}${photos.fachada.src.src}`,
  logo: `${site.url}/logo.png`,
  telephone: site.phone,
  email: site.email,
  sameAs: [site.instagram],
  petsAllowed: true,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Asturias",
    addressCountry: "ES",
  },
};

const rooms: { title: string; text: string; main: Photo; detail: Photo }[] = [
  {
    title: "El salón",
    text: "Un sofá para dejarse caer, un sillón junto a la ventana y el jardín al otro lado del cristal. Luz natural durante todo el día.",
    main: photos.salon,
    detail: photos.salonTelevision,
  },
  {
    title: "Cocina y comedor",
    text: "Horno, microondas, placa, frigorífico, tostadora y cafetera de cápsulas. Una mesa redonda para los desayunos largos.",
    main: photos.cocina,
    detail: photos.comedor,
  },
  {
    title: "Los dormitorios",
    text: "Uno con cama de matrimonio y otro con dos camas individuales, con ropa blanca, armario y cortinas que dejan pasar la luz.",
    main: photos.dormitorioDoble,
    detail: photos.dormitorioIndividual,
  },
  {
    title: "Baño y rincones",
    text: "Baño con ducha y espejo iluminado, y un escritorio por si toca conectarse un rato.",
    main: photos.bano,
    detail: photos.escritorio,
  },
];

const contact = [
  { href: site.whatsapp, icon: ChatIcon, label: "WhatsApp", external: true },
  { href: `tel:${site.phone}`, icon: PhoneIcon, label: "Llamar" },
  { href: `mailto:${site.email}`, icon: MailIcon, label: "Email" },
  {
    href: site.instagram,
    icon: InstagramIcon,
    label: "Instagram",
    external: true,
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" };

// Stagger for .fade-up and [data-reveal].
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const lift = "transition duration-300 hover:-translate-y-0.5 hover:shadow-lg";

// Latest WordPress posts; the section is left out while the blog is empty.
async function LatestPosts() {
  const posts = await getPosts(3);
  if (!posts.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div
        data-reveal="up"
        className="mb-8 flex items-end justify-between gap-4"
      >
        <div>
          <p className="text-sm font-bold tracking-[0.25em] text-olive-light uppercase">
            Blog
          </p>
          <h2 className="mt-2 font-seasons text-4xl text-olive md:text-5xl">
            Novedades y planes
          </h2>
        </div>
        <Link
          href="/blog"
          className="shrink-0 text-sm font-bold text-olive hover:text-olive-dark"
        >
          Ver todo →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <div key={post.slug} data-reveal="up" style={delay(i * 150)}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <RevealOnScroll />
        <StickyBar>
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <span className="font-seasons text-2xl text-olive">
              {site.name}
            </span>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="text-sm hover:text-olive">
                Blog
              </Link>
              <a
                href={site.instagram}
                {...external}
                aria-label={`Instagram ${site.instagramHandle}`}
                className="text-olive hover:text-olive-dark"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={site.whatsapp}
                {...external}
                className="rounded-full bg-olive px-4 py-2 text-sm font-bold text-background hover:bg-olive-dark"
              >
                Reservar
              </a>
            </div>
          </div>
        </StickyBar>
        <section className="relative flex min-h-svh flex-col overflow-hidden text-white">
          <Image
            src={photos.fachada.src}
            alt={photos.fachada.alt}
            placeholder="blur"
            fill
            sizes="100vw"
            className="ken-burns object-cover"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/65" />

          <header className="fade-up relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
            <span className="font-seasons text-2xl">{site.name}</span>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="text-sm font-bold hover:underline">
                Blog
              </Link>
              <a
                href={site.instagram}
                {...external}
                aria-label={`Instagram ${site.instagramHandle}`}
                className="rounded-full bg-white/15 p-2 backdrop-blur hover:bg-white/25"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </header>

          <div className="relative mx-auto mt-auto w-full max-w-6xl px-4 pb-16">
            <p
              className="fade-up inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold backdrop-blur"
              style={delay(200)}
            >
              <PawIcon className="size-4" />
              Pet friendly
            </p>
            <h1
              className="fade-up mt-4 max-w-3xl font-seasons text-5xl leading-[1.05] md:text-7xl"
              style={delay(350)}
            >
              Vacaciones en Asturias, con tu mascota.
            </h1>
            <p
              className="fade-up mt-4 max-w-xl text-lg text-white/90"
              style={delay(550)}
            >
              {site.name} es una vivienda vacacional rodeada de jardín, pensada
              para descansar sin dejar a nadie en casa.
            </p>
            <div
              className="fade-up mt-8 flex flex-wrap gap-3"
              style={delay(750)}
            >
              <a
                href={site.whatsapp}
                {...external}
                className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-olive-dark hover:bg-background ${lift}`}
              >
                <ChatIcon className="size-5" />
                Consultar disponibilidad
              </a>
              <a
                href="#espacios"
                className={`inline-flex items-center rounded-full border border-white/60 px-6 py-3 font-bold hover:bg-white/10 ${lift}`}
              >
                Conocer la casa
              </a>
            </div>
          </div>
          <a
            href="#espacios"
            aria-label="Bajar"
            className="nudge absolute bottom-5 left-1/2 -ml-3 hidden text-white/80 md:block"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p
            data-reveal="up"
            className="font-seasons text-3xl leading-snug text-olive md:text-4xl"
          >
            Césped, palmeras a la puerta y una casa decorada con mimo, en tonos
            suaves y madera natural. Un sitio para bajar el ritmo.
          </p>
        </section>

        <section
          id="espacios"
          className="mx-auto flex max-w-6xl scroll-mt-8 flex-col gap-24 px-4 pb-24"
        >
          {rooms.map((room, i) => (
            <article
              key={room.title}
              className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative md:col-span-7">
                <Image
                  src={room.main.src}
                  alt={room.main.alt}
                  placeholder="blur"
                  sizes="(min-width: 1152px) 640px, (min-width: 768px) 58vw, 100vw"
                  data-reveal="wipe"
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                />
                <Image
                  src={room.detail.src}
                  alt={room.detail.alt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 220px, 40vw"
                  data-reveal="zoom"
                  style={delay(500)}
                  className={`drift absolute -bottom-8 aspect-square w-2/5 max-w-56 rounded-sm border-8 border-background object-cover shadow-lg ${i % 2 ? "-left-4" : "-right-4"}`}
                />
              </div>
              <div
                data-reveal={i % 2 ? "left" : "right"}
                style={delay(250)}
                className="md:col-span-5"
              >
                <p className="text-sm font-bold tracking-[0.25em] text-olive-light">
                  0{i + 1}
                </p>
                <h2 className="mt-2 font-seasons text-4xl text-olive md:text-5xl">
                  {room.title}
                </h2>
                <p className="mt-4 text-lg">{room.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-[#efeadb] py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[auto_1fr]">
            <div
              data-reveal="paw"
              className="mx-auto flex size-32 items-center justify-center rounded-full bg-olive text-background md:size-40"
            >
              <PawIcon className="size-16 md:size-20" />
            </div>
            <div
              data-reveal="up"
              style={delay(200)}
              className="text-center md:text-left"
            >
              <h2 className="font-seasons text-4xl text-olive md:text-5xl">
                Tu mascota también está de vacaciones
              </h2>
              <p className="mt-3 max-w-2xl text-lg">
                Somos pet friendly: tu compañero es bienvenido. Cuéntanos al
                reservar que vienes con él y lo tendremos en cuenta.
              </p>
              <ul
                className="mt-6 flex justify-center gap-3 text-olive/60 md:justify-start"
                aria-hidden="true"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <li
                    key={n}
                    data-reveal="paw"
                    style={delay(500 + n * 180)}
                    className={n % 2 ? "translate-y-2" : "-translate-y-1"}
                  >
                    <PawIcon
                      className={`size-6 ${n % 2 ? "rotate-12" : "-rotate-12"}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24">
          <Carousel
            photos={gallery}
            heading={
              <>
                <p className="text-sm font-bold tracking-[0.25em] text-olive-light uppercase">
                  Galería · {gallery.length} fotos
                </p>
                <h2 className="mt-2 font-seasons text-4xl text-olive md:text-5xl">
                  Cada rincón
                </h2>
                <a
                  href={site.instagram}
                  {...external}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-olive hover:text-olive-dark"
                >
                  <InstagramIcon className="size-4" />
                  Más en Instagram
                </a>
              </>
            }
          />
        </section>

        <LatestPosts />

        <section className="bg-olive-dark py-24 text-background">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[1fr_auto]">
            <div data-reveal="up">
              <h2 className="font-seasons text-5xl md:text-6xl">
                Reserva tu estancia
              </h2>
              <p className="mt-4 max-w-xl text-lg text-background/85">
                Escríbenos para consultar fechas y precios. Te respondemos lo
                antes posible.
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-8 block font-seasons text-4xl hover:underline md:text-5xl"
              >
                {site.phoneDisplay}
              </a>
              <ul className="mt-8 flex flex-wrap gap-3">
                {contact.map(
                  ({ href, icon: Icon, label, external: isExternal }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(isExternal && external)}
                        className={`inline-flex items-center gap-2 rounded-full border border-background/40 px-5 py-2.5 font-bold hover:bg-background hover:text-olive-dark ${lift}`}
                      >
                        <Icon className="size-5" />
                        {label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div data-reveal="zoom" style={delay(300)} className="mx-auto">
              <Image
                src={logoAcuarela}
                alt={site.name}
                sizes="288px"
                className="float w-56 rounded-full md:w-72"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-sm">
        {site.name} · Vivienda vacacional pet friendly · Asturias
        <LegalLinks />
      </footer>
    </>
  );
}
