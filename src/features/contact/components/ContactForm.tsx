"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
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

import {
  allowedContactMethods,
  contactSchema,
  getFieldErrors,
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

const steps = [
  { label: "Your information", shortLabel: "About you" },
  { label: "Project type", shortLabel: "What you need" },
  { label: "Project details", shortLabel: "The details" },
  { label: "Contact preferences", shortLabel: "Let's connect" },
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
  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submittedSummary, setSubmittedSummary] =
    useState<SubmittedSummary | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;



  const showPhoneInput =
    form.contactMethod === "Phone" || form.contactMethod === "Either";

  const stepFields: Record<number, (keyof ContactFormValues)[]> = {
    0: ["name", "email"],
    1: ["services"],
    2: ["description"],
    3: ["contactMethod", "phone", "availabilityDetails"],
  };

  const getInputStyles = (hasError: boolean) =>
    `w-full rounded-xl border bg-[#080d12]/80 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:bg-[#080d12] focus-visible:ring-2 ${
      hasError
        ? "border-red-400/50 focus:border-red-400/70 focus-visible:ring-red-400/20"
        : "border-white/[0.09] hover:border-white/[0.16] focus:border-[#6fbd68]/60 focus-visible:ring-[#6fbd68]/25"
    }`;

  const labelStyles = "mb-2 block text-sm font-medium text-white/80";

  const updateField = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    if (touched[field] || field === "contactMethod") {
      const allErrors = getFieldErrors(nextForm);
      setErrors((previous) => ({
        ...previous,
        [field]: allErrors[field],
      }));
    }
  };

  const handleBlur = (field: keyof ContactFormValues) => {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);

    const allErrors = getFieldErrors(form);
    setErrors((previous) => ({
      ...previous,
      [field]: allErrors[field],
    }));
  };

  const toggleService = (serviceId: ServiceKey) => {
    const nextServices = form.services.includes(serviceId)
      ? form.services.filter((item) => item !== serviceId)
      : [...form.services, serviceId];

    updateField("services", nextServices);
  };

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const validateCurrentStep = () => {
    const allErrors = getFieldErrors(form);
    const fields = stepFields[currentStep];
    const stepErrors: ContactFieldErrors = {};
    const nextTouched = { ...touched };

    fields.forEach((field) => {
      nextTouched[field] = true;

      if (allErrors[field]) {
        stepErrors[field] = allErrors[field];
      }
    });

    setTouched(nextTouched);
    setErrors((previous) => {
      const next = { ...previous };

      fields.forEach((field) => {
        delete next[field];
      });

      return { ...next, ...stepErrors };
    });

    return Object.keys(stepErrors).length === 0;
  };

  const goBack = () => {
    if (currentStep === 0) return;

    if (currentStep === 3) {
      resetTurnstile();
      setServerError("");
      setStatus("idle");
    }

    setCurrentStep((step) => Math.max(0, step - 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") return;

    if (currentStep < steps.length - 1) {
      if (validateCurrentStep()) {
        setCurrentStep((step) => step + 1);
        setServerError("");
      }

      return;
    }

    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      const allErrors = getFieldErrors(form);

      setErrors(allErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        services: true,
        description: true,
        contactMethod: true,
        availabilityDetails: true,
      });

      if (allErrors.name || allErrors.email) {
        setCurrentStep(0);
      } else if (allErrors.services) {
        setCurrentStep(1);
      } else if (allErrors.description) {
        setCurrentStep(2);
      }

      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setServerError(
        "Please complete the security check before sending your inquiry."
      );
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
        body: JSON.stringify({
          ...parsed.data,
          turnstileToken,
        }),
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
        .filter((service) => parsed.data.services.includes(service.id))
        .map((service) => service.label);

      setSubmittedSummary({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        contactMethod: parsed.data.contactMethod,
        services: selectedLabels,
      });

      setStatus("success");
      setForm(initialForm);
      setCurrentStep(0);
      setTouched({});
      setErrors({});
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
      resetTurnstile();
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-6 sm:p-10"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6fbd68]/[0.07] blur-[80px]" />

        <div className="relative mb-8 flex items-center justify-between border-b border-white/[0.07] pb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7fd178]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68]" />
            Inquiry sent
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
              Your inquiry is in my inbox. I'll review your project details and
              follow up via{" "}
              <span className="text-white/85">
                {submittedSummary?.contactMethod.toLowerCase() || "email"}
              </span>{" "}
              shortly.
            </p>
          </div>
        </div>

        {submittedSummary && (
          <div className="relative mt-8 rounded-xl border border-white/[0.07] bg-[#080d12]/70 p-5 sm:p-6">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Submission summary
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
            className="group inline-flex items-center gap-2 rounded-xl bg-[#6fbd68] px-5 py-3 text-sm font-semibold text-[#080d12] transition hover:bg-[#82cd79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/70"
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
              setForm(initialForm);
              setCurrentStep(0);
              resetTurnstile();
            }}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/9 bg-white/2 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/20 hover:bg-white/4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
          >
            Send another inquiry
            <ArrowUpRight
              size={15}
              className="text-white/45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6fbd68]"
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative grid min-w-0 overflow-hidden rounded-2xl border border-white/8 bg-white/2 lg:grid-cols-[250px_minmax(0,1fr)]"
    >
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

      {/* Progress panel */}
      <aside className="border-b border-white/8 bg-[#0b1315]/80 px-4 py-3 sm:px-7 sm:py-4 lg:border-b-0 lg:border-r lg:px-7 lg:py-8">
        {/* Compact progress indicator for mobile */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#6fbd68]">
              Get in touch
            </p>
            <p className="text-xs tabular-nums text-white/45">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <div
            className="mt-2 h-1 overflow-hidden rounded-full bg-white/8"
            role="progressbar"
            aria-label="Contact form progress"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={currentStep + 1}
          >
            <div
              className="h-full rounded-full bg-[#6fbd68] transition-[width] duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Full progress panel for desktop */}
        <div className="hidden lg:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
            Get in touch
          </p>

          <h2 className="mt-3 font-(family-name:--font-bricolage) text-[1.65rem] font-semibold tracking-tight text-white">
            Let's build something together.
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/45">
            A few details will help me understand what you're looking for.
          </p>

          <div className="mt-10 grid gap-3">
            {steps.map((step, index) => {
              const isCurrent = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <div
                  key={step.shortLabel}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
                    isCurrent ? "bg-[#6fbd68]/9" : "bg-transparent"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors ${
                      isComplete
                        ? "border-[#6fbd68] bg-[#6fbd68] text-[#080d12]"
                        : isCurrent
                          ? "border-[#6fbd68]/60 text-[#8ce085]"
                          : "border-white/12 text-white/35"
                    }`}
                  >
                    {isComplete ? <Check size={13} strokeWidth={2.5} /> : `0${index + 1}`}
                  </span>

                  <span
                    className={`min-w-0 text-sm font-medium ${
                      isCurrent
                        ? "text-white"
                        : isComplete
                          ? "text-white/65"
                          : "text-white/35"
                    }`}
                  >
                    {step.label}
                  </span>

                  {isCurrent && (
                    <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#6fbd68]" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-white/8 pt-5">
            <p className="text-xs leading-6 text-white/35">
              Your information is only used to respond to your inquiry.
            </p>
          </div>
        </div>
      </aside>

      {/* Form content */}
      <div className="flex min-w-0 flex-col p-4 sm:p-8 lg:p-9">
      {/* Step content */}
      <div
        key={currentStep}
        className="min-h-136 min-w-0 sm:min-h-160 lg:min-h-152"
      >
        {currentStep === 0 && (
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6fbd68]">
              About you
            </p>

            <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Let's start with the basics.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
              First, I'd like to know who I'm speaking with and where I can
              reach you.
            </p>

            <div className="mt-8 grid gap-5">
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
                  <FieldError id="name-error">{errors.name}</FieldError>
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
                  <FieldError id="email-error">{errors.email}</FieldError>
                )}
              </div>
            </div>
          </section>
        )}

        {currentStep === 1 && (
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6fbd68]">
              Project type
            </p>

            <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What can I help you with?
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Choose any that apply. You can select more than one.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3">
              {services.map((service) => {
                const Icon = service.icon;
                const selected = form.services.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service.id)}
                    className={`group relative grid min-h-28 grid-cols-[32px_minmax(0,1fr)] grid-rows-[auto_1fr] gap-x-2 gap-y-2 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60 sm:flex sm:min-h-26 sm:items-start sm:gap-3 sm:p-4 ${
                      selected
                        ? "border-[#6fbd68]/45 bg-[#6fbd68]/[0.07]"
                        : "border-white/8 bg-white/1.5 hover:border-white/16 hover:bg-white/3"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors sm:mt-0.5 sm:h-9 sm:w-9 ${
                        selected
                          ? "border-[#6fbd68]/30 bg-[#6fbd68]/15 text-[#6fbd68]"
                          : "border-white/[0.07] bg-white/3 text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      <Icon size={16} className="sm:h-4.25 sm:w-4.25" />
                    </div>

                    <div className="col-span-2 min-w-0 sm:flex-1">
                      <p
                        className={`text-xs font-medium leading-5 sm:text-sm ${
                          selected ? "text-white" : "text-white/80"
                        }`}
                      >
                        {service.label}
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-white/45 sm:text-xs sm:leading-5">
                        {service.description}
                      </p>
                    </div>

                    <div
                      className={`absolute right-3 top-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors sm:static ${
                        selected
                          ? "border-[#6fbd68] bg-[#6fbd68] text-[#080d12]"
                          : "border-white/20 group-hover:border-white/35"
                      }`}
                    >
                      {selected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {errors.services && (
              <FieldError id="services-error">{errors.services}</FieldError>
            )}

            <p className="mt-4 text-xs text-white/35">
              Not sure which category fits? That's okay. Choose "Something
              Else" and tell me more in the next step.
            </p>
          </section>
        )}

        {currentStep === 2 && (
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6fbd68]">
              Project details
            </p>

            <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Tell me a little more.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
              You don't need a fully formed plan. A general idea of what you're
              looking for is a great place to start.
            </p>

            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-white/80"
                >
                  Project description{" "}
                  <span className="text-[#6fbd68]">*</span>
                </label>

                <span
                  className={`shrink-0 text-xs ${
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
                rows={5}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? "description-error"
                    : "description-hint"
                }
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                onBlur={() => handleBlur("description")}
                placeholder="Tell me about your idea, what you're looking to build, or what you need help with..."
                className={`${getInputStyles(Boolean(errors.description))} min-h-35 resize-y leading-7 sm:min-h-49`}
              />

              {errors.description ? (
                <FieldError id="description-error">
                  {errors.description}
                </FieldError>
              ) : (
                <p
                  id="description-hint"
                  className="mt-2 text-xs leading-5 text-white/40"
                >
                  No need to have everything figured out—just give me a
                  starting point.
                </p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="timeline" className={labelStyles}>
                Project timeframe{" "}
                <span className="ml-1 text-xs font-normal text-white/35">
                  Optional
                </span>
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
        )}

        {currentStep === 3 && (
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6fbd68]">
              Staying in touch
            </p>

            <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              How should I reach you?
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
              Email is perfectly fine, but you can choose whichever works best.
            </p>

            <div className="mt-7">
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
                          : "border-white/8 bg-white/1.5 text-white/55 hover:border-white/20 hover:text-white/80"
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
                  {form.contactMethod === "Either" && (
                    <span className="ml-1 text-xs font-normal text-white/35">
                      Optional
                    </span>
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
                  <FieldError id="phone-error">{errors.phone}</FieldError>
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
              <label htmlFor="availabilityDetails" className={labelStyles}>
                Anything I should know about when to reach you?
                <span className="ml-2 text-xs font-normal text-white/35">
                  Optional
                </span>
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
                    : "availability-details-hint"
                }
                value={form.availabilityDetails}
                onChange={(e) =>
                  updateField("availabilityDetails", e.target.value)
                }
                onBlur={() => handleBlur("availabilityDetails")}
                placeholder="For example: I'm generally available after 5 PM, or feel free to reach out any time."
                className={`${getInputStyles(Boolean(errors.availabilityDetails))} resize-y leading-6`}
              />

              {errors.availabilityDetails ? (
                <FieldError id="availability-details-error">
                  {errors.availabilityDetails}
                </FieldError>
              ) : (
                <p
                  id="availability-details-hint"
                  className="mt-2 text-xs text-white/40"
                >
                  Feel free to leave this blank if you don't have a preference.
                </p>
              )}
            </div>

            {/* Security verification */}
            <div className="mt-8 border-t border-white/[0.07] pt-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                  Security verification
                </span>
                <span className="h-px flex-1 bg-white/6" />
              </div>

              <div className="min-h-16.25">
                {siteKey ? (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={siteKey}
                    options={{
                      theme: "dark",
                      size: "flexible",
                      action: "contact",
                    }}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setServerError("");
                      if (status === "error") setStatus("idle");
                    }}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => {
                      setTurnstileToken("");
                      setServerError(
                        "The security check couldn't load. Please refresh the page and try again."
                      );
                      setStatus("error");
                    }}
                  />
                ) : (
                  <p className="text-sm text-red-300">
                    The security check is temporarily unavailable. Please try
                    again later.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Server error */}
      {status === "error" && serverError && (
        <div
          role="alert"
          className="mt-6 flex items-center gap-2 rounded-xl border border-red-400/25 bg-red-400/6 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle size={16} className="shrink-0" />
          {serverError}
        </div>
      )}

      {/* Form navigation */}
      <div className="sticky bottom-0 z-20 -mx-4 mt-4 flex items-center justify-between gap-3 border-t border-white/8 bg-[#0b1315]/97 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-[0_-12px_28px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:static sm:mx-0 sm:mt-8 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-6 sm:shadow-none sm:backdrop-blur-none">
        <div className="min-w-0">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={status === "loading"}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/9 bg-white/2 px-3.5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60 disabled:opacity-50 sm:px-5"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <p className="hidden text-xs leading-5 text-white/35 sm:block">
              Required fields are marked with an asterisk.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading" || (currentStep === 3 && !siteKey)}
          className="group inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#6fbd68] px-4 py-3 text-sm font-semibold text-[#080d12] transition hover:bg-[#82cd79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/70 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-36 sm:flex-none sm:px-7"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Sending your inquiry...
            </>
          ) : currentStep === steps.length - 1 ? (
            <>
              Send inquiry
              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </>
          ) : (
            <>
              Continue
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </div>
      </div>
    </form>
  );
}

function FieldError({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
    >
      <AlertCircle size={13} className="shrink-0" />
      {children}
    </p>
  );
}
