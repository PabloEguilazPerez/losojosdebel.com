import { revalidateTag } from "next/cache";

// Called by WordPress after publishing (POST /api/revalidate?secret=...) so the site picks
// up the change on the next visit instead of waiting for the hourly refresh.
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  revalidateTag("wordpress", "max");
  return Response.json({ revalidated: true });
}
