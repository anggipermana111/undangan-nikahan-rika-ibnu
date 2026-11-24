import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Pinyon_Script, Quicksand } from "next/font/google";
import "./globals.css";
import { colors } from "@/theme/colors";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://undangan-nikahan-rika-ibnu.vercel.app";
const TITLE = "The Wedding of Rika & Ibnu";
const DESCRIPTION =
  "Kamis, 3 Desember 2026 · Gedung Islamic Center Pangandaran. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rika & Ibnu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: colors.forest[900],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${cinzel.variable} ${cormorant.variable} ${pinyon.variable} ${quicksand.variable}`}
    >
      <body className="antialiased font-sans text-ink bg-forest-900 selection:bg-gold-500/30">
        {children}
      </body>
    </html>
  );
}
