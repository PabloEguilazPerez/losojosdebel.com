import { cacheLife, cacheTag } from "next/cache";

// WordPress used as a headless CMS through its public REST API. Without WORDPRESS_URL the
// site has no blog posts or WordPress pages.
export const wordpressUrl = (process.env.WORDPRESS_URL ?? "").replace(/\/$/, "");

export type WpImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type WpEntry = {
  slug: string;
  date: string;
  modified: string;
  title: string;
  excerpt: string;
  content: string;
  /** Featured image from the media library, shown above the article. */
  image: WpImage | null;
  /** Featured image, or else the first image in the content: for cards and social previews. */
  cover: { url: string; alt: string } | null;
};

type WpRaw = {
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      alt_text?: string;
      media_details?: { width?: number; height?: number };
    }[];
  };
};

// Every WordPress read is tagged "wordpress" so /api/revalidate can refresh them all at once.
async function wp(path: string): Promise<WpRaw[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("wordpress");
  if (!wordpressUrl) return [];
  try {
    const res = await fetch(`${wordpressUrl}/wp-json/wp/v2/${path}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    // WordPress down or unreachable: render the site without its content rather than failing.
    return [];
  }
}

function firstImage(html: string) {
  const tag = html.match(/<img\b[^>]*>/i)?.[0];
  const url = tag?.match(/\ssrc="([^"]+)"/i)?.[1];
  if (!url) return null;
  return {
    url: plainText(url),
    alt: plainText(tag!.match(/\salt="([^"]*)"/i)?.[1] ?? ""),
  };
}

function toEntry(raw: WpRaw): WpEntry {
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  const image =
    media?.source_url &&
    media.media_details?.width &&
    media.media_details.height
      ? {
          url: media.source_url,
          width: media.media_details.width,
          height: media.media_details.height,
          alt: media.alt_text ?? "",
        }
      : null;
  return {
    slug: raw.slug,
    date: `${raw.date_gmt}Z`,
    modified: `${raw.modified_gmt}Z`,
    title: raw.title.rendered,
    excerpt: raw.excerpt?.rendered ?? "",
    content: raw.content.rendered,
    image,
    cover: image ?? firstImage(raw.content.rendered),
  };
}

const embed = "_embed=wp:featuredmedia";

export async function getPosts(limit = 100) {
  return (await wp(`posts?per_page=${limit}&${embed}`)).map(toEntry);
}

export async function getPost(slug: string) {
  const [raw] = await wp(`posts?slug=${encodeURIComponent(slug)}&${embed}`);
  return raw ? toEntry(raw) : null;
}

export async function getPages() {
  return (await wp(`pages?per_page=100&${embed}`)).map(toEntry);
}

export async function getPage(slug: string) {
  const [raw] = await wp(`pages?slug=${encodeURIComponent(slug)}&${embed}`);
  return raw ? toEntry(raw) : null;
}

const entities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
};

// Plain text from WordPress HTML (titles, excerpts), for metadata and places that can't render HTML.
export function plainText(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(
      /&([a-z]+);/gi,
      (match, name) => entities[name.toLowerCase()] ?? match,
    )
    .replace(/\s+/g, " ")
    .trim();
}

// Images hosted on the WordPress server go through the Next.js optimizer (see remotePatterns);
// images hot-linked from other sites are served as they are.
export function isOptimizable(url: string) {
  return !!wordpressUrl && url.startsWith(`${wordpressUrl}/wp-content/uploads/`);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
    timeZone: "Europe/Madrid",
  }).format(new Date(iso));
}
