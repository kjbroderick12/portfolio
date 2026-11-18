
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/components/navbar/Navbar";
import Footer from "@/shared/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
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
      <body className={bricolage.variable}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
