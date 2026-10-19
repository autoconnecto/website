import type { Metadata } from 'next';

/** Same preview image on every public page, with that page's own title and description. */
export function shareMeta(
  baseUrl: string,
  path: string,
  title: string,
  description: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = `${baseUrl}/assets/images/app_logo.png`;
  return {
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'Autoconnecto',
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
