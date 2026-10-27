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
import PostsSection from '@/app/components/PostsSection';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

export const metadata: Metadata = {
  title: 'Autoconnecto — IoT for plants and OEMs',
  description:
    'Hosted IoT for plants and OEMs in India. MQTT or HTTPS, store readings, Analytics, alarms. INR plans.',
  alternates: { canonical: `${baseUrl}/` },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/`,
    title: 'Autoconnecto — IoT for plants and OEMs',
    description:
      'Hosted IoT from India. MQTT and HTTPS, Analytics from stored readings, alarms.',
    siteName: 'Autoconnecto',
    images: [
      {
        url: `${baseUrl}/images/homepage.png`,
        width: 1200,
        height: 630,
        alt: 'Autoconnecto IoT platform homepage',
        type: 'image/png',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autoconnecto — IoT for plants and OEMs',
    description:
      'Hosted IoT from India. MQTT and HTTPS, Analytics from stored readings, alarms.',
    images: [`${baseUrl}/images/homepage.png`],
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
              'Hosted IoT platform for plants and OEMs in India. Readings are stored. Analytics answers from those readings. ',
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

      {/* SoftwareApplication JSON-LD lives once in root layout.tsx */}

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
      <PostsSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Autoconnecto notes',
            itemListElement: [
              {
                '@type': 'SocialMediaPosting',
                position: 1,
                url: 'https://www.linkedin.com/feed/update/urn:li:share:7519607555581509632?actorCompanyId=145223603',
                headline: 'ESP32 to a live dashboard',
              },
              {
                '@type': 'SocialMediaPosting',
                position: 2,
                url: 'https://www.linkedin.com/feed/update/urn:li:share:7519623601655037952?actorCompanyId=145223603',
                headline: 'Shared attributes after a power cut',
              },
              {
                '@type': 'SocialMediaPosting',
                position: 3,
                url: 'https://www.linkedin.com/feed/update/urn:li:share:7519670711741857792/?actorCompanyId=145223603',
                headline: 'For system integrators and EPCs',
              },
            ],
          }),
        }}
      />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}