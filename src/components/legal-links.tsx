import Link from "next/link";
import { getPages, plainText } from "@/lib/wordpress";

// Links to the WordPress pages (aviso legal, privacidad, cookies…) for the footer.
export async function LegalLinks() {
  const pages = await getPages();
  if (!pages.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
      {pages.map((page) => (
        <li key={page.slug}>
          <Link
            href={`/${page.slug}`}
            className="hover:text-olive hover:underline"
          >
            {plainText(page.title)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
