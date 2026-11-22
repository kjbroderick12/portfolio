import { z } from "zod";

export const serviceLabels = {
  website: "Website Development",
  software: "Custom Software",
  automation: "Automation & Integrations",
  improvements: "Updates & Improvements",
  support: "Development Support",
  other: "Something Else",
} as const;

export type ServiceKey = keyof typeof serviceLabels;

export const serviceKeys = Object.keys(serviceLabels) as [
  ServiceKey,
  ...ServiceKey[],
];

export const allowedContactMethods = ["Email", "Phone", "Either"] as const;
export type ContactMethod = (typeof allowedContactMethods)[number];

export const allowedDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Flexible",
] as const;
export type AllowedDay = (typeof allowedDays)[number];

export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Please enter your name.")
      .max(100, "Name must be 100 characters or fewer."),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address.")
      .email("Please enter a valid email address.")
      .max(254, "Email must be 254 characters or fewer."),
    phone: z
      .string()
      .trim()
      .max(30, "Phone number must be 30 characters or fewer.")
      .optional()
      .default(""),
    services: z.array(z.enum(serviceKeys)).default([]),
    description: z
      .string()
      .trim()
      .min(10, "Please share at least 10 characters about your project.")
      .max(5000, "Description must be 5,000 characters or fewer."),
    contactMethod: z.enum(allowedContactMethods).default("Email"),
    availabilityDays: z.array(z.enum(allowedDays)).default([]),
    availabilityTime: z.string().trim().max(50).optional().default(""),
    timeline: z.string().trim().max(100).optional().default(""),
    availabilityDetails: z
      .string()
      .trim()
      .max(1000, "Availability details must be 1,000 characters or fewer.")
      .optional()
      .default(""),
    website: z.string().max(200).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "Phone" && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Phone number is required when Phone is selected.",
      });
    }

    if (data.phone) {
      const digitsOnly = data.phone.replace(/\D/g, "");
      if (
        digitsOnly.length < 7 ||
        digitsOnly.length > 15 ||
        !/^[+\d\s().-]+$/.test(data.phone)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Please enter a valid phone number.",
        });
      }
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export function getFieldErrors(formData: unknown): ContactFieldErrors {
  const result = contactSchema.safeParse(formData);
  if (result.success) return {};

  const errors: ContactFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactFormValues | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}