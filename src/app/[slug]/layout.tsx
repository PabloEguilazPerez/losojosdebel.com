import { SiteShell } from "@/components/site-shell";

export default function WpPageLayout({ children }: LayoutProps<"/[slug]">) {
  return <SiteShell>{children}</SiteShell>;
}
