"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Globe,
  Layers3,
  Lightbulb,
  Loader2,
  Mail,
  Phone,
  Workflow,
  Wrench,
} from "lucide-react";
import ScrollReveal from "@/shared/components/ScrollReveal";
import {
  allowedContactMethods,
  contactSchema,
  getFieldErrors,
  type AllowedDay,
  type ContactFieldErrors,
  type ContactFormValues,
  type ContactMethod,
  type ServiceKey,
} from "@/features/contact/schemas/contactSchema";

const services: {
  id: ServiceKey;
  label: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    id: "website",
    label: "Website Development",
    description: "Websites, redesigns, and landing pages",
    icon: Globe,
  },
  {
    id: "software",
    label: "Custom Software",
    description: "Applications, tools, and custom solutions",
    icon: Layers3,
  },
  {
    id: "automation",
    label: "Automation & Integrations",
    description: "Workflow automation and connected systems",
    icon: Workflow,
  },
  {
    id: "improvements",
    label: "Updates & Improvements",
    description: "Existing projects, features, and fixes",
    icon: Wrench,
  },
  {
    id: "support",
    label: "Development Support",
    description: "Additional development or collaboration",
    icon: Code2,
  },
  {
    id: "other",
    label: "Something Else",
    description: "Something that doesn't fit these categories",
    icon: Lightbulb,
  },
];

const weekdays: Exclude<AllowedDay, "Flexible">[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const initialForm: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  services: [],
  description: "",
  contactMethod: "Email",
  availabilityDays: [],
  availabilityTime: "",
  timeline: "",
  availabilityDetails: "",
  website: "",
};

