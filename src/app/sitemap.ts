import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// Single-page site: search engines ignore #fragment URLs, so only the page
// itself is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
