import type { Metadata } from 'next';

/** Same preview image on every public page, with that page's own title and description. */
export function shareMeta(
  baseUrl: string,
  path: string,
  title: string,
  description: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = `${baseUrl}/images/homepage.png`;
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
          url: image,
          width: 1200,
          height: 630,
          alt: 'Autoconnecto IoT platform',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
