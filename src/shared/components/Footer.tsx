
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.07] bg-[#06090d] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/logo/kb-logo.png"
                alt="KB"
                width={50}
                height={50}
                className="h-9 w-9 object-contain"
              />
            </Link>

            <div>
              <Link
                href="/"
                className="text-base font-semibold tracking-tight transition-colors duration-300 hover:text-[#6fbd68]"
              >
                Kaitlynn Broderick
              </Link>

              <p className="mt-1 text-xs tracking-wide text-white/40">
                Software Developer
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium text-white/45 transition-colors duration-300 hover:text-[#6fbd68]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="mt-9 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-[10px] font-medium tracking-wide text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Kaitlynn Broderick. All rights reserved.
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[#6fbd68]"
          >
            Let's connect
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
