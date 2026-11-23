import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Los Ojos de Bel",
    "vivienda vacacional",
    "pet friendly",
    "se admiten mascotas",
    "alojamiento con perro",
    "casa rural",
    "alojamiento",
    "Asturias",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.background,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${roboto.variable} h-full antialiased`}>
      <head>
        {/* "the-seasons" is an Adobe Fonts font served by the site's Typekit kit */}
        <link rel="stylesheet" href="https://use.typekit.net/ugk4ull.css" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
