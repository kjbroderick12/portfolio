"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

type MobileNavbarProps = {
  links: NavLink[];
};

export default function MobileNavbar({ links }: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-70 ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-white/20 hover:bg-white/5 hover:text-[#6fbd68] md:hidden"
      >
        {isOpen ? (
          <X size={23} strokeWidth={1.5} />
        ) : (
          <Menu size={23} strokeWidth={1.5} />
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-60 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Menu Panel */}
        <div
          onClick={(event) => event.stopPropagation()}
          className={`absolute right-0 top-0 h-[78vh] w-[88%] max-w-md rounded-bl-3xl border-b border-l border-white/10 bg-slate-950 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-6 py-6 sm:px-8 sm:py-8">
            {/* Header */}
            <div className="flex h-10 items-center">
              {/* Logo - intentionally not clickable */}
              <div className="flex items-center">
                <Image
                  src="/images/logo/kb-logo.png"
                  alt="kaitlynn.b"
                  width={88}
                  height={30}
                  priority
                />
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="mt-10">
              <ul>
                {links.map((link, index) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between py-4"
                      >
                        <span
                          className={`text-2xl font-medium tracking-tight transition-colors ${
                            isActive
                              ? "text-[#6fbd68]"
                              : "text-white group-hover:text-[#6fbd68]"
                          }`}
                        >
                          {link.label}
                        </span>

                        <ArrowUpRight
                          size={22}
                          strokeWidth={1.5}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-[#6fbd68]"
                              : "text-white/40 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6fbd68]"
                          }`}
                        />
                      </Link>

                      {index < links.length - 1 && (
                        <div className="h-px w-full bg-white/10" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="mt-auto">
              <p className="max-w-xs text-lg leading-snug text-white/50">
                Have a project in mind?
              </p>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="group mt-5 flex items-center justify-between border-b border-[#6fbd68]/40 pb-3 text-lg font-medium text-white transition-colors hover:border-[#6fbd68]"
              >
                <span>Get a Quote</span>

                <ArrowUpRight
                  size={21}
                  strokeWidth={1.5}
                  className="text-[#6fbd68] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}