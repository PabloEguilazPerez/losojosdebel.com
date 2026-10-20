import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WpArticle } from "@/components/wp-article";
import { notFoundMetadata } from "@/app/not-found";
import { site } from "@/lib/site";
import { getPost, getPosts, plainText } from "@/lib/wordpress";

export async function generateStaticParams() {
  const posts = await getPosts();
  // Cache Components needs at least one param; "_" just renders the not-found page.
  return posts.length
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "_" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return notFoundMetadata;
  const title = `${plainText(post.title)} · ${site.name}`;
  const description = plainText(post.excerpt).slice(0, 160);
  const images = post.cover ? [post.cover.url] : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images,
    },
  };
}

async function Post({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return <WpArticle entry={post} showDate />;
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <Post params={params} />
      </Suspense>
      <p className="pb-16 text-center">
        <Link
          href="/blog"
          className="font-bold text-olive hover:text-olive-dark"
        >
          ← Volver al blog
        </Link>
      </p>
    </>
  );
}
