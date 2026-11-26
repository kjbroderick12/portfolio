import type { Metadata } from "next";

import { ArrowDown } from "lucide-react";
import ContactForm from "@/features/contact/components/ContactForm";
import ContactInfo from "@/features/contact/components/ContactInfo";
import ScrollReveal from "@/shared/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? Get in touch with Kaitlynn Broderick to discuss custom software, website development, improvements, or your next idea.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#080d12] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-[#6fbd68]/4.5 blur-[130px]" />
        <div className="absolute -left-40 top-[42%] h-100 w-100 rounded-full bg-[#6fbd68]/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 lg:px-12">
        {/* Hero */}
        <ScrollReveal>
          <section className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#6fbd68]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6fbd68]">
                Let's connect
              </span>
            </div>

            <h1 className="font-(family-name:--font-bricolage) text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Let's talk about
              <span className="block text-[#6fbd68]">
                what you're building.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Whether you have a project in mind, need help improving something
              you already have, or aren't quite sure where to start, I'd love to
              hear more.
            </p>

            <a
              href="#contact-form"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-4 py-2 text-sm font-medium text-[#8ce085] transition hover:border-[#6fbd68]/50 hover:bg-[#6fbd68]/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
            >
              Tell me about your project
              <ArrowDown size={15} />
            </a>
          </section>
        </ScrollReveal>

        {/* Main contact content */}
        <div
          id="contact-form"
          className="mt-16 grid scroll-mt-28 gap-16 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16"
        >
          <div className="min-w-0">
            <ScrollReveal>
              <div className="mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                  Project inquiry
                </p>

                <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight sm:text-3xl">
                  Tell me what you have in mind.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                  Share a little about what you need. The more I know, the
                  better I can understand how to help.
                </p>
              </div>
            </ScrollReveal>

            <ContactForm />
          </div>

          <ContactInfo />
        </div>
      </div>
    </main>
  );
}