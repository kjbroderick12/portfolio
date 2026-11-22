import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ArrowDown } from "lucide-react";
import ContactForm from "@/features/contact/components/ContactForm";
import ContactInfo from "@/features/contact/components/ContactInfo";
import ScrollReveal from "@/shared/components/ScrollReveal";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contact | Kaitlynn Broderick",
  description:
    "Have a project in mind or need help with something? Let's talk about what you're building.",
};

export default function ContactPage() {
  return (
    <main
      className={`${bricolage.variable} relative min-h-screen overflow-hidden bg-[#0b0e0d] text-white`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6fbd68]/[0.045] blur-[130px]" />
        <div className="absolute left-[-15%] top-[40%] h-[400px] w-[400px] rounded-full bg-[#6fbd68]/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40 lg:px-12">
        {/* Hero */}
        <ScrollReveal>
          <section className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#6fbd68]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6fbd68]">
                Let's connect
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Let's talk about
              <span className="block text-[#6fbd68]"> what you're building.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Whether you have a project in mind, need help improving something
              you already have, or aren't quite sure where to start, I'd love to
              hear more.
            </p>

            <a
              href="#contact-form"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-4 py-2 text-sm font-medium text-[#8ce085] transition hover:border-[#6fbd68]/50 hover:bg-[#6fbd68]/15 hover:text-white"
            >
              Tell me about your project
              <ArrowDown size={15} />
            </a>
          </section>
        </ScrollReveal>

        {/* Main contact content */}
        <div
          id="contact-form"
          className="mt-20 grid scroll-mt-28 gap-14 lg:grid-cols-[1fr_340px] lg:gap-16"
        >
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                  Project inquiry
                </p>

                <h2 className="font-[family-name:var(--font-bricolage)] text-2xl font-semibold tracking-tight sm:text-3xl">
                  Tell me what you have in mind.
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/50">
                  Share a little about what you need. The more I know, the better
                  I can understand how to help.
                </p>
              </div>
            </ScrollReveal>

            <ContactForm />
          </div>

          <ScrollReveal>
            <ContactInfo />
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}