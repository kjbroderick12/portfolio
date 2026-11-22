import type { MetadataRoute } from "next";
import { projects } from "@/features/projects/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kaitlynnbroderick.dev";

  const routes = [
    "",
    "/projects",
    "/about",
    "/services",
    "/contact",
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}