export const site = {
  name: "Los Ojos de Bel",
  url: "https://losojosdebel.com",
  title: "Los Ojos de Bel · Vivienda vacacional pet friendly en Asturias",
  description:
    "Vivienda vacacional pet friendly en Asturias: tu mascota es bienvenida. Casa rodeada de jardín, con salón luminoso, cocina equipada y dormitorios decorados con mimo.",
  phone: "+34667610014",
  phoneDisplay: "667 61 00 14",
  whatsapp: "https://wa.me/34667610014",
  email: "asturias@losojosdebel.com",
  instagram: "https://www.instagram.com/losojosdebel/",
  instagramHandle: "@losojosdebel",
  // Updated by hand; null hides the count on the page.
  instagramFollowers: 16500 as number | null,
  locale: "es_ES",
  background: "#faf7eb",
};

// "16,5 mil seguidores" (as Instagram shows it), or null while instagramFollowers isn't set.
export function instagramFollowersText() {
  if (site.instagramFollowers === null) return null;
  const n = new Intl.NumberFormat("es-ES", {
    notation: site.instagramFollowers >= 10000 ? "compact" : "standard",
    useGrouping: "always",
    maximumFractionDigits: 1,
  }).format(site.instagramFollowers);
  return `${n} ${site.instagramFollowers === 1 ? "seguidor" : "seguidores"}`;
}
