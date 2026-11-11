import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wedding of Dedy & Tiara",
  description: "Undangan Pernikahan Digital Dedy & Tiara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased selection:bg-primary-200 selection:text-primary-900">
        {children}
      </body>
    </html>
  );
}
