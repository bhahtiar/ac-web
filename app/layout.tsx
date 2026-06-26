import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xeinaservice.web.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Xeina Property | General Contractor, Renovasi Bangunan & Service AC",
    template: "%s | Xeina Property",
  },
  description: "Xeina Property melayani renovasi bangunan, maintenance properti, interior, instalasi AC, dan service AC untuk hunian serta bisnis.",
  keywords: "Xeina Property, general contractor, kontraktor renovasi, renovasi bangunan, renovasi rumah, renovasi ruko, service AC, instalasi AC, maintenance gedung",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Xeina Property | General Contractor, Renovasi Bangunan & Service AC",
    description: "Renovasi bangunan, maintenance properti, instalasi AC, dan service AC untuk rumah, ruko, kantor, dan bisnis.",
    url: "/",
    siteName: "Xeina Property",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/contractor-hero.png",
        width: 1024,
        height: 1024,
        alt: "Xeina Property melayani renovasi bangunan dan service AC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xeina Property | Renovasi Bangunan & Service AC",
    description: "General contractor untuk renovasi bangunan, maintenance properti, instalasi AC, dan service AC.",
    images: ["/contractor-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "home services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
