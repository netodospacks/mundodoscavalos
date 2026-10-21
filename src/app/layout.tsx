import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
  keywords: [
    "cavalos",
    "equinos",
    "manejo equino",
    "bem-estar animal",
    "curso equinos",
    "haras",
    "Mundo dos Cavalos",
    "Curso de Tratadores",
    "Haras Nossa Senhora Aparecida",
  ],
  authors: [{ name: "Mundo dos Cavalos — Haras Nossa Senhora Aparecida" }],
  openGraph: {
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
