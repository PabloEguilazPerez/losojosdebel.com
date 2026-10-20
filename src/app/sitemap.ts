import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPages, getPosts } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...pages.map((page) => ({
      url: `${site.url}/${page.slug}`,
      lastModified: page.modified,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.modified,
      priority: 0.5,
    })),
  ];
}
