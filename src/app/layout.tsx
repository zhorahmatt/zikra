import type { Metadata, Viewport } from "next";
import { Newsreader, Manrope } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dzkrr — Dzikir & Doa Harian",
  description:
    "Mudah baca dzikir dan doa dimana saja. Jadikan mengingat Allah bagian dari keseharianmu.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dzkrr",
  },
  openGraph: {
    title: "Dzkrr — Dzikir & Doa Harian",
    description: "Mudah baca dzikir dan doa dimana saja.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${newsreader.variable} ${manrope.variable} h-full`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <PWAInstallBanner />
        </ThemeProvider>
      </body>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EMSFY9ETEP"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EMSFY9ETEP');
          `,
        }}
      />
    </html>
  );
}
