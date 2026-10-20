import Image from "next/image";
import Link from "next/link";
import {
  formatDate,
  isOptimizable,
  plainText,
  type WpEntry,
} from "@/lib/wordpress";

export function PostCard({ post }: { post: WpEntry }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-olive/15 bg-white/60 transition hover:border-olive/40 hover:bg-white">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[3/2] overflow-hidden bg-olive/10">
          {post.cover && (
            <Image
              src={post.cover.url}
              alt={post.cover.alt}
              fill
              unoptimized={!isOptimizable(post.cover.url)}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <time
            dateTime={post.date}
            className="text-xs font-bold tracking-[0.2em] text-olive-light uppercase"
          >
            {formatDate(post.date)}
          </time>
          <h3 className="mt-2 font-seasons text-2xl leading-tight text-olive">
            {plainText(post.title)}
          </h3>
          <p className="mt-3 line-clamp-3">{plainText(post.excerpt)}</p>
          <span className="mt-auto pt-4 text-sm font-bold text-olive">
            Leer más →
          </span>
        </div>
      </Link>
    </article>
  );
}
