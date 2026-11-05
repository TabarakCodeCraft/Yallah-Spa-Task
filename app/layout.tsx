import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

import { Alexandria, Inter, Playfair_Display } from "next/font/google";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: "Yallah Spa | يلا سبا",
  description: "Yallah Spa - Your destination for relaxation and beauty.",

  openGraph: {
    title: "Yallah Spa | يلا سبا",
    description: "Yallah Spa - Your destination for relaxation and beauty.",
    url: "/",
    siteName: "Yallah Spa",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yallah Spa",
      },
    ],
    locale: "ar_IQ",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${alexandria.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
