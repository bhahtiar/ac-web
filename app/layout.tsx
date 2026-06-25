import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arctic Contractor | General Contractor, Renovasi & Service AC",
  description: "General contractor untuk renovasi bangunan, pembangunan sipil, interior, maintenance gedung, listrik, plumbing, dan service AC.",
  keywords: "general contractor, kontraktor renovasi, renovasi rumah, renovasi ruko, service AC, pembangunan bangunan, maintenance gedung",
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
