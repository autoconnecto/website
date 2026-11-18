import { MetadataRoute } from 'next';
import { listSolutionSlugs } from '@/content/solutions';
import { listUseCases } from '@/content/useCases';
import { siteOrigin } from '@/lib/siteOrigin';

export const dynamic = 'force-static'; // ✅ REQUIRED for static export

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteOrigin();
  // lastmod = build time (static export). Fragments like /#features are not entries.
  const now = new Date();
  const withSlash = (path: string) => {
    if (path === '/') return `${base}/`;
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${base}${p.endsWith('/') ? p : `${p}/`}`;
  };

  return [
    { url: withSlash('/'), lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: withSlash('/product'), lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: withSlash('/compatible-hardware'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: withSlash('/solutions'), lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    ...listSolutionSlugs().map((slug) => ({
      url: withSlash(`/solutions/${slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    { url: withSlash('/use-cases'), lastModified: now, changeFrequency: 'weekly', priority: 0.92 },
    ...listUseCases().map((u) => ({
      url: withSlash(u.path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    })),
    { url: withSlash('/esp32-wifi-strongest-ap'), lastModified: now, changeFrequency: 'weekly', priority: 0.88 },
    { url: withSlash('/pricing'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: withSlash('/support'), lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: withSlash('/export-your-data'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: withSlash('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: withSlash('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}