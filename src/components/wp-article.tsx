import Image from "next/image";
import { formatDate, plainText, type WpEntry } from "@/lib/wordpress";

// A WordPress post or page. The HTML comes from our own WordPress, so it is rendered as is.
export function WpArticle({
  entry,
  showDate,
}: {
  entry: WpEntry;
  showDate?: boolean;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-10 text-center">
        {showDate && (
          <time
            dateTime={entry.date}
            className="text-xs font-bold tracking-[0.2em] text-olive-light uppercase"
          >
            {formatDate(entry.date)}
          </time>
        )}
        <h1 className="mt-2 font-seasons text-4xl leading-tight text-olive md:text-5xl">
          {plainText(entry.title)}
        </h1>
      </header>
      {entry.image && (
        <Image
          src={entry.image.url}
          alt={entry.image.alt}
          width={entry.image.width}
          height={entry.image.height}
          sizes="(min-width: 768px) 736px, 100vw"
          className="mb-10 w-full rounded-2xl"
          preload
        />
      )}
      <div
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: entry.content }}
      />
    </article>
  );
}
