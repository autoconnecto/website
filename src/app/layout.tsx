import React from 'react';
import type { Metadata, Viewport } from 'next';
import { siteOrigin } from '@/lib/siteOrigin';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const baseUrl = siteOrigin();

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Autoconnecto — IoT for plants and OEMs',
    template: '%s',
  },
  description:
    'Hosted IoT for plants and OEMs in India. MQTT and HTTPS, Analytics from stored readings, alarms, white-label on Growth and Enterprise.',
  keywords: [
    'IoT platform',
    'MQTT',
    'ESP32 MQTT',
    'ESP32 IoT dashboard',
    'device management',
    'dashboards',
    'OTA firmware',
    'shared attributes',
    'IoT analytics',
    'white-label',
    'rule engine',
    'IoT alarms',
    'India IoT',
    'system integrator IoT',
  ],
  authors: [{ name: 'Autoconnecto' }],
  creator: 'Autoconnecto',
  publisher: 'Autoconnecto',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${baseUrl}/`,
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: `${baseUrl}/`,
    siteName: 'Autoconnecto',
    title: 'Autoconnecto — IoT for plants and OEMs',
    description:
      'Hosted IoT for plants and OEMs in India. MQTT, HTTPS, Analytics, alarms, white-label.',
    images: [
      {
        url: '/images/homepage.png',
        width: 1200,
        height: 630,
        alt: 'Autoconnecto IoT platform homepage preview',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autoconnecto — IoT for plants and OEMs',
    description:
      'Hosted IoT for plants and OEMs in India. MQTT, HTTPS, Analytics, alarms, white-label.',
    images: ['/images/homepage.png'],
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt — site summary for AI assistants" />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI.txt — machine-readable site index" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Autoconnecto',
              url: `${baseUrl}/`,
              description:
                'Hosted IoT platform for plants and OEMs in India. Readings are stored. Analytics answers from those readings.',
              publisher: {
                '@type': 'Organization',
                name: 'Purple Chilly Pvt Ltd',
                url: `${baseUrl}/`,
              },
              inLanguage: 'en-IN',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Purple Chilly Pvt Ltd',
              legalName: 'Purple Chilly Pvt Ltd',
              alternateName: ['Autoconnecto', 'Autoconnecto IoT'],
              url: `${baseUrl}/`,
              logo: `${baseUrl}/assets/images/app_logo.png`,
              description:
                'Purple Chilly Pvt Ltd builds Autoconnecto, a hosted IoT platform for plants and OEMs in India.',
              email: 'support@autoconnecto.in',
              sameAs: [
                'https://www.autoconnecto.in/',
                'https://app.autoconnecto.in/',
                'https://docs.autoconnecto.in/',
                'https://www.linkedin.com/showcase/145223603/',
                'https://www.youtube.com/@AutoconnectoIoT',
                'https://github.com/autoconnecto',
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Support',
                  email: 'support@autoconnecto.in',
                  telephone: '+91-92121-00555',
                  areaServed: 'IN',
                },
                {
                  '@type': 'ContactPoint',
                  contactType: 'Sales',
                  email: 'founder@autoconnecto.in',
                  telephone: '+91-92121-00555',
                  areaServed: 'IN',
                },
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Villa-71, Galaxy Enclave, Mahindra SEZ Road, Kalwara',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302037',
                addressCountry: 'IN',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Autoconnecto',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: 'https://app.autoconnecto.in/',
              description:
                'Hosted multi-tenant IoT platform: MQTT and HTTPS ingest, stored telemetry, live dashboards, alarms, rule engine, OTA, and ESP32 SDK.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
                url: `${baseUrl}/pricing`,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Purple Chilly Pvt Ltd',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}