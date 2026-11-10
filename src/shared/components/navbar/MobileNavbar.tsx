"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";

const mobileNavFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

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
      {/* Menu Toggle Trigger */}
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#030405]/80 text-white/90 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-[#6fbd68]/40 hover:bg-[#6fbd68]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68] md:hidden"
      >
        {isOpen ? (
          <X size={20} strokeWidth={2} />
        ) : (
          <Menu size={20} strokeWidth={2} />
        )}
      </button>

      {/* Drawer Stage Container */}
      <div
        id="mobile-navigation"
        className={`${mobileNavFont.className} fixed inset-0 z-40 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        onClick={closeMenu}
      >
        {/* Dark Backdrop Overlay */}
        <div
          className={`absolute inset-0 bg-[#030405]/90 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sliding Navigation Drawer Panel */}
        <div
          onClick={(event) => event.stopPropagation()}
          className={`absolute inset-y-0 right-0 flex h-dvh w-full max-w-95-col overflow-hidden border-l border-white/4 bg-[#030405] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Subtle Accent Environmental Space Ambient Lights */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6fbd68]/8 blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#6fbd68]/4 blur-[80px]"
          />

          {/* Adjusted padding top now that header logo is stripped out */}
          <div className="relative flex min-h-0 flex-1 flex-col px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-28 sm:px-8">
            
            {/* Staggered Link Tracking Container Layout */}
            <nav
              className="my-auto flex min-h-0 flex-col justify-center py-6"
              aria-label="Mobile navigation routes"
            >
              <p 
                className={`mb-4 pl-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6fbd68] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                Explore
              </p>

              <ul className="space-y-1">
                {links.map((link, idx) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  const delays = [
                    "delay-[100ms]",
                    "delay-[150ms]",
                    "delay-[200ms]",
                    "delay-[250ms]",
                    "delay-[300ms]"
                  ];
                  const activeDelay = delays[idx] || "delay-[0ms]";

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        tabIndex={isOpen ? 0 : -1}
                        className={`group relative flex items-center gap-4 rounded-xl py-3 pl-4 pr-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeDelay} ${
                          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        } ${
                          isActive
                            ? "bg-[#6fbd68]/6"
                            : "hover:bg-white/2"
                        }`}
                      >
                        {/* Active Line indicator pin */}
                        <span
                          className={`absolute bottom-3 left-0 top-3 w-0.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.7)]"
                              : "bg-transparent group-hover:bg-[#6fbd68]/40"
                          }`}
                        />

                        {/* Label Content */}
                        <span
                          className={`text-2xl font-semibold tracking-[-0.02em] transition-all duration-300 ${
                            isActive
                              ? "translate-x-1 text-[#6fbd68]"
                              : "text-white/70 group-hover:translate-x-1 group-hover:text-white"
                          }`}
                        >
                          {link.label}
                        </span>

                        {/* Arrow Link Vector Icon */}
                        <ArrowUpRight
                          size={18}
                          strokeWidth={2.5}
                          className={`ml-auto shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-[#6fbd68] opacity-100"
                              : "-translate-x-1 text-white/10 opacity-0 group-hover:translate-x-0 group-hover:text-[#6fbd68] group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom Contact CTA Area Footer Box */}
            <div 
              className={`shrink-0 pt-4 border-t border-white/4 transition-all duration-700 delay-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="group relative block overflow-hidden rounded-2xl border border-[#6fbd68]/15 bg-white/1 p-5 transition-all duration-300 hover:border-[#6fbd68]/40 hover:bg-[#6fbd68]/2"
              >
                <div className="relative z-10">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_8px_rgba(111,189,104,0.8)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6fbd68]">
                      Have a vision?
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        Let&apos;s build it.
                      </h3>
                      <p className="mt-0.5 text-xs text-white/40 transition-colors duration-300 group-hover:text-white/60">
                        Initiate project discussion
                      </p>
                    </div>
                    <ArrowUpRight 
                      size={16} 
                      strokeWidth={2.5} 
                      className="text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#6fbd68]"
                    />
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
