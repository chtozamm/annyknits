import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Annyknits - Knitting counter 🧶",
  description:
    "A simple counter that's designed to help you keep track of the knitting patterns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="max-w-screen h-screen max-h-screen w-screen overflow-hidden bg-[#ff6f70]"
    >
      <head>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#ff6f70" />
        </head>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
