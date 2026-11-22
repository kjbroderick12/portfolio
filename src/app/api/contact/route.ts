import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  contactSchema,
  serviceLabels,
  getFieldErrors,
} from "@/features/contact/schemas/contactSchema";

interface TurnstileVerification {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatList(items: string[]): string {
  if (items.length === 0) return "Not specified";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function section(
  title: string,
  content: string,
  isHtml = false
): string {
  return `
    <div style="padding: 20px 0; border-bottom: 1px solid #e8ece8;">
      <p style="
        margin: 0 0 10px;
        color: #528d4b;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.2px;
        text-transform: uppercase;
      ">
        ${title}
      </p>

      <div style="
        margin: 0;
        color: #202820;
        font-size: 15px;
        line-height: 1.75;
        overflow-wrap: break-word;
      ">
        ${isHtml ? content : escapeHtml(content)}
      </div>
    </div>
  `;
}

async function verifyTurnstileToken(
  token: string,
  secret: string
): Promise<boolean> {
  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Turnstile verification service returned an error.");
  }

  const result =
    (await response.json()) as TurnstileVerification;

  const allowedHostnames =
    process.env.NODE_ENV === "production"
      ? ["kaitlynnbroderick.dev"]
      : ["kaitlynnbroderick.dev", "localhost", "127.0.0.1"];

  return (
    result.success === true &&
    result.action === "contact" &&
    typeof result.hostname === "string" &&
    allowedHostnames.includes(result.hostname)
  );
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request. Please try again." },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { message: "Invalid request. Please try again." },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;

    // Honeypot protection
    if (
      typeof payload.website === "string" &&
      payload.website.trim().length > 0
    ) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully.",
      });
    }

    // Extract the Turnstile token before validating form fields
    const turnstileToken = payload.turnstileToken;
    const formPayload = { ...payload };
    delete formPayload.turnstileToken;

    if (
      typeof turnstileToken !== "string" ||
      turnstileToken.length === 0 ||
      turnstileToken.length > 2048
    ) {
      return NextResponse.json(
        {
          message:
            "Security verification is missing or invalid. Please try again.",
        },
        { status: 400 }
      );
    }

    // Validate the submitted form fields
    const parsed = contactSchema.safeParse(formPayload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please review the highlighted fields and try again.",
          errors: getFieldErrors(formPayload),
        },
        { status: 400 }
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!turnstileSecret || !apiKey || !fromEmail || !contactEmail) {
      console.error("Contact API configuration is incomplete.");

      return NextResponse.json(
        {
          message:
            "Unable to send your message right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Verify the token with Cloudflare
    let isVerified = false;

    try {
      isVerified = await verifyTurnstileToken(
        turnstileToken,
        turnstileSecret
      );
    } catch (error) {
      console.error("Turnstile verification error:", error);

      return NextResponse.json(
        {
          message:
            "The security check is temporarily unavailable. Please try again.",
        },
        { status: 503 }
      );
    }

    if (!isVerified) {
      return NextResponse.json(
        {
          message:
            "Security verification failed. Please complete the check again.",
        },
        { status: 403 }
      );
    }

    const {
      name,
      email,
      phone,
      services,
      description,
      contactMethod,
      availabilityDays,
      availabilityTime,
      timeline,
      availabilityDetails,
    } = parsed.data;

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeDescription = escapeHtml(description).replace(/\n/g, "<br />");

    const selectedServices = services.map(
      (service) => serviceLabels[service]
    );

    const safeServices = selectedServices.length
      ? selectedServices.map(escapeHtml).join("<br />")
      : "Not specified";

    const safeDays = availabilityDays.length
      ? availabilityDays.map(escapeHtml).join(", ")
      : "Not specified";

    const safeContactMethod = escapeHtml(contactMethod);
    const safeAvailabilityTime = escapeHtml(
      availabilityTime || "Not specified"
    );
    const safeTimeline = escapeHtml(timeline || "Not specified");
    const safeAvailabilityDetails = escapeHtml(
      availabilityDetails
    ).replace(/\n/g, "<br />");

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f4;
          font-family: Arial, Helvetica, sans-serif;
          color: #202820;
        ">
          <div style="
            width: 100%;
            background-color: #f4f6f4;
            padding: 20px 0;
          ">
            <div style="
              max-width: 600px;
              margin: 0 auto;
              padding: 0 20px;
            ">
              <div style="
                padding: 12px 0 22px;
                border-bottom: 2px solid #6fbd68;
              ">
                <p style="
                  margin: 0;
                  font-size: 12px;
                  font-weight: 700;
                  letter-spacing: 1.5px;
                  color: #528d4b;
                  text-transform: uppercase;
                ">
                  Portfolio Contact
                </p>

                <h1 style="
                  margin: 10px 0 0;
                  font-size: 23px;
                  line-height: 1.35;
                  color: #172019;
                  font-weight: 700;
                ">
                  New Project Inquiry
                </h1>
              </div>

              <div style="padding: 24px 0 10px;">
                <p style="
                  margin: 0 0 6px;
                  font-size: 17px;
                  font-weight: 600;
                  color: #202820;
                ">
                  ${safeName} reached out.
                </p>

                <p style="
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.7;
                  color: #697369;
                ">
                  You have a new message through your portfolio contact form.
                </p>
              </div>

              ${section(
                "Contact Information",
                `<a href="mailto:${safeEmail}" style="
                  color: #528d4b;
                  text-decoration: none;
                  font-weight: 600;
                ">${safeEmail}</a>`,
                true
              )}

              ${phone ? section("Phone Number", safePhone) : ""}

              ${section("Services Requested", safeServices, true)}

              ${section("Project Details", safeDescription, true)}

              ${section("Project Timeline", safeTimeline)}

              ${section("Preferred Contact Method", safeContactMethod)}

              ${section("Best Days to Connect", safeDays)}

              ${section("Preferred Time", safeAvailabilityTime)}

              ${
                availabilityDetails
                  ? section(
                      "Additional Availability",
                      safeAvailabilityDetails,
                      true
                    )
                  : ""
              }

              <div style="padding: 22px 0 10px;">
                <p style="
                  margin: 0;
                  font-size: 12px;
                  line-height: 1.7;
                  color: #8a938a;
                ">
                  This message was submitted through your portfolio website.
                  You can reply directly to this email to contact ${safeName}.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
NEW PROJECT INQUIRY
====================

CONTACT INFORMATION
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

SERVICES REQUESTED
${formatList(selectedServices)}

PROJECT DETAILS
${description}

PROJECT TIMELINE
${timeline || "Not specified"}

PREFERRED CONTACT METHOD
${contactMethod}

BEST DAYS TO CONNECT
${formatList(availabilityDays)}

PREFERRED TIME
${availabilityTime || "Not specified"}

ADDITIONAL AVAILABILITY
${availabilityDetails || "Not specified"}

--------------------
Submitted through your portfolio contact form.
Reply directly to this email to contact ${name}.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio Inquiry from ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          message:
            "Unable to send your message right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
