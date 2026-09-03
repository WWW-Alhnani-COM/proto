import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alhanani.onrender.com/',
      lastModified: new Date('2026-09-02'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
