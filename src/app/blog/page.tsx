import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: `Blog · ${site.name}`,
  description:
    "Novedades de Los Ojos de Bel y planes para disfrutar de Asturias.",
  alternates: { canonical: "/blog" },
};

export default async function Blog() {
  const posts = await getPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-olive-light uppercase">
          Blog
        </p>
        <h1 className="mt-2 font-seasons text-4xl text-olive md:text-5xl">
          Novedades y planes en Asturias
        </h1>
      </div>
      {posts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center">Todavía no hay entradas publicadas.</p>
      )}
    </section>
  );
}
