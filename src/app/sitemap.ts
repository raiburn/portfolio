import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    ...caseStudies.map((c) => ({ url: `${siteUrl}/projects/${c.slug}`, lastModified: new Date() })),
  ];
}
