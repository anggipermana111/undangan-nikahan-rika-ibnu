import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "The Wedding of Ibnu & Rika",
  description: "Undangan Pernikahan Digital Ibnu Rizal Aqila & Rika Nadiyanti",
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
