import { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/siteOrigin';

export const dynamic = 'force-static'; // ✅ REQUIRED for static export

export default function robots(): MetadataRoute.Robots {
  const base = siteOrigin();

  const allowAll = { allow: '/' as const, disallow: ['/api/', '/_next/', '/admin/'] as string[] };
  const aiAgents = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'Google-Extended',
    'anthropic-ai',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Applebot-Extended',
    'cohere-ai',
    'Bytespider',
    'CCBot',
  ];

  return {
    rules: [
      { userAgent: '*', ...allowAll },
      ...aiAgents.map((userAgent) => ({ userAgent, ...allowAll })),
    ],
    // Marketing sitemap + public docs sitemap (separate Search Console property).
    sitemap: [`${base}/sitemap.xml`, 'https://docs.autoconnecto.in/sitemap.xml'],
  };
}