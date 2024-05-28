import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.css";

const reddit_mono = Reddit_Mono({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Bunhere | Tarot",
  description: "Generate your cards with ChatGPT and Gemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={reddit_mono.className}>
      <body>{children}</body>
    </html>
  );
}
