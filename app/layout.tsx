import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArcticAir — AC Service & Installation",
  description: "Solusi pendingin udara terpercaya. Instalasi, servis, dan perawatan AC untuk hunian dan komersial.",
  keywords: "service AC, instalasi AC, cuci AC, perbaikan AC, AC rumah, AC kantor",
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
