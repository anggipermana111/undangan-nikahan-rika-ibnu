import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
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
  themeColor: "#2d4234",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${cormorant.variable} ${dmSans.variable} ${alexBrush.variable}`}>
      <body className="antialiased selection:bg-emerald-100 selection:text-emerald-900 font-sans text-stone-700 bg-[#f7f9f8]">
        {children}
      </body>
    </html>
  );
}
