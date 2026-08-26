import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackgroundScene from "@/components/layout/BackgroundScene";
import CookieConsent from "@/components/analytics/CookieConsent";
import { siteConfig, legalEntity } from "@/lib/site";
import { pricingPlans } from "@/lib/content";
import { getChangelog } from "@/lib/changelog";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e15" },
  ],
};

// Runs before paint to avoid a light/dark flash on load.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('planr-theme');
    var theme = stored || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

const startPlan = pricingPlans.find((p) => p.id === "start")!;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: legalEntity.name,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  taxID: legalEntity.inn,
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Воронежская область",
    addressLocality: "Воронеж",
    streetAddress: "ул. Транспортная, д. 12, оф. 3",
    postalCode: "394024",
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  description: siteConfig.description,
  url: siteConfig.url,
  offers: {
    "@type": "Offer",
    price: String(startPlan.price),
    priceCurrency: "RUB",
    url: `${siteConfig.url}/pricing`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const changelogEntries = await getChangelog();

  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <BackgroundScene />
        <Header changelogEntries={changelogEntries} />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
