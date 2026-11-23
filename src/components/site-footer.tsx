import { LegalLinks } from "@/components/legal-links";
import { MadeBy } from "@/components/made-by";
import { site } from "@/lib/site";

// Lives in the root layout, so it stays mounted (badge included) while navigating.
export function SiteFooter() {
  return (
    <footer className="border-t border-olive/10 py-8 text-center text-sm">
      <p className="font-seasons text-xl text-olive">{site.name}</p>
      <p className="mt-1">Vivienda vacacional pet friendly · Asturias</p>
      <LegalLinks />
      <MadeBy />
    </footer>
  );
}
