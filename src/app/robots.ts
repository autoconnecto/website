import { MetadataRoute } from 'next';

export const dynamic = 'force-static'; // ✅ REQUIRED for static export

function siteOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim();
  return raw.replace(/\/+$/, '');
}

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
    sitemap: `${base}/sitemap.xml`,
  };
}