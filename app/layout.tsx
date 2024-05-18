import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Annyknits",
  description: "A minimalistic counter with themes and persisted value 🧶",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} relative h-screen w-screen overflow-hidden bg-black font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
