
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  // Close the menu when Escape is pressed.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Toggle */}
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-70 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#080d12]/80 text-white/90 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-[#6fbd68]/40 hover:bg-[#6fbd68]/10 hover:text-[#a7f3d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68] md:hidden"
      >
        {isOpen ? (
          <X size={22} strokeWidth={1.5} />
        ) : (
          <Menu size={22} strokeWidth={1.5} />
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-60 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        onClick={closeMenu}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#020504]/80 backdrop-blur-md transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Navigation Panel */}
        <div
          onClick={(event) => event.stopPropagation()}
          className={`absolute inset-x-0 top-0 flex h-dvh flex-col overflow-hidden border-b border-[#6fbd68]/15 bg-[#080d12] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Ambient Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#6fbd68]/9 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#6fbd68]/4.5 blur-[100px]"
          />

          {/* Top Accent */}
          <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-[#6fbd68]/50 to-transparent" />

          <div className="relative flex min-h-0 flex-1 flex-col px-7 pb-[max(20px,env(safe-area-inset-bottom))] pt-[max(24px,env(safe-area-inset-top))] sm:px-9">
            {/* Header */}
            <div className="flex shrink-0 items-center">
              <Image
                src="/images/logo/kb-logo.png"
                alt="kaitlynn.b"
                width={88}
                height={30}
                priority
              />
            </div>

            {/* Navigation Links */}
            <nav
              className="my-auto flex min-h-0 flex-col justify-center py-6"
              aria-label="Mobile navigation"
            >
              <p className="mb-4 pl-5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#6fbd68]">
                Explore
              </p>

              <ul className="space-y-1">
                {links.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        tabIndex={isOpen ? 0 : -1}
                        className={`group relative flex items-center gap-4 rounded-r-lg py-3 pl-5 pr-3 transition-all duration-300 ${
                          isActive
                            ? "bg-[#6fbd68]/6"
                            : "hover:bg-white/2.5"
                        }`}
                      >
                        {/* Active Indicator */}
                        <span
                          className={`absolute bottom-2.5 left-0 top-2.5 w-0.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.7)]"
                              : "bg-transparent group-hover:bg-[#6fbd68]/50"
                          }`}
                        />

                        {/* Link Label */}
                        <span
                          className={`text-[clamp(1.6rem,7vw,2rem)] font-medium tracking-tight transition-all duration-300 ${
                            isActive
                              ? "translate-x-1 text-[#6fbd68]"
                              : "text-white/80 group-hover:translate-x-1 group-hover:text-[#a7f3d0]"
                          }`}
                        >
                          {link.label}
                        </span>

                        {/* Arrow */}
                        <ArrowUpRight
                          size={19}
                          strokeWidth={1.5}
                          className={`ml-auto shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-[#6fbd68] opacity-100"
                              : "-translate-x-1.25 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:text-[#6fbd68] group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact CTA */}
            <div className="shrink-0">
              <Link
                href="/contact"
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="group relative block overflow-hidden rounded-2xl border border-[#6fbd68]/20 bg-[#101b15] p-4 transition-all duration-300 hover:border-[#6fbd68]/50 hover:bg-[#142319] sm:p-5"
              >
                {/* CTA Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#6fbd68]/10 blur-[55px] transition-all duration-500 group-hover:bg-[#6fbd68]/20"
                />

                <div className="relative">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_8px_rgba(111,189,104,0.8)]" />

                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#a7f3d0]">
                      Have something in mind?
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Let&apos;s make it happen.
                      </h3>

                      <p className="mt-1 text-sm text-white/45 transition-colors duration-300 group-hover:text-white/65">
                        Start a conversation
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 text-[#6fbd68] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-[#6fbd68] group-hover:text-[#080d12]">
                      <ArrowUpRight size={21} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-5 flex shrink-0 items-center justify-between gap-3">
              <span className="text-[0.56rem] font-semibold tracking-[0.14em] text-white/30">
                SOFTWARE DEVELOPER
              </span>

              <span className="text-[0.56rem] tracking-widest text-white/25">
                © {new Date().getFullYear()} KAITLYNN.B
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
