
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedServices = [
  "Website Development",
  "Custom Software & Applications",
  "Automation & Integrations",
  "Updates & Improvements",
  "Development Support",
  "Something Else / Not Sure",
];

const allowedDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Flexible",
];

const allowedTimes = [
  "Morning",
  "Afternoon",
  "Evening",
  "Flexible",
];

const allowedContactMethods = ["Email", "Phone", "Either"];

function cleanString(value: unknown, maxLength = 5000): string {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot protection
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const name = cleanString(body.name, 100);
    const email = cleanString(body.email, 254).toLowerCase();
    const description = cleanString(body.description, 5000);
    const timeline = cleanString(body.timeline, 300);
    const contactMethod = cleanString(body.contactMethod, 30);
    const availability = cleanString(body.availability, 1000);
    const availabilityDays = Array.isArray(body.availabilityDays)
      ? body.availabilityDays
      : [];
    const availabilityTime = cleanString(body.availabilityTime, 50);

    const services = Array.isArray(body.services)
      ? body.services.filter(
          (service: unknown): service is string =>
              typeof service === "string" &&
              allowedServices.includes(service)
        )
      : [];

    const days = availabilityDays.filter(
      (day: unknown): day is string =>
        typeof day === "string" && allowedDays.includes(day)
    );

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!description || description.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a little more detail about your project.",
        },
        { status: 400 }
      );
    }

    if (
      contactMethod &&
      !allowedContactMethods.includes(contactMethod)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid contact method." },
        { status: 400 }
      );
    }

    if (
      availabilityTime &&
      !allowedTimes.includes(availabilityTime)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid availability time." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeDescription = escapeHtml(description).replace(/\n/g, "<br />");
    const safeTimeline = escapeHtml(timeline);
    const safeServices = services.length
      ? services.map(escapeHtml).join("<br />")
      : "Not specified";
    const safeDays = days.length
      ? days.map(escapeHtml).join(", ")
      : "Not specified";
    const safeContactMethod = escapeHtml(contactMethod || "Not specified");
    const safeAvailabilityTime = escapeHtml(
      availabilityTime || "Not specified"
    );
    const safeAvailability = escapeHtml(availability).replace(/\n/g, "<br />");

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
              <!-- Header -->
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

              <!-- Introduction -->
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

              <!-- Contact -->
              ${section(
                "Contact Information",
                `<a href="mailto:${safeEmail}" style="
                  color: #528d4b;
                  text-decoration: none;
                  font-weight: 600;
                ">${safeEmail}</a>`,
                true
              )}

              <!-- Services -->
              ${section("Services Requested", safeServices, true)}

              <!-- Project Details -->
              ${section("Project Details", safeDescription, true)}

              ${
                timeline
                  ? section("Project Timeline", safeTimeline)
                  : ""
              }

              <!-- Contact Preferences -->
              ${section(
                "Preferred Contact Method",
                safeContactMethod
              )}

              ${section(
                "Best Days to Connect",
                safeDays
              )}

              ${section(
                "Preferred Time",
                safeAvailabilityTime
              )}

              ${
                availability
                  ? section("Additional Availability", safeAvailability, true)
                  : ""
              }

              <!-- Footer -->
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

SERVICES REQUESTED
${services.length ? services.join(", ") : "Not specified"}

PROJECT DETAILS
${description}

PROJECT TIMELINE
${timeline || "Not specified"}

PREFERRED CONTACT METHOD
${contactMethod || "Not specified"}

BEST DAYS TO CONNECT
${days.length ? days.join(", ") : "Not specified"}

PREFERRED TIME
${availabilityTime || "Not specified"}

ADDITIONAL AVAILABILITY
${availability || "Not specified"}

--------------------
Submitted through your portfolio contact form.
Reply directly to this email to contact ${name}.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Portfolio Inquiry from ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to send your message right now. Please try again later.",
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
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
