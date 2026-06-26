import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xeina Property | General Contractor, Renovasi Bangunan & Service AC",
  description: "Xeina Property melayani renovasi bangunan, maintenance properti, interior, instalasi AC, dan service AC untuk hunian serta bisnis.",
  keywords: "Xeina Property, general contractor, kontraktor renovasi, renovasi bangunan, renovasi rumah, renovasi ruko, service AC, instalasi AC, maintenance gedung",
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
