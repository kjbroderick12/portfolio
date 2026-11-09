
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";

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
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-20 items-center justify-between border-b border-white/[0.04] bg-black/20 px-6 backdrop-blur-md lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="relative top-1 hidden items-center md:flex"
        >
          <Image
            src="/images/logo/kb-logo.png"
            alt="kaitlynn.b"
            width={88}
            height={30}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
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
                className={`relative py-2 text-sm transition-colors duration-300 ${
                  isActive
                    ? "text-[#6fbd68]"
                    : "text-white/80 hover:text-[#a7f3d0]"
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-[#6fbd68] shadow-[0_0_8px_rgba(111,189,104,0.35)]" />
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
