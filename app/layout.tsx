import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xeinaservice.web.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Xeina Service | Jasa Cuci Service Jual Pasang AC & Vacuum Tungau",
    template: "%s | Xeina Service",
  },
  description: "Xeina Service melayani jasa cuci AC, service AC, jual AC, pasang AC, dan cuci vacuum tungau untuk sofa serta kasur di Jabodetabek.",
  keywords: "Xeina Service, jasa cuci AC, service AC, jual AC, pasang AC, cuci vacuum tungau, vacuum tungau sofa, vacuum tungau kasur, cuci sofa, cuci kasur, service AC Jakarta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Xeina Service | Jasa Cuci Service Jual Pasang AC & Vacuum Tungau",
    description: "Cuci AC, service AC, jual pasang AC, dan cuci vacuum tungau sofa kasur untuk rumah, apartemen, kantor, dan usaha.",
    url: "/",
    siteName: "Xeina Service",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/xeina-service-hero.png",
        width: 1024,
        height: 1024,
        alt: "Xeina Service melayani cuci AC, service AC, dan vacuum tungau sofa kasur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xeina Service | Cuci Service Jual Pasang AC",
    description: "Jasa cuci AC, service AC, jual pasang AC, dan cuci vacuum tungau sofa kasur.",
    images: ["/xeina-service-hero.png"],
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
