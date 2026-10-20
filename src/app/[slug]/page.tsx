import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WpArticle } from "@/components/wp-article";
import { notFoundMetadata } from "@/app/not-found";
import { site } from "@/lib/site";
import { getPage, getPages, plainText } from "@/lib/wordpress";

// WordPress pages at /<slug>. Routes defined in the app (/blog…) take precedence.
export async function generateStaticParams() {
  const pages = await getPages();
  // Cache Components needs at least one param; "_" just renders the not-found page.
  return pages.length
    ? pages.map((page) => ({ slug: page.slug }))
    : [{ slug: "_" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const page = await getPage((await params).slug);
  if (!page) return notFoundMetadata;
  const title = `${plainText(page.title)} · ${site.name}`;
  const description = plainText(page.excerpt || page.content).slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title, description },
  };
}

async function Page({ params }: Pick<PageProps<"/[slug]">, "params">) {
  const page = await getPage((await params).slug);
  if (!page) notFound();
  return <WpArticle entry={page} />;
}

export default function WpPage({ params }: PageProps<"/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Page params={params} />
    </Suspense>
  );
}
