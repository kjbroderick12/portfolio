
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    slug: "pointsync",
    number: "01",
    category: "Internship Project",
    type: "Automation Tool",
    name: "PointSync",
    description:
      "A .NET 8 application that automates monthly work-item point tracking by retrieving completed Azure DevOps work items through the REST API.",
    overview:
      "PointSync is a proof of concept I developed for Web Surfing Studios to improve its monthly points-tracking process, which involves more than 50 users. Previously, completed Azure DevOps work items had to be reviewed individually and their associated information entered manually. PointSync connects to Azure DevOps, retrieves qualifying work items, and records their details in a centralized dashboard.",
    challenge:
      "The main challenge was translating an existing manual workflow into a reliable integration with the Azure DevOps REST API. I needed to identify the correct work items using each user's email address and qualifying completion statuses, interpret the returned JSON data, prevent duplicate records, and account for Pacific Time when determining reporting periods. The application also needed a way to handle work items that were not retrieved automatically.",
    solution:
      "I built PointSync with C#, .NET 8, ASP.NET Core MVC, and Entity Framework Core. The application uses WIQL queries to identify qualifying work items, then makes REST API requests to retrieve their details. The returned data is mapped into application records and stored in a MySQL database. A hosted background service uses scheduled synchronization to keep records up to date, while the dashboard provides a manual entry option for work items that need to be added separately.",
    highlights: [
      "Azure DevOps REST API integration using HttpClient",
      "WIQL queries to identify qualifying work items by assigned user, project, and completion status",
      "JSON response handling and mapping into application data models",
      "Duplicate prevention when importing work items",
      "Scheduled background synchronization using PeriodicTimer",
      "Pacific Time handling for synchronization and monthly reporting boundaries",
      "Manual work-item creation and deletion through an ASP.NET Core MVC dashboard",
      "Entity Framework Core Code First data access with MySQL",
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
    imageAlt: "PointSync dashboard showing tracked work items and point totals",
    externalUrl: "https://github.com/kjbroderick12/PointSyncPOC",
    externalLabel: "View on GitHub",
    externalType: "github",
  },
  {
    slug: "teffies-smoky-bbq",
    number: "02",
    category: "Client Project",
    type: "Web Application",
    name: "Teffie's Smoky BBQ",
    description:
      "A full-stack restaurant website with a custom content-management dashboard, built to strengthen a local barbecue business's online presence.",
    overview:
      "I worked directly with the business owner to design and build a website that brings the restaurant's menu, specials, events, and gallery together in one place. Alongside the public-facing website, I developed a custom admin dashboard that allows the owner to manage content without editing application code.",
    challenge:
      "The project required more than building a public-facing website. I needed to create an experience that made the restaurant's information easy for customers to find while also giving the owner a practical way to maintain that information. This meant developing both the customer-facing pages and the protected administrative functionality, along with integrating several third-party services.",
    solution:
      "I developed a full-stack application using Next.js, TypeScript, React, and MongoDB. The administrative area uses custom authentication with protected routes and password reset functionality. I implemented content-management features for menu items, specials, events, and gallery media, and integrated Cloudinary for media storage, Resend for email delivery, and Sentry for application error monitoring. The application is deployed through Vercel.",
    highlights: [
      "Custom authentication with protected admin routes and password reset tokens",
      "Admin dashboard with create, read, update, and delete functionality for website content",
      "Content management for menu items, specials, events, and gallery media",
      "Cloudinary integration for image and video storage",
      "Resend integration for contact and catering form email delivery",
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
    imageAlt: "Teffie's Smoky BBQ restaurant website homepage",
    externalUrl: "https://teffiessmokybbq.com/",
    externalLabel: "Visit Live Site",
    externalType: "live",
  },
];
