import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/components/navbar/Navbar";
import Footer from "@/shared/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaitlynnbroderick.dev"),

  alternates: {
    canonical: "/",
  },

  title: {
    default: "kaitlynn.b | Software Developer",
    template: "%s | Kaitlynn Broderick",
  },

  description:
    "Portfolio of Kaitlynn Broderick, a software developer focused on building thoughtful, reliable, and well-crafted software.",

  openGraph: {
    title: "Kaitlynn Broderick | Software Developer",
    description:
      "Building thoughtful, reliable, and well-crafted software.",
    url: "https://kaitlynnbroderick.dev",
    siteName: "kaitlynn.b",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kaitlynn Broderick | Software Developer",
    description:
      "Building thoughtful, reliable, and well-crafted software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolage.variable}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
