import type { Metadata } from 'next';

export type ShareImage = {
  /** Absolute or site-root path, e.g. /images/dashboard1.png */
  src: string;
  alt?: string;
};

/** Open Graph / Twitter preview. Pass a page screenshot when you have one. */
export function shareMeta(
  baseUrl: string,
  path: string,
  title: string,
  description: string,
  image?: ShareImage,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const src = image?.src?.startsWith('http')
    ? image.src
    : `${baseUrl}${image?.src || '/images/homepage.png'}`;
  const alt = image?.alt || 'Autoconnecto IoT platform';
  return {
    openGraph: {
      type: 'website',
      siteName: 'Autoconnecto',
      locale: 'en_IN',
      title,
      description,
      url: `${baseUrl}${path}`,
      images: [
        {
          url: src,
          width: 1200,
          height: 630,
          alt,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [src],
    },
  };
}
