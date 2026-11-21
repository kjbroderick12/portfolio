import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className={`${bricolage.variable} w-full border-t border-white/8 bg-[#080d12] px-5 py-8 font-(family-name:--font-bricolage) text-white sm:px-10 sm:py-10 lg:px-16`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Brand Identity + Integrated Copyright */}
        <div className="flex items-start gap-3.5 sm:items-center">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-[#0b1117] transition-colors group-hover:border-[#6fbd68]/45 sm:h-10 sm:w-10"
          >
            <Image
              src="/images/logo/kb-logo.png"
              alt="KB logo"
              width={36}
              height={36}
              className="h-6 w-6 object-contain"
            />
          </Link>

          <div className="min-w-0">
            <Link
              href="/"
              className="block text-base font-semibold tracking-tight text-white transition-colors hover:text-[#6fbd68]"
            >
              Kaitlynn Broderick
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6fbd68]/85">
              Software Developer
            </p>
            <p className="mt-1.5 text-xs text-white/45 sm:mt-1 sm:text-white/40">
              © {new Date().getFullYear()} Kaitlynn Broderick. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right: Navigation + Direct CTA */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:items-end sm:border-t-0 sm:pt-0">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-1.5 sm:justify-end sm:gap-x-6"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-medium text-white/60 transition-colors hover:text-[#6fbd68] sm:min-h-9 sm:text-white/55"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="group inline-flex min-h-10 w-full items-center justify-between rounded-xl border border-[#6fbd68]/25 bg-[#6fbd68]/6 px-4 font-mono text-xs uppercase tracking-[0.14em] text-[#6fbd68] transition-colors hover:border-[#6fbd68]/45 hover:bg-[#6fbd68]/10 hover:text-[#82cf7a] sm:min-h-9 sm:w-auto sm:justify-center sm:gap-1.5 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0"
          >
            Start a conversation
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}