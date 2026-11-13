import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/components/navbar/Navbar";
import Footer from "@/shared/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kaitlynn.b | Software Developer",
  description:
    "Portfolio of Kaitlynn Broderick, a software developer focused on building thoughtful, reliable, and well-crafted software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}