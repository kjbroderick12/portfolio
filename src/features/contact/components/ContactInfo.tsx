import type { ComponentType } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: ComponentType<{ className?: string; size?: number }>;
};

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "Kaitlynn Broderick",
    href: "mailto:kjbroderick12@gmail.com",
    external: false,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "View my projects",
    href: "https://github.com/kjbroderick12",
    external: true,
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/kaitlynn-broderick",
    external: true,
    icon: FaLinkedinIn,
  },
];

export default function ContactInfo() {
  return (
    <aside className="h-fit lg:sticky lg:top-28">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6fbd68]">
          Prefer a direct approach?
        </p>

        <h2 className="font-[family-name:var(--font-bricolage)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          You can reach me directly.
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/55">
          Sometimes a quick email is easier. Reach out directly or connect on
          another platform.
        </p>
      </div>

      <nav
        aria-label="Direct contact links"
        className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.015] px-4"
      >
        {contacts.map((contact) => {
          const Icon = contact.icon;

          return (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 py-4.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-white/60 transition-all duration-200 group-hover:scale-[1.03] group-hover:border-[#6fbd68]/40 group-hover:bg-[#6fbd68]/10 group-hover:text-[#6fbd68]">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white transition-colors group-hover:text-[#8ce085]">
                  {contact.label}
                </p>
                <p className="mt-0.5 truncate text-xs text-white/45 transition-colors group-hover:text-white/65">
                  {contact.value}
                </p>
              </div>

              <ArrowUpRight
                size={16}
                className="shrink-0 text-white/30 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6fbd68]"
              />
            </a>
          );
        })}
      </nav>

      <div className="mt-7 rounded-xl border border-white/[0.07] bg-[#6fbd68]/[0.04] p-4">
        <p className="text-sm leading-6 text-white/65">
          Not sure what you need yet? No problem—the best projects often start
          with a quick conversation.
        </p>
      </div>
    </aside>
  );
}