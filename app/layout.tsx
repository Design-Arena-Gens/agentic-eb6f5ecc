import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluxFrame AI Video Studio",
  description:
    "Transform images into cinematic videos using AI-driven motion, styling, and feedback loops."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} min-h-screen bg-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
