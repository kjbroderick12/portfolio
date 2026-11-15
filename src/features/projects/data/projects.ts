import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    slug: "teffies-smoky-bbq",
    number: "01",
    category: "Client Project",
    type: "Web Application",
    name: "Teffie's Smoky BBQ",
    description:
      "A full-stack website built to give a local barbecue business a stronger online presence and an easier way to manage its content.",
    overview:
      "I worked directly with the business owner to design and build a website that brings the restaurant's menu, specials, events, and gallery together in one place. The application also includes a custom admin dashboard so the owner can manage website content without needing to edit code.",
    challenge:
      "I built the application from the ground up while learning several parts of the stack along the way. Implementing custom authentication and integrating third-party services were some of the biggest challenges.",
    solution:
      "I developed a full-stack Next.js application with MongoDB and a custom authentication system. The admin dashboard supports content management for menu items, specials, events, and gallery media. I also integrated services for error monitoring, email delivery, and media storage.",
    highlights: [
      "Custom authentication with protected admin routes and password reset tokens",
      "Admin dashboard with CRUD functionality for website content",
      "Cloudinary integration for gallery image and video storage",
      "Resend integration for contact and catering form emails",
      "Sentry integration for application error monitoring",
      "Deployment and environment configuration through Vercel",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "Tailwind CSS",
      "Sentry",
      "Resend",
      "Cloudinary",
    ],
    image: "/images/projects/teffiessmokybbq.png",
    imageAlt: "Teffie's Smoky BBQ website",
    externalUrl: "https://teffiessmokybbq.com/",
    externalLabel: "Visit Live Site",
    externalType: "live",
  },
  {
    slug: "pointsync",
    number: "02",
    category: "Internship Project",
    type: "Automation Tool",
    name: "PointSync",
    description:
      "An automation tool designed to reduce manual work-item tracking by connecting directly with the Azure DevOps REST API.",
    overview:
      "PointSync was created to improve an existing manual process at Web Surfing Studios. Instead of reviewing completed Azure DevOps tickets and entering their information individually, the application retrieves completed work items and records their details automatically.",
    challenge:
      "One of the biggest challenges was working directly with the Azure DevOps REST API and understanding how to interpret its JSON responses. I also had to account for differences between UTC timestamps and the program's Pacific Time reporting schedule.",
    solution:
      "I built the application using ASP.NET Core MVC and Entity Framework Core. It uses WIQL queries to find qualifying work items, retrieves their details through the REST API, and maps the returned data into application records. A background service handles scheduled synchronization.",
    highlights: [
      "Direct integration with the Azure DevOps REST API using HttpClient",
      "WIQL queries to filter completed work items by user and project",
      "JSON parsing and mapping into application data models",
      "Duplicate prevention during synchronization",
      "Scheduled background synchronization at 3:00 AM Pacific",
      "Manual work-item management through an ASP.NET Core MVC dashboard",
    ],
    technologies: [
      "C#",
      ".NET 8",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "MySQL",
      "Azure DevOps REST API",
    ],
    image: "/images/projects/pointsync.png",
    imageAlt: "PointSync application dashboard",
    externalUrl: "https://github.com/kjbroderick12/PointSyncPOC",
    externalLabel: "View on GitHub",
    externalType: "github",
  },
];