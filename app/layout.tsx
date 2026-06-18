import type { Metadata } from "next";
import "./globals.css";
import StoreHydrator from "@/components/StoreHydrator";

export const metadata: Metadata = {
  title: "Tay Juhana Foundation — Suboptimal Land Knowledge Hub",
  description: "Tay Juhana Foundation produces evidence-based knowledge to optimize suboptimal land for a sustainable Indonesian food future.",
  keywords: "suboptimal land, food security, peatland, sustainable agriculture, Indonesia",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <StoreHydrator>{children}</StoreHydrator>
      </body>
    </html>
  );
}
