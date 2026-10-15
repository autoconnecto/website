import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import DashboardSection from '@/app/components/DashboardSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import ScaleSection from '@/app/components/ScaleSection';
import DevelopersSection from '@/app/components/DevelopersSection';
import ContactSection from '@/app/components/ContactSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

export const metadata: Metadata = {
  title: 'Autoconnecto — IoT platform for plants and OEMs',
  description:
    'Hosted IoT platform for plants and OEMs in India. Connect MQTT or HTTPS, store readings, ask Analytics, raise alarms, and run on your own server when you need to. Plans scale when you need more.',
  alternates: { canonical: `${baseUrl}/` },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/`,
    title: 'Autoconnecto — IoT platform for plants and OEMs',
    description:
      'Hosted IoT platform from India. MQTT and HTTPS, Analytics from stored readings, alarms, and an on-premises install. Scaled when you need more.',
    siteName: 'Autoconnecto',
    images: [
      {
        url: `${baseUrl}/assets/images/app_logo.png`,
        width: 1200,
        height: 630,
        alt: 'Autoconnecto Enterprise IoT Platform',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autoconnecto — IoT platform for plants and OEMs',
    description:
      'Hosted IoT platform from India. MQTT and HTTPS, Analytics from stored readings, alarms, and an on-premises install. Scaled when you need more.',
    images: [`${baseUrl}/assets/images/app_logo.png`],
  },
};

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      {/* Structured Data - WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Autoconnecto — IoT platform for plants and OEMs',
            description:
              'Hosted IoT platform for plants and OEMs in India. Readings are stored. Analytics answers from those readings. An on-premises server install is available.',
            url: `${baseUrl}/`,
            image: `${baseUrl}/assets/images/app_logo.png`,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Autoconnecto',
              url: baseUrl,
            },
          }),
        }}
      />

      {/* Structured Data - SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Autoconnecto',
            description: 'Hosted IoT platform for device connectivity, Analytics, dashboards, and on-premises installation',
            url: baseUrl,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, on-premises server',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              url: `${baseUrl}/pricing`,
            },
            author: {
              '@type': 'Organization',
              name: 'Autoconnecto',
              url: baseUrl,
            },
          }),
        }}
      />

      {/* Background atmosphere */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <Header />
      <HeroSection />
      <DashboardSection />
      <FeaturesSection />
      <ScaleSection />
      <DevelopersSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}