interface SubmittedSummary {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  services: string[];
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormValues>(initialForm);
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submittedSummary, setSubmittedSummary] =
    useState<SubmittedSummary | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");

  const showPhoneInput =
    form.contactMethod === "Phone" || form.contactMethod === "Either";

  const revalidateIfTouched = (
    nextForm: ContactFormValues,
    nextTouched: Partial<Record<keyof ContactFormValues, boolean>>
  ) => {
    const allErrors = getFieldErrors(nextForm);
    const visibleErrors: ContactFieldErrors = {};

    (Object.keys(nextTouched) as (keyof ContactFormValues)[]).forEach(
      (key) => {
        if (nextTouched[key] && allErrors[key]) {
          visibleErrors[key] = allErrors[key];
        }
      }
    );

    setErrors(visibleErrors);
  };

  const updateField = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    if (touched[field] || field === "contactMethod") {
      revalidateIfTouched(nextForm, touched);
    }
  };

  const handleBlur = (field: keyof ContactFormValues) => {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    revalidateIfTouched(form, nextTouched);
  };

  const toggleService = (serviceId: ServiceKey) => {
    const nextServices = form.services.includes(serviceId)
      ? form.services.filter((item) => item !== serviceId)
      : [...form.services, serviceId];

    updateField("services", nextServices);
  };

  const toggleDay = (day: AllowedDay) => {
    if (day === "Flexible") {
      updateField(
        "availabilityDays",
        form.availabilityDays.includes("Flexible") ? [] : ["Flexible"]
      );
      return;
    }

    const withoutFlexible = form.availabilityDays.filter(
      (d) => d !== "Flexible"
    );

    updateField(
      "availabilityDays",
      withoutFlexible.includes(day)
        ? withoutFlexible.filter((d) => d !== day)
        : [...withoutFlexible, day]
    );
  };

  const getInputStyles = (hasError: boolean) =>
    `w-full rounded-xl border bg-[#0b0e0d]/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:bg-[#0b0e0d] focus-visible:ring-2 ${
      hasError
        ? "border-red-400/50 focus:border-red-400/70 focus-visible:ring-red-400/20"
        : "border-white/[0.09] hover:border-white/[0.16] focus:border-[#6fbd68]/60 focus-visible:ring-[#6fbd68]/25"
    }`;

  const labelStyles = "mb-2 block text-sm font-medium text-white/80";

  const cardStyles =
    "rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-8";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") return;

    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      const allTouched: Partial<Record<keyof ContactFormValues, boolean>> = {
        name: true,
        email: true,
        phone: true,
        description: true,
        contactMethod: true,
        availabilityDetails: true,
      };
      setTouched(allTouched);
      setErrors(getFieldErrors(form));
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as {
        message?: string;
        errors?: ContactFieldErrors;
      };

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || "Something went wrong.");
      }

      const selectedLabels = services
        .filter((s) => parsed.data.services.includes(s.id))
        .map((s) => s.label);

      setSubmittedSummary({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        contactMethod: parsed.data.contactMethod,
        services: selectedLabels,
      });

      setStatus("success");
      setForm(initialForm);
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <ScrollReveal>
        <div
          role="status"
          aria-live="polite"
          className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/1.5 p-6 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6fbd68]/[0.07] blur-[80px]" />

          <div className="relative mb-8 flex items-center justify-between border-b border-white/[0.07] pb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7fd178]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68]" />
              Inquiry Sent
            </span>

            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              Confirmation
            </span>
          </div>

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#6fbd68]/30 bg-[#6fbd68]/10 text-[#6fbd68]">
              <Check size={22} strokeWidth={2.5} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Thanks for reaching out
                {submittedSummary?.name
                  ? `, ${submittedSummary.name.split(" ")[0]}`
                  : ""}
                .
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">
                Your inquiry is in my inbox. I'll review your project details
                and follow up via{" "}
                <span className="text-white/85">
                  {submittedSummary?.contactMethod.toLowerCase() || "email"}
                </span>{" "}
                shortly.
              </p>
            </div>
          </div>

          {submittedSummary && (
            <div className="relative mt-8 rounded-xl border border-white/[0.07] bg-[#0b0e0d]/60 p-5 sm:p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Submission Summary
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/3 text-[#6fbd68]">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/40">Reply-to address</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-white/85">
                      {submittedSummary.email}
                    </p>
                  </div>
                </div>

                {submittedSummary.phone ? (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/3 text-[#6fbd68]">
                      <Phone size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/40">Phone number</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-white/85">
                        {submittedSummary.phone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/3 text-[#6fbd68]">
                      <Clock size={15} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Response window</p>
                      <p className="mt-0.5 text-sm font-medium text-white/85">
                        Typically within 1–2 business days
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {submittedSummary.services.length > 0 && (
                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <p className="mb-2.5 text-xs text-white/40">
                    Topics included
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {submittedSummary.services.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3 py-1 text-xs font-medium text-[#8ce085]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#6fbd68] px-5 py-3 text-sm font-semibold text-[#0b0e0d] transition hover:bg-[#82cd79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/70"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to home
            </Link>

            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setSubmittedSummary(null);
              }}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/9 bg-white/2 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/18 hover:bg-white/4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
            >
              Send another inquiry
              <ArrowUpRight
                size={15}
                className="text-white/45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6fbd68]"
              />
            </button>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
      </div>

      {/* 01 — Contact information */}
      <ScrollReveal>
        <section className={cardStyles}>
          <div className="mb-5 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3 py-1 font-(family-name:--font-bricolage) text-xs font-semibold tracking-wider text-[#7fd178]">
              01
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              About you
            </span>
          </div>

          <h2 className="mb-6 font-(family-name:--font-bricolage) text-xl font-semibold text-white">
            Let's start with the basics.
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelStyles}>
                Full name <span className="text-[#6fbd68]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Your name"
                className={getInputStyles(Boolean(errors.name))}
              />
              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle size={13} className="shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelStyles}>
                Email address <span className="text-[#6fbd68]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                className={getInputStyles(Boolean(errors.email))}
              />
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle size={13} className="shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 02 — Services */}
      <ScrollReveal>
        <section className={cardStyles}>
          <div className="mb-5 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3 py-1 font-(family-name:--font-bricolage) text-xs font-semibold tracking-wider text-[#7fd178]">
              02
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              Project type
            </span>
          </div>

          <h2 className="font-(family-name:--font-bricolage) text-xl font-semibold text-white">
            What can I help you with?
          </h2>

          <p className="mb-6 mt-1.5 text-sm leading-6 text-white/50">
            Select as many as apply.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              const selected = form.services.includes(service.id);

              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleService(service.id)}
                  className={`group relative flex items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60 ${
                    selected
                      ? "border-[#6fbd68]/50 bg-[#6fbd68]/8"
                      : "border-white/8 bg-[#0b0e0d]/50 hover:border-white/18 hover:bg-white/3"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      selected
                        ? "border-[#6fbd68]/30 bg-[#6fbd68]/15 text-[#6fbd68]"
                        : "border-white/[0.07] bg-white/3 text-white/50 group-hover:text-white/80"
                    }`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        selected ? "text-white" : "text-white/80"
                      }`}
                    >
                      {service.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/45">
                      {service.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selected
                        ? "border-[#6fbd68] bg-[#6fbd68] text-[#0b0e0d]"
                        : "border-white/20 group-hover:border-white/35"
                    }`}
                  >
                    {selected && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* 03 — Project details */}
      <ScrollReveal>
        <section className={cardStyles}>
          <div className="mb-5 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3 py-1 font-(family-name:--font-bricolage) text-xs font-semibold tracking-wider text-[#7fd178]">
              03
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              Project details
            </span>
          </div>

          <h2 className="mb-6 font-(family-name:--font-bricolage) text-xl font-semibold text-white">
            Tell me a little more.
          </h2>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="description"
                className="text-sm font-medium text-white/80"
              >
                Project description <span className="text-[#6fbd68]">*</span>
              </label>
              <span
                className={`text-xs ${
                  form.description.trim().length >= 10
                    ? "text-[#6fbd68]/80"
                    : "text-white/35"
                }`}
              >
                {form.description.length}/5000
              </span>
            </div>

            <textarea
              id="description"
              name="description"
              maxLength={5000}
              rows={6}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : "description-hint"
              }
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              placeholder="Tell me about your idea, what you're looking to build, or what you need help with..."
              className={`${getInputStyles(Boolean(errors.description))} resize-y leading-7`}
            />

            {errors.description ? (
              <p
                id="description-error"
                role="alert"
                className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
              >
                <AlertCircle size={13} className="shrink-0" />
                {errors.description}
              </p>
            ) : (
              <p id="description-hint" className="mt-2 text-xs text-white/40">
                No need to have everything figured out—just give me a starting
                point.
              </p>
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="timeline" className={labelStyles}>
              Project timeframe
            </label>
            <div className="relative">
              <select
                id="timeline"
                name="timeline"
                value={form.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className={`${getInputStyles(false)} appearance-none pr-10`}
              >
                <option value="" className="bg-[#111815]">
                  Select a timeframe
                </option>
                <option value="As soon as possible" className="bg-[#111815]">
                  As soon as possible
                </option>
                <option value="Within a month" className="bg-[#111815]">
                  Within a month
                </option>
                <option value="1–3 months" className="bg-[#111815]">
                  1–3 months
                </option>
                <option value="3+ months" className="bg-[#111815]">
                  3+ months
                </option>
                <option value="Flexible" className="bg-[#111815]">
                  Flexible
                </option>
                <option value="Just exploring" className="bg-[#111815]">
                  Just exploring
                </option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 04 — Communication */}
      <ScrollReveal>
        <section className={cardStyles}>
          <div className="mb-5 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3 py-1 font-(family-name:--font-bricolage) text-xs font-semibold tracking-wider text-[#7fd178]">
              04
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              Let's connect
            </span>
          </div>

          <h2 className="mb-1.5 font-(family-name:--font-bricolage) text-xl font-semibold text-white">
            When would be a good time to reach you?
          </h2>
          <p className="mb-6 text-sm leading-6 text-white/50">
            These details help me know when and how to get in touch.
          </p>

          <div>
            <label className={labelStyles}>Preferred contact method</label>

            <div className="grid grid-cols-3 gap-2.5">
              {allowedContactMethods.map((method) => {
                const selected = form.contactMethod === method;

                return (
                  <button
                    key={method}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => updateField("contactMethod", method)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60 ${
                      selected
                        ? "border-[#6fbd68]/50 bg-[#6fbd68]/10 text-[#8ce085]"
                        : "border-white/8 bg-[#0b0e0d]/50 text-white/55 hover:border-white/20 hover:text-white/80"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {showPhoneInput && (
            <div className="mt-6">
              <label htmlFor="phone" className={labelStyles}>
                Phone number{" "}
                {form.contactMethod === "Phone" && (
                  <span className="text-[#6fbd68]">*</span>
                )}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                placeholder="(555) 123-4567"
                className={getInputStyles(Boolean(errors.phone))}
              />
              {errors.phone ? (
                <p
                  id="phone-error"
                  role="alert"
                  className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle size={13} className="shrink-0" />
                  {errors.phone}
                </p>
              ) : (
                <p id="phone-hint" className="mt-2 text-xs text-white/40">
                  {form.contactMethod === "Phone"
                    ? "Required so I can give you a call or text."
                    : "Optional, in case calling or texting works better."}
                </p>
              )}
            </div>
          )}

          <div className="mt-6">
            <label className={labelStyles}>Best days to reach you</label>

            <div className="flex flex-wrap gap-2">
              {([...weekdays, "Flexible"] as AllowedDay[]).map((day) => {
                const selected = form.availabilityDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleDay(day)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60 ${
                      selected
                        ? "border-[#6fbd68]/50 bg-[#6fbd68]/10 text-[#8ce085]"
                        : "border-white/8 bg-[#0b0e0d]/50 text-white/50 hover:border-white/20 hover:text-white/75"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="availabilityTime" className={labelStyles}>
              Best time of day
            </label>
            <div className="relative">
              <select
                id="availabilityTime"
                name="availabilityTime"
                value={form.availabilityTime}
                onChange={(e) =>
                  updateField("availabilityTime", e.target.value)
                }
                className={`${getInputStyles(false)} appearance-none pr-10`}
              >
                <option value="" className="bg-[#111815]">
                  Select an option
                </option>
                <option value="Morning" className="bg-[#111815]">
                  Morning
                </option>
                <option value="Afternoon" className="bg-[#111815]">
                  Afternoon
                </option>
                <option value="Evening" className="bg-[#111815]">
                  Evening
                </option>
                <option value="Flexible" className="bg-[#111815]">
                  Flexible
                </option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="availabilityDetails" className={labelStyles}>
              Specific dates or availability
            </label>
            <textarea
              id="availabilityDetails"
              name="availabilityDetails"
              rows={3}
              maxLength={1000}
              aria-invalid={Boolean(errors.availabilityDetails)}
              aria-describedby={
                errors.availabilityDetails
                  ? "availability-details-error"
                  : undefined
              }
              value={form.availabilityDetails}
              onChange={(e) =>
                updateField("availabilityDetails", e.target.value)
              }
              onBlur={() => handleBlur("availabilityDetails")}
              placeholder="For example: I'm generally available after 5 PM, or feel free to reach out any time Tuesday."
              className={`${getInputStyles(Boolean(errors.availabilityDetails))} resize-y leading-6`}
            />
            {errors.availabilityDetails && (
              <p
                id="availability-details-error"
                role="alert"
                className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
              >
                <AlertCircle size={13} className="shrink-0" />
                {errors.availabilityDetails}
              </p>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Submission */}
      <ScrollReveal>
        <div className="pt-2">
          {status === "error" && serverError && (
            <div
              role="alert"
              className="mb-5 flex items-center gap-2 rounded-xl border border-red-400/25 bg-red-400/6 px-4 py-3 text-sm text-red-300"
            >
              <AlertCircle size={16} className="shrink-0" />
              {serverError}
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#6fbd68] px-7 py-4 text-sm font-semibold text-[#0b0e0d] transition hover:bg-[#82cd79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/70 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending your message...
                </>
              ) : (
                <>
                  Send inquiry
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>

            <p className="text-xs leading-5 text-white/40">
              Your information will only be used to respond to your inquiry.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </form>
  );
}