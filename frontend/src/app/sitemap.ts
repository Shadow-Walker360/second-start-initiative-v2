import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.secondstartinitiative.org";

const ROUTES = [
  "",
  "/about",
  "/founders-story",
  "/programs",
  "/testimonials",
  "/volunteer",
  "/get-involved",
  "/donate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
