import type { SolutionOffering } from '@/content/solutions';

export function buildSolutionsItemListJsonLd(
  solutions: SolutionOffering[],
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Autoconnecto Solutions',
    description:
      'Hardware plus Autoconnecto platform offerings. Bundle pricing on request.',
    url: `${siteUrl}/solutions`,
    numberOfItems: solutions.length,
    itemListElement: solutions.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/solutions/${s.slug}`,
      name: s.title,
    })),
  };
}

export function buildSolutionProductJsonLd(
  solution: SolutionOffering,
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: solution.title,
    description: solution.shortDescription,
    url: `${siteUrl}/solutions/${solution.slug}`,
    brand: { '@type': 'Brand', name: 'Autoconnecto' },
    category: 'IoT solution',
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/solutions/${solution.slug}`,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      description: 'Contact for pricing — hardware and bundle terms on request',
    },
  };
}
