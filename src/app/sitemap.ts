import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = [
    { url: base, priority: 1 },
    { url: `${base}/historia`, priority: 0.9 },
    { url: `${base}/shopping-jar-2026`, priority: 1.0 },
    { url: `${base}/shopping-jar`, priority: 0.8 },
    { url: `${base}/projeto-bem-viver`, priority: 0.8 },
    { url: `${base}/curso-de-tratadores`, priority: 0.9 },
    { url: `${base}/quem-somos`, priority: 0.7 },
    { url: `${base}/nossa-historia`, priority: 0.8 },
    { url: `${base}/pacotes`, priority: 0.7 },
    { url: `${base}/programas`, priority: 0.7 },
    { url: `${base}/haras`, priority: 0.7 },
    { url: `${base}/login`, priority: 0.5 },
  ];
  return pages.map((p) => ({
    url: p.url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
