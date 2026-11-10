"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";
import MobileNavbar from "./MobileNavbar";

const navFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Me", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={`${navFont.className} fixed inset-x-0 top-0 z-50`}>
      <nav className="mx-auto flex h-20 items-center justify-between border-b border-white/4 bg-[#030405]/40 px-6 backdrop-blur-md lg:px-16">
        
        {/* Logo - Kept visible across mobile, hidden state removed */}
        <Link
          href="/"
          className="relative flex items-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <Image
            src="/images/logo/kb-logo.png"
            alt="kaitlynn.b"
            width={50}
            height={50}
            priority
            className="h-auto w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "text-[#6fbd68]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.6)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <MobileNavbar links={navLinks} />
      </nav>
    </header>
  );
}
