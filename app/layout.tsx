import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  ),

  title: {
    default: "Akbaş Nakliyat | Türkiye Geneli Güvenli Taşımacılık",
    template: "%s | Akbaş Nakliyat",
  },

  description:
    "Akbaş Nakliyat; Kayseri merkezli, Türkiye genelinde şehir içi ve şehirler arası profesyonel sanayi taşımacılığı hizmeti sunar. Güvenli, sigortalı ve zamanında teslimat.",

  keywords: [
    "Akbaş Nakliyat",
    "Kayseri nakliyat",
    "şehirler arası nakliye",
    "sanayi taşımacılığı",
    "yük taşımacılığı",
    "Türkiye geneli nakliye"
  ],

  authors: [{ name: "Akbaş Nakliyat" }],
  creator: "Akbaş Nakliyat",
  publisher: "Akbaş Nakliyat",

  openGraph: {
    title: "Akbaş Nakliyat | Güvenli ve Profesyonel Taşımacılık",
    description:
      "Türkiye genelinde sanayi taşımacılığı, şehir içi ve şehirler arası nakliye hizmeti.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "Akbaş Nakliyat",
    images: [
      {
        url: "/images/projects/1.webp",
        width: 1200,
        height: 630,
        alt: "Akbaş Nakliyat Taşımacılık Hizmeti",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Akbaş Nakliyat",
    description: "Türkiye genelinde profesyonel nakliye hizmeti.",
    images: ["/images/projects/1.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        {children}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovingCompany",
            name: "Akbaş Nakliyat",
            url: process.env.NEXT_PUBLIC_SITE_URL,
            telephone: "+905324420987",
            areaServed: {
              "@type": "Country",
              name: "Turkey"
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kayseri",
              addressCountry: "TR"
            },
            sameAs: [
              `https://wa.me/905324420987`
            ]
          }),
        }}
      />

      
      </body>
    </html>
  );
}
