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
  title: 'Autoconnecto — Enterprise IoT Platform',
  description:
    'Autoconnecto is a full-stack IoT platform with live dashboards, 60+ widgets, MQTT/HTTPS, visual Rule Engine, RBAC, alarms with Telegram ops alerts, and white-label for enterprise scale. India.',
  keywords: [
    'IoT platform',
    'MQTT',
    'device management',
    'dashboards',
    'enterprise IoT',
    'white-label',
    'rule engine',
    'Telegram alarms',
    'IoT dashboards',
    'India IoT SaaS',
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
    locale: 'en_US',
    url: `${baseUrl}/`,
    siteName: 'Autoconnecto',
    title: 'Autoconnecto — Enterprise IoT Platform',
    description: 'Full-stack IoT platform for enterprise device management and visualization.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Autoconnecto Enterprise IoT Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autoconnecto — Enterprise IoT Platform',
    description: 'Full-stack IoT platform for enterprise device management and visualization.',
    images: ['/assets/images/app_logo.png'],
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
                'Enterprise IoT platform for device management, dashboards, Rule Engine automation, and realtime control.',
              publisher: { '@type': 'Organization', name: 'Autoconnecto', url: `${baseUrl}/` },
              inLanguage: 'en',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Autoconnecto',
              url: `${baseUrl}/`,
              logo: `${baseUrl}/assets/images/app_logo.png`,
              description: 'Enterprise IoT Platform for device management and visualization',
              email: 'support@autoconnecto.in',
              sameAs: [
                'https://autoconnecto.in/',
                'https://www.autoconnecto.in/',
                'https://app.autoconnecto.in/',
                'https://docs.autoconnecto.in/',
                'https://github.com/autoconnecto/autoconnecto-sdk',
                'https://github.com/autoconnecto/autoconnecto-mobile',
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
                postalCode: '302037',
                addressCountry: 'IN',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}