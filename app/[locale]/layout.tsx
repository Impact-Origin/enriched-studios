import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ViewTransitions } from "next-view-transitions";
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "../globals.css";

import { NavBar } from "@/components/navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { isLocale, localeLabels, locales, type Locale } from "@/lib/i18n";
import { JsonLd, buildMetadata, organizationJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-brand",
  weight: ["400"],
});

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);

  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    ...buildMetadata({
      locale: params.locale,
      routeKey: "home",
      title: dict.pages.home.title,
      description: dict.pages.home.description,
    }),
    title: {
      default: dict.pages.home.title,
      template: `%s · ${site.name}`,
    },
    creator: site.name,
    publisher: site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  // Font variables live on <html> so the Tailwind theme can resolve them at :root.
  return (
    <ViewTransitions>
      <html
        lang={localeLabels[locale].htmlLang}
        className={cn(manrope.variable, playfair.variable, mono.variable)}
        suppressHydrationWarning
      >
        <head>
          <noscript>
            {/* eslint-disable-next-line react/no-danger */}
            <style
              dangerouslySetInnerHTML={{
                __html: ".reveal{opacity:1!important;transform:none!important}",
              }}
            />
          </noscript>
        </head>
        <body className="bg-ink font-sans antialiased selection:bg-brand-500">
          <JsonLd data={organizationJsonLd(locale)} />
          <a
            href="#content"
            className="sr-only rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
          >
            {getDictionary(locale).ui.skip}
          </a>
          <ScrollProgress />
          <NavBar locale={locale} />
          <main id="content" tabIndex={-1}>{children}</main>
          <Footer locale={locale} />
        </body>
      </html>
    </ViewTransitions>
  );
}